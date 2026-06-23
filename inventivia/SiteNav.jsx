/* global React */

/* ============================================================
   INVENTIVIA — SITE NAV (shared, modern floating capsule)
   Used by every page: <SiteNav active="home|servicios|contacto" />
   The exact same look is replicated as static markup on the
   standalone Servicios page (same .sn-* classes / CSS).
   Add new pages to the LINKS array below.
   ============================================================ */

const SN_CSS = `.sn-wrap{position:fixed;top:0;left:0;right:0;z-index:200;padding:14px var(--gutter) 0;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.sn-wrap *{box-sizing:border-box}
.sn-wrap.sn-hidden{transform:translateY(-150%)}
.sn-cap{max-width:var(--container-wide);margin:0 auto;display:flex;align-items:center;gap:18px;height:64px;padding:0 10px 0 14px;border-radius:999px;background:linear-gradient(135deg,rgba(13,13,24,.88),rgba(13,13,24,.66));-webkit-backdrop-filter:blur(22px) saturate(1.45);backdrop-filter:blur(22px) saturate(1.45);border:1px solid rgba(197,168,49,.38);box-shadow:0 18px 55px rgba(0,0,0,.34),inset 0 1px 0 rgba(255,255,255,.08),0 0 0 1px rgba(13,13,24,.35);transition:height .4s cubic-bezier(.16,1,.3,1),background .4s,box-shadow .4s}
.sn-wrap.sn-scrolled .sn-cap{height:58px;background:linear-gradient(135deg,rgba(13,13,24,.94),rgba(13,13,24,.74));box-shadow:0 18px 55px rgba(0,0,0,.38),inset 0 1px 0 rgba(255,255,255,.08)}
.sn-brand{display:flex;align-items:center;gap:12px;flex:none;text-decoration:none;color:var(--paper-200)}
.sn-mark{width:42px;height:42px;border-radius:50%;background:var(--paper-200);object-fit:contain;padding:5px;border:1px solid rgba(197,168,49,.58);box-shadow:0 0 0 3px rgba(197,168,49,.11),0 8px 24px rgba(0,0,0,.22);animation:none!important}
.sn-word{font-family:var(--font-display);font-weight:800;font-size:20px;letter-spacing:-.04em;color:var(--paper-200);line-height:1}.sn-word b{color:var(--gold)}
.sn-links{display:flex;align-items:center;gap:6px;margin:0 auto;background:rgba(243,242,229,.06);padding:5px;border-radius:999px;border:1px solid rgba(255,255,255,.06)}
.sn-link{font-family:var(--font-body);font-size:13px;letter-spacing:.015em;text-transform:none;font-weight:850;color:var(--paper-200);padding:13px 17px;border-radius:999px;white-space:nowrap;text-decoration:none;transition:background .25s,color .25s,transform .25s,box-shadow .25s}
.sn-link:hover,.sn-link.sn-active{background:var(--gold);color:var(--ink-900);transform:translateY(-1px);box-shadow:0 8px 22px rgba(197,168,49,.24)}
.sn-right{display:flex;align-items:center;gap:10px;flex:none}.sn-cta{font-family:var(--font-body);font-size:13px;letter-spacing:.015em;text-transform:none;font-weight:900;color:var(--ink-900);background:var(--paper-200);padding:13px 18px;border-radius:999px;display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(197,168,49,.55);cursor:pointer;text-decoration:none;transition:background .25s,transform .25s,box-shadow .25s}.sn-cta:hover{background:var(--gold);transform:translateY(-1px);box-shadow:0 10px 24px -8px rgba(197,168,49,.7)}.sn-cta:active{transform:scale(.97)}
.sn-burger{display:none;flex-direction:column;align-items:center;justify-content:center;gap:4px;width:44px;height:44px;border-radius:999px;border:0;background:var(--gold);cursor:pointer;box-shadow:0 8px 24px rgba(197,168,49,.24)}.sn-burger span{width:18px;height:2px;background:var(--ink-900);border-radius:2px;transition:transform .3s,opacity .3s}.sn-panel{display:none}
@media(max-width:900px){.sn-links{display:none}.sn-cta-desktop{display:none}.sn-burger{display:flex}.sn-panel{display:flex;flex-direction:column;gap:8px;position:absolute;left:var(--gutter);right:var(--gutter);top:86px;background:rgba(13,13,24,.96);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border:1px solid rgba(197,168,49,.34);border-radius:24px;box-shadow:0 28px 64px -20px rgba(0,0,0,.55);padding:14px;opacity:0;transform:translateY(-12px) scale(.98);transform-origin:top right;pointer-events:none;transition:opacity .3s,transform .3s}.sn-wrap.sn-open .sn-panel{opacity:1;transform:none;pointer-events:auto}.sn-wrap.sn-open .sn-burger span:nth-child(1){transform:translateY(6px) rotate(45deg)}.sn-wrap.sn-open .sn-burger span:nth-child(2){opacity:0}.sn-wrap.sn-open .sn-burger span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}.sn-panel a{display:flex;align-items:center;justify-content:space-between;font-family:var(--font-body);font-size:16px;font-weight:850;letter-spacing:.015em;text-transform:none;color:var(--paper-200);padding:15px 16px;border-radius:16px;text-decoration:none;background:rgba(255,255,255,.05)}.sn-panel a:hover,.sn-panel a.sn-active{background:var(--gold);color:var(--ink-900)}.sn-panel .sn-cta{justify-content:center;width:100%;margin-top:6px;font-size:16px;padding:15px;box-sizing:border-box;background:var(--paper-200);color:var(--ink-900)}}
@media(max-width:760px){.sn-wrap{padding:10px max(12px,var(--gutter)) 0;transform:none!important}.sn-cap{height:58px;padding:0 8px 0 10px;gap:10px}.sn-wrap.sn-scrolled .sn-cap{height:56px}.sn-word{font-size:18px}.sn-mark{width:38px;height:38px}.sn-panel{left:max(12px,var(--gutter));right:max(12px,var(--gutter));top:74px;max-height:calc(100dvh - 90px);overflow:auto;border-radius:20px}}
@media(max-width:380px){.sn-word{font-size:17px}.sn-burger{width:40px;height:40px}}
@media(prefers-reduced-motion:reduce){.sn-link,.sn-cta{transition:none}}`;

