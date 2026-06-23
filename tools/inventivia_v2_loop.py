#!/usr/bin/env python3
"""InventivIA V2 long audit/fix loop.

Hard guardrail: preserve design and motion. The script does NOT modify CSS/JS/bundles.
It only applies invisible HTML head/metadata/link hygiene fixes and writes reports.
Runs for up to 5 hours, periodically validating and committing safe changes.
"""
from __future__ import annotations
import hashlib, json, os, re, subprocess, time
from datetime import datetime, timezone
from pathlib import Path

REPO = Path('/home/FranInventivIA/repos/inventivia-client-previews')
SITE = REPO / 'inventivia-v2'
REPORT_DIR = SITE / '_loop_reports'
VALIDATOR = Path('/home/FranInventivIA/.hermes/agent-systems/web-html-seo-polisher/scripts/validate_static_site.py')
PUBLIC_BASE = 'https://inventivia.github.io/inventivia-client-previews/inventivia-v2'
PAGES = ['index.html','servicios.html','quienes-somos.html','contacto.html']
MAX_SECONDS = 5 * 60 * 60
SLEEP_SECONDS = 15 * 60
SAFE_EXTS = {'.html'}
FORBIDDEN_MODIFY = {'styles.css','bundle-home.js','bundle-contact.js','_ds_bundle.js'}

REPORT_DIR.mkdir(parents=True, exist_ok=True)


def run(cmd, cwd=REPO, timeout=180):
    p = subprocess.run(cmd, cwd=cwd, text=True, capture_output=True, timeout=timeout)
    return {'cmd': cmd, 'returncode': p.returncode, 'stdout': p.stdout, 'stderr': p.stderr}


def sha(path: Path):
    return hashlib.sha256(path.read_bytes()).hexdigest() if path.exists() else None


def snapshot_design_files():
    return {name: sha(SITE/name) for name in FORBIDDEN_MODIFY if (SITE/name).exists()}


def restore_if_forbidden_changed(before):
    changed=[]
    for name, old in before.items():
        p=SITE/name
        if p.exists() and sha(p)!=old:
            run(['git','checkout','--',str(p.relative_to(REPO))])
            changed.append(name)
    return changed


def ensure_head_meta(html: str, page: str):
    changed=False
    def sub_once(pattern, repl, flags=re.I|re.S):
        nonlocal html, changed
        new=re.sub(pattern,repl,html,count=1,flags=flags)
        if new!=html:
            html=new; changed=True
    if '<head' not in html.lower():
        return html, changed
    # Preserve noindex for preview.
    robots='<meta name="robots" content="noindex,nofollow,noarchive,nosnippet,noimageindex">'
    googlebot='<meta name="googlebot" content="noindex,nofollow,noarchive,nosnippet,noimageindex">'
    if re.search(r'<meta[^>]+name=["\']robots["\'][^>]*>', html, re.I):
        new=re.sub(r'<meta[^>]+name=["\']robots["\'][^>]*>', robots, html, count=1, flags=re.I)
        if new!=html: html=new; changed=True
    else:
        sub_once(r'(<head[^>]*>)', r'\1\n'+robots)
    if not re.search(r'<meta[^>]+name=["\']googlebot["\']', html, re.I):
        sub_once(r'(<head[^>]*>)', r'\1\n'+googlebot)
    # Canonical for GitHub Pages V2 preview.
    canonical=f'<link rel="canonical" href="{PUBLIC_BASE}/{"" if page=="index.html" else page}">'
    if re.search(r'<link[^>]+rel=["\']canonical["\'][^>]*>', html, re.I):
        new=re.sub(r'<link[^>]+rel=["\']canonical["\'][^>]*>', canonical, html, count=1, flags=re.I)
        if new!=html: html=new; changed=True
    else:
        sub_once(r'(<head[^>]*>)', r'\1\n'+canonical)
    # Viewport if missing.
    if not re.search(r'<meta[^>]+name=["\']viewport["\']', html, re.I):
        sub_once(r'(<head[^>]*>)', r'\1\n<meta name="viewport" content="width=device-width, initial-scale=1">')
    # Language.
    new=re.sub(r'<html(?![^>]*\blang=)', '<html lang="es"', html, count=1, flags=re.I)
    if new!=html: html=new; changed=True
    return html, changed


