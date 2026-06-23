/* global React */
/* ============================================================
   INVENTIVIA — KINETIC LIB (Editorial direction)
   Motion primitives for an art-directed, motion-rich site.
   WordReveal · RotatingSeal · OrbitCluster · Marquee(dir) ·
   Draggable(inertia) · Magnetic · EditorialCursor · countUp ·
   reveal · useScrollProgress
   ============================================================ */
const { useRef: uR, useEffect: uE, useState: uS, useCallback: uC } = React;

const KIN_REDUCED = typeof window !== "undefined" && window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const KIN_TOUCH = typeof window !== "undefined" && window.matchMedia &&
  window.matchMedia("(pointer: coarse)").matches;

/* ---------- WordReveal: mask-reveal headline on load/scroll ---------- */
function WordReveal({ text, as = "span", delay = 0, stagger = 60, start = "load", byLetter = false, style = {}, wordStyle = {} }) {
  const ref = uR(null);
  const [go, setGo] = uS(start === "load");
  uE(() => {
    if (start !== "scroll" || KIN_REDUCED) { setGo(true); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { setGo(true); io.disconnect(); } }), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [start]);
  const words = String(text).split(" ");
  const Tag = as;
  const shown = go || KIN_REDUCED;
  if (byLetter) {
    let k = 0;
    return (
      <Tag ref={ref} style={{ display: "inline", ...style }}>
        {words.map((w, wi) => (
          <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {Array.from(w).map((ch, ci) => {
              const idx = k++;
              return (
                <span key={ci} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.1em", marginBottom: "-0.1em" }}>
                  <span style={{
                    display: "inline-block",
                    transform: shown ? "translateY(0) rotate(0deg)" : "translateY(115%) rotate(6deg)",
                    opacity: shown ? 1 : 0,
                    transition: `transform 1s cubic-bezier(.16,1,.3,1) ${delay + idx * stagger}ms, opacity .6s ease ${delay + idx * stagger}ms`,
                    ...wordStyle,
                  }}>{ch}</span>
                </span>
              );
            })}
            {wi < words.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </Tag>
    );
  }
  return (
    <Tag ref={ref} style={{ display: "inline", ...style }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.08em", marginBottom: "-0.08em" }}>
          <span style={{
            display: "inline-block",
            transform: shown ? "translateY(0) rotate(0deg)" : "translateY(110%) rotate(4deg)",
            opacity: shown ? 1 : 0,
            transition: `transform .9s cubic-bezier(.16,1,.3,1) ${delay + i * stagger}ms, opacity .7s ease ${delay + i * stagger}ms`,
            ...wordStyle,
          }}>{w}{i < words.length - 1 ? "\u00A0" : ""}</span>
        </span>
      ))}
    </Tag>
  );
}

/* ---------- RotatingSeal: circular text ring, continuous spin ---------- */
function RotatingSeal({ text = "INVENTIVIA · MARKETING · ", size = 150, speed = 18, color = "var(--ink-900)", fill = "var(--gold)", center, reverse = false, style = {} }) {
  const id = uR("seal-" + Math.random().toString(36).slice(2, 8));
  const svgRef = uR(null);
  const r = size / 2 - 14;
  const chars = text.repeat(2).slice(0, Math.max(text.length, 1) * 2);
  const boost = (fast) => () => { if (svgRef.current && !KIN_REDUCED) svgRef.current.style.animationDuration = `${fast ? speed / 3.2 : speed}s`; };
  return (
    <div onPointerEnter={boost(true)} onPointerLeave={boost(false)}
      style={{ width: size, height: size, position: "relative", display: "grid", placeItems: "center", transition: "transform .4s cubic-bezier(.34,1.56,.64,1)", ...style }}
      onPointerDown={(e) => { e.currentTarget.style.transform = "scale(1.08)"; }}
      onPointerUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}>
      <svg ref={svgRef} viewBox={`0 0 ${size} ${size}`} width={size} height={size}
        style={{ animation: KIN_REDUCED ? "none" : `kin-spin ${speed}s linear infinite ${reverse ? "reverse" : ""}`, transition: "animation-duration .5s" }}>
        <defs><path id={id.current} d={`M ${size / 2},${size / 2} m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`} /></defs>
        <text fill={color} style={{ fontFamily: "var(--font-mono)", fontSize: size * 0.082, letterSpacing: "0.18em", fontWeight: 700, textTransform: "uppercase" }}>
          <textPath href={`#${id.current}`} startOffset="0%">{chars}</textPath>
        </text>
      </svg>
      <div style={{ position: "absolute", width: size * 0.42, height: size * 0.42, borderRadius: "50%", background: fill, display: "grid", placeItems: "center", color: color }}>
        {center}
      </div>
    </div>
  );
}

/* ---------- OrbitCluster: items revolve around a hub, stay upright ---------- */
function OrbitCluster({ items, radius = 130, speed = 26, hub, size = 320 }) {
  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, animation: KIN_REDUCED ? "none" : `kin-spin ${speed}s linear infinite` }}>
        {items.map((it, i) => {
          const a = (i / items.length) * Math.PI * 2;
          const x = Math.cos(a) * radius, y = Math.sin(a) * radius;
          return (
            <div key={i} style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%,-50%) translate(${x}px, ${y}px)` }}>
              <div style={{ animation: KIN_REDUCED ? "none" : `kin-spin ${speed}s linear infinite reverse` }}>{it}</div>
            </div>
          );
        })}
      </div>
      {hub && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>{hub}</div>}
    </div>
  );
}

/* ---------- Draggable: grab, fling, inertia, soft wall-bounce ---------- */
function Draggable({ children, bounds = 110, idle = true, idleDelay = 0, z = 2, style = {}, ...rest }) {
  const elRef = uR(null);
  const st = uR({ x: 0, y: 0, vx: 0, vy: 0, dragging: false, raf: 0, last: 0, px: 0, py: 0 });
  const [grab, setGrab] = uS(false);
  const apply = () => { if (elRef.current) elRef.current.style.transform = `translate3d(${st.current.x}px, ${st.current.y}px, 0)`; };
  const tick = () => {
    const s = st.current; if (s.dragging) { s.raf = requestAnimationFrame(tick); return; }
    s.vx *= 0.93; s.vy *= 0.93; s.x += s.vx; s.y += s.vy;
    if (s.x > bounds) { s.x = bounds; s.vx *= -0.5; } if (s.x < -bounds) { s.x = -bounds; s.vx *= -0.5; }
    if (s.y > bounds) { s.y = bounds; s.vy *= -0.5; } if (s.y < -bounds) { s.y = -bounds; s.vy *= -0.5; }
    apply();
    if (Math.abs(s.vx) > 0.05 || Math.abs(s.vy) > 0.05) s.raf = requestAnimationFrame(tick); else { cancelAnimationFrame(s.raf); s.raf = 0; }
  };
  const onDown = (e) => {
    const s = st.current; s.dragging = true; setGrab(true); s.last = performance.now(); s.px = e.clientX; s.py = e.clientY;
    cancelAnimationFrame(s.raf); elRef.current.setPointerCapture?.(e.pointerId);
    window.addEventListener("pointermove", onMove); window.addEventListener("pointerup", onUp);
  };
  const onMove = (e) => {
    const s = st.current; if (!s.dragging) return;
    const now = performance.now(), dt = Math.max(now - s.last, 1);
    const dx = e.clientX - s.px, dy = e.clientY - s.py; s.x += dx; s.y += dy;
    s.vx = dx / dt * 16; s.vy = dy / dt * 16; s.px = e.clientX; s.py = e.clientY; s.last = now; apply();
  };
  const onUp = () => {
    const s = st.current; s.dragging = false; setGrab(false);
    window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp);
    if (!KIN_REDUCED) s.raf = requestAnimationFrame(tick);
  };
  uE(() => { apply(); return () => cancelAnimationFrame(st.current.raf); }, []);
  return (
    <div ref={elRef} onPointerDown={onDown} data-cursor="drag"
      style={{ position: "absolute", cursor: grab ? "grabbing" : "grab", touchAction: "none", userSelect: "none", zIndex: grab ? 60 : z,
        animation: idle && !KIN_REDUCED ? `kin-bob 7s ease-in-out ${idleDelay}ms infinite` : "none", ...style }} {...rest}>
      {children}
    </div>
  );
}

/* ---------- Magnetic ---------- */
function Magnetic({ children, strength = 0.4, radius = 110, style = {}, as = "div", ...rest }) {
  const ref = uR(null);
  uE(() => {
    if (KIN_REDUCED || KIN_TOUCH) return;
    const el = ref.current;
    const onMove = (e) => {
      const r = el.getBoundingClientRect(); const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy; const dist = Math.hypot(dx, dy);
      el.style.transform = dist < radius + Math.max(r.width, r.height) / 2 ? `translate(${dx * strength}px, ${dy * strength}px)` : "translate(0,0)";
    };
    const onLeave = () => { el.style.transform = "translate(0,0)"; };
    window.addEventListener("pointermove", onMove); window.addEventListener("pointerleave", onLeave);
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerleave", onLeave); };
  }, [strength, radius]);
  const Tag = as;
  return <Tag ref={ref} style={{ display: "inline-flex", transition: "transform .4s cubic-bezier(.34,1.56,.64,1)", ...style }} {...rest}>{children}</Tag>;
}

/* ---------- Marquee: direction + speed, hover-slow ---------- */
function Marquee({ items, speed = 32, sep, dir = "left", style = {}, itemStyle = {}, sepStyle = {} }) {
  const [slow, setSlow] = uS(false);
  const content = [...items, ...items];
  return (
    <div onPointerEnter={() => setSlow(true)} onPointerLeave={() => setSlow(false)}
      style={{ overflow: "hidden", ...style }}>
      <div style={{ display: "inline-flex", whiteSpace: "nowrap", willChange: "transform",
        animation: KIN_REDUCED ? "none" : `${dir === "left" ? "kin-marq-l" : "kin-marq-r"} ${slow ? speed * 2.6 : speed}s linear infinite`,
        animationPlayState: "running", transition: "none" }}>
        {content.map((it, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", ...itemStyle }}>
            {it}{sep != null && <span style={{ margin: "0 0.7em", ...sepStyle }}>{sep}</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- EditorialCursor: ink ring + contextual label ---------- */
function EditorialCursor() {
  const dot = uR(null), ring = uR(null), label = uR(null);
  uE(() => {
    if (KIN_REDUCED || KIN_TOUCH) return;
    let tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, raf;
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${tx}px, ${ty}px)`;
      const t = e.target.closest?.("[data-cursor]");
      const ringEl = ring.current, lab = label.current;
      if (t) {
        const kind = t.getAttribute("data-cursor");
        ringEl.style.width = ringEl.style.height = "64px"; ringEl.style.borderColor = "var(--gold)";
        lab.textContent = kind === "drag" ? "ARRASTRA" : kind === "view" ? "VER" : "";
        lab.style.opacity = lab.textContent ? "1" : "0";
      } else {
        ringEl.style.width = ringEl.style.height = "30px"; ringEl.style.borderColor = "var(--ink-700)";
        lab.style.opacity = "0";
      }
    };
    const loop = () => { x += (tx - x) * 0.2; y += (ty - y) * 0.2; if (ring.current) ring.current.style.transform = `translate(${x}px, ${y}px)`; raf = requestAnimationFrame(loop); };
    addEventListener("pointermove", onMove); loop();
    document.body.style.cursor = "none";
    return () => { removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); document.body.style.cursor = ""; };
  }, []);
  if (KIN_TOUCH) return null;
  return (
    <React.Fragment>
      <div ref={dot} style={{ position: "fixed", top: 0, left: 0, width: 6, height: 6, marginLeft: -3, marginTop: -3, borderRadius: "50%", background: "var(--gold)", pointerEvents: "none", zIndex: 9999 }} />
      <div ref={ring} style={{ position: "fixed", top: 0, left: 0, width: 30, height: 30, marginLeft: -15, marginTop: -15, borderRadius: "50%", border: "1.5px solid var(--ink-700)", pointerEvents: "none", zIndex: 9998, transition: "width .25s, height .25s, border-color .25s", display: "grid", placeItems: "center" }}>
        <span ref={label} style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.1em", color: "var(--gold)", opacity: 0, transition: "opacity .2s", whiteSpace: "nowrap" }} />
      </div>
    </React.Fragment>
  );
}