function SiteNav({ active = "home" }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const lastY = React.useRef(0);

  React.useEffect(() => {
    if (!document.getElementById("sn-css")) {
      const s = document.createElement("style");
      s.id = "sn-css"; s.textContent = SN_CSS;
      document.head.appendChild(s);
    }
  }, []);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 220 && y > lastY.current && !open);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const isHome = active === "home";
  const sec = (id) => (isHome ? `#${id}` : `index.html#${id}`);
  const links = [
    ["Inicio", isHome ? "#top" : "index.html", "home"],
    ["Servicios", active === "servicios" ? "#top" : "servicios.html", "servicios"],
    ["Quiénes somos", active === "quienes" ? "#top" : "quienes-somos.html", "quienes"],
    ["Contacto", active === "contacto" ? "#top" : "contacto.html", "contacto"],
  ];
  const ctaHref = active === "contacto" ? "#form" : "contacto.html#form";
  const mark = "assets/mark-inventivia.svg";

  const wrapClass = ["sn-wrap", hidden ? "sn-hidden" : "", scrolled ? "sn-scrolled" : "", open ? "sn-open" : ""].filter(Boolean).join(" ");

  return (
    <header className={wrapClass}>
      <div className="sn-cap">
        <a href={isHome ? "#top" : "index.html"} className="sn-brand" data-cursor="view" aria-label="Inventivia — inicio">
          <img className="sn-mark" src={mark} alt="InventivIA" />
          <span className="sn-word">Inventiv<b>IA</b></span>
        </a>
        <nav className="sn-links">
          {links.map(([l, h, key]) => (
            <a key={l} href={h} className={"sn-link" + (key === active ? " sn-active" : "")} data-cursor="view">{l}</a>
          ))}
        </nav>
        <div className="sn-right">
          <a href={ctaHref} className="sn-cta sn-cta-desktop" data-cursor="view">Hablemos</a>
          <button type="button" className="sn-burger" aria-label="Menú" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
      <div className="sn-panel">
        {links.map(([l, h, key]) => (
          <a key={l} href={h} className={key === active ? "sn-active" : ""} data-cursor="view" onClick={() => setOpen(false)}>
            {l}<span aria-hidden="true">→</span>
          </a>
        ))}
        <a href={ctaHref} className="sn-cta" data-cursor="view" onClick={() => setOpen(false)}>Hablemos</a>
      </div>
    </header>
  );
}
window.SiteNav = SiteNav;