def safe_fix_html():
    fixes=[]
    for page in PAGES:
        p=SITE/page
        if not p.exists():
            fixes.append({'page':page,'issue':'missing page'})
            continue
        old=p.read_text(errors='ignore')
        new, changed=ensure_head_meta(old,page)
        # Safe internal link normalization: root-relative old InventivIA links to local same folder.
        # This is invisible and fixes GitHub Pages subpath issues.
        replacements={
            'href="/servicios.html"':'href="servicios.html"',
            'href="/quienes-somos.html"':'href="quienes-somos.html"',
            'href="/contacto.html"':'href="contacto.html"',
            'href="/index.html"':'href="index.html"',
            'href="/"':'href="index.html"',
        }
        for a,b in replacements.items():
            if a in new:
                new=new.replace(a,b); changed=True
        if changed:
            p.write_text(new)
            fixes.append({'page':page,'fix':'safe html metadata/link hygiene'})
    return fixes


def scan_issues():
    """Scan only public HTML pages.

    Do not scan CSS/JS/JSX for raw `}}` because kinetic CSS and JSX source can
    contain braces that are not visible runtime placeholders. This loop protects
    design/motion by avoiding edits to those files.
    """
    issues=[]
    for page in PAGES:
        p=SITE/page
        if not p.exists():
            issues.append({'file':page,'needle':'missing page'})
            continue
        txt=p.read_text(errors='ignore')
        rel=str(p.relative_to(SITE))
        for needle in ['<sc-if','text/x-dc','__bundler_loading','Unpacking...']:
            if needle in txt:
                issues.append({'file':rel,'needle':needle})
        if re.search(r'\{\{\s*[A-Za-z_][A-Za-z0-9_.-]*\s*\}\}', txt):
            issues.append({'file':rel,'needle':'visible template placeholder {{...}}'})
        if re.search(r'href=["\']#["\']', txt, re.I):
            issues.append({'file':rel,'needle':'empty href #'} )
        if 'noindex' not in txt.lower(): issues.append({'file':rel,'needle':'missing noindex'})
        if not re.search(r'<h1\b', txt, re.I): issues.append({'file':rel,'needle':'missing h1'})
        if not re.search(r'<title[^>]*>\s*[^<]+\s*</title>', txt, re.I|re.S): issues.append({'file':rel,'needle':'missing title'})
    return issues


def validate():
    if VALIDATOR.exists():
        return run(['python3', str(VALIDATOR), str(SITE)], timeout=240)
    return {'returncode': 127, 'stdout':'validator missing', 'stderr':''}


def commit_push(msg):
    st=run(['git','status','--short'])['stdout']
    if not st.strip(): return {'committed':False,'reason':'clean'}
    run(['git','add','inventivia-v2'])
    c=run(['git','commit','-m',msg], timeout=180)
    p=run(['git','push','origin','main'], timeout=300)
    return {'committed': c['returncode']==0, 'commit': c, 'push': p}


def main():
    start=time.time()
    iteration=0
    status_path=SITE/'LOOP_STATUS.md'
    while time.time()-start < MAX_SECONDS:
        iteration += 1
        before_design=snapshot_design_files()
        fixes=safe_fix_html()
        forbidden_restored=restore_if_forbidden_changed(before_design)
        issues=scan_issues()
        val=validate()
        report={
            'iteration':iteration,
            'time':datetime.now(timezone.utc).isoformat(),
            'guardrail':'NO design/CSS/JS/motion changes allowed',
            'fixes':fixes,
            'forbidden_restored':forbidden_restored,
            'issues':issues,
            'validator_returncode':val['returncode'],
            'validator_stdout_tail':val['stdout'][-4000:],
            'validator_stderr_tail':val['stderr'][-2000:],
        }
        (REPORT_DIR/f'iteration-{iteration:03d}.json').write_text(json.dumps(report,indent=2,ensure_ascii=False))
        status_path.write_text(f'''# InventivIA V2 loop\n\nÚltima iteración: {iteration}\nHora UTC: {report['time']}\nRegla: NO tocar diseño, CSS, JS ni movimiento.\nIssues detectados: {len(issues)}\nValidator rc: {val['returncode']}\n\nURL prevista: {PUBLIC_BASE}/\n\nVer `_loop_reports/` para detalle.\n''')
        commit_push(f'chore(inventivia-v2): loop iteration {iteration}')
        if iteration == 1:
            print(f'InventivIA V2 loop started. Public URL after Pages deploy: {PUBLIC_BASE}/', flush=True)
        # If all deterministic checks are clean, keep monitoring until 5h, no early exit.
        time.sleep(SLEEP_SECONDS)
    final={'finished_at':datetime.now(timezone.utc).isoformat(),'iterations':iteration,'duration_seconds':round(time.time()-start)}
    (REPORT_DIR/'FINAL.json').write_text(json.dumps(final,indent=2,ensure_ascii=False))
    commit_push('chore(inventivia-v2): finish 5h loop report')
    print('InventivIA V2 5h loop finished', json.dumps(final,ensure_ascii=False), flush=True)

if __name__=='__main__':
    main()