/* ---------- countUp on reveal ---------- */
function CountUp({ to, prefix = "", suffix = "", dur = 1400, style = {} }) {
  const ref = uR(null); const [val, setVal] = uS(0);
  uE(() => {
    if (KIN_REDUCED) { setVal(to); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) {
        const t0 = performance.now();
        const step = (t) => { const p = Math.min((t - t0) / dur, 1); setVal(Math.round((1 - Math.pow(1 - p, 3)) * to)); if (p < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step); io.disconnect();
      }
    }), { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref} style={style}>{prefix}{val}{suffix}</span>;
}

/* ---------- reveal all [data-reveal] ---------- */
function useReveal() {
  uE(() => {
    const els = document.querySelectorAll("[data-reveal]");
    els.forEach((el) => {
      const dir = el.getAttribute("data-reveal-dir") || "up";
      const sc = el.hasAttribute("data-reveal-scale") ? " scale(0.9)" : "";
      const off = (dir === "left" ? "translateX(48px)" : dir === "right" ? "translateX(-48px)" : dir === "down" ? "translateY(-44px)" : "translateY(48px)") + sc;
      el.style.opacity = "0"; el.style.transform = off;
      el.style.transition = "opacity 1s cubic-bezier(.16,1,.3,1), transform 1s cubic-bezier(.16,1,.3,1)";
      el.style.willChange = "opacity, transform";
    });
    if (KIN_REDUCED) { els.forEach((el) => { el.style.opacity = "1"; el.style.transform = "none"; }); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { const d = e.target.getAttribute("data-reveal-delay") || 0; e.target.style.transitionDelay = `${d}ms`; e.target.style.opacity = "1"; e.target.style.transform = "none"; io.unobserve(e.target); }
    }), { threshold: 0.16 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

Object.assign(window, { WordReveal, RotatingSeal, OrbitCluster, Draggable, Magnetic, Marquee, EditorialCursor, CountUp, useReveal, KIN_REDUCED, KIN_TOUCH });
