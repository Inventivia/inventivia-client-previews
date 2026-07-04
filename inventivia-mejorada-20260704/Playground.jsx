/* global React */
/* PLAYGROUND — physics sandbox on paper. Drag & fling the service
   orbs; weight, inertia, wall-bounce, mutual repulsion. */
const KIN_ORBS = [
  { label: "SEO", r: 56, bg: "var(--gold)", fg: "var(--ink-900)", b: false },
  { label: "WEB", r: 64, bg: "var(--ink-900)", fg: "var(--paper-200)", b: true },
  { label: "IA", r: 74, bg: "var(--signal)", fg: "var(--ink-900)", b: false },
  { label: "SOCIAL", r: 50, bg: "var(--paper-100)", fg: "var(--ink-900)", b: true },
  { label: "BRANDING", r: 60, bg: "var(--gold-bright)", fg: "var(--ink-900)", b: false },
  { label: "LEADS", r: 48, bg: "var(--ink-800)", fg: "var(--gold)", b: false },
  { label: "ADS", r: 46, bg: "var(--signal-deep)", fg: "var(--paper-200)", b: false },
];

function Playground() {
  const fieldRef = React.useRef(null);
  const bodiesRef = React.useRef([]);
  const rafRef = React.useRef(0);
  const dragRef = React.useRef({ i: -1, px: 0, py: 0, last: 0 });
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const field = fieldRef.current; if (!field) return;
    const reduced = window.KIN_REDUCED;
    const init = () => {
      const W = field.clientWidth, H = field.clientHeight, n = KIN_ORBS.length;
      bodiesRef.current = KIN_ORBS.map((o, i) => {
        const col = (i + 0.5) / n;
        const x = Math.max(16, Math.min(W - o.r * 2 - 16, col * (W - o.r * 2)));
        const y = (H * 0.5) - o.r + Math.sin(i * 1.3) * (H * 0.26);
        return { ...o, i, x, y, vx: reduced ? 0 : (Math.random() - 0.5) * 1.4, vy: reduced ? 0 : (Math.random() - 0.5) * 1.4, el: field.querySelector(`[data-orb="${i}"]`) };
      });
      bodiesRef.current.forEach((b) => { if (b.el) b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`; });
      setReady(true);
    };
    const id = requestAnimationFrame(init);
    const step = () => {
      const W = field.clientWidth, H = field.clientHeight, bodies = bodiesRef.current;
      for (let a = 0; a < bodies.length; a++) {
        const b = bodies[a]; if (dragRef.current.i === a) continue;
        b.x += b.vx; b.y += b.vy; b.vx *= 0.992; b.vy *= 0.992;
        if (b.x < 0) { b.x = 0; b.vx = Math.abs(b.vx) * 0.7; } if (b.x > W - b.r * 2) { b.x = W - b.r * 2; b.vx = -Math.abs(b.vx) * 0.7; }
        if (b.y < 0) { b.y = 0; b.vy = Math.abs(b.vy) * 0.7; } if (b.y > H - b.r * 2) { b.y = H - b.r * 2; b.vy = -Math.abs(b.vy) * 0.7; }
      }
      for (let a = 0; a < bodies.length; a++) for (let c = a + 1; c < bodies.length; c++) {
        const A = bodies[a], B = bodies[c]; const ax = A.x + A.r, ay = A.y + A.r, bx = B.x + B.r, by = B.y + B.r;
        let dx = bx - ax, dy = by - ay, d = Math.hypot(dx, dy) || 1; const min = A.r + B.r;
        if (d < min) { const push = (min - d) / 2, nx = dx / d, ny = dy / d;
          if (dragRef.current.i !== a) { A.x -= nx * push; A.y -= ny * push; A.vx -= nx * 0.3; A.vy -= ny * 0.3; }
          if (dragRef.current.i !== c) { B.x += nx * push; B.y += ny * push; B.vx += nx * 0.3; B.vy += ny * 0.3; } }
      }
      for (const b of bodies) if (b.el) b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
      rafRef.current = requestAnimationFrame(step);
    };
    if (!reduced) rafRef.current = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(id); cancelAnimationFrame(rafRef.current); };
  }, []);

  const grab = (i) => (e) => {
    e.preventDefault();
    dragRef.current = { i, px: e.clientX, py: e.clientY, last: performance.now() };
    const b = bodiesRef.current[i]; b.vx = 0; b.vy = 0; e.currentTarget.setPointerCapture?.(e.pointerId);
    const el = e.currentTarget;
    el.style.scale = "1.14"; el.style.rotate = "-6deg"; el.style.zIndex = "40";
    el.style.boxShadow = "10px 14px 0 var(--ink-900)";
    const onMove = (ev) => { const bd = bodiesRef.current[i]; const now = performance.now(), dt = Math.max(now - dragRef.current.last, 1);
      const dx = ev.clientX - dragRef.current.px, dy = ev.clientY - dragRef.current.py; bd.x += dx; bd.y += dy;
      bd.vx = dx / dt * 16; bd.vy = dy / dt * 16; dragRef.current.px = ev.clientX; dragRef.current.py = ev.clientY; dragRef.current.last = now;
      if (bd.el) bd.el.style.transform = `translate3d(${bd.x}px, ${bd.y}px, 0)`; };
    const onUp = () => { dragRef.current.i = -1;
      el.style.scale = "1"; el.style.rotate = "0deg"; el.style.boxShadow = "4px 4px 0 var(--ink-900)";
      setTimeout(() => { el.style.zIndex = ""; }, 300);
      window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
    window.addEventListener("pointermove", onMove); window.addEventListener("pointerup", onUp);
  };

  return (
    <section id="playground" style={{ background: "var(--paper-200)", padding: "var(--section-y) 0", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 30 }}>
          <div style={{ maxWidth: 640 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-deep)" }}>(zona interactiva)</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.2rem,5vw,4rem)", letterSpacing: "-0.04em", lineHeight: 0.95, color: "var(--ink-900)", margin: "14px 0 0" }}>Cógelos. Lánzalos.<br />Juega.</h2>
            <p style={{ color: "var(--ink-800)", fontSize: "var(--fs-body)", marginTop: 16, maxWidth: 500 }}>Arrastra los orbes con el dedo o el ratón — tienen peso, rebotan y se empujan. Como una buena estrategia: todo conectado, todo en movimiento.</p>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-700)", border: "1.5px solid var(--ink-900)", borderRadius: "var(--radius-pill)", padding: "8px 16px", display: "inline-flex", alignItems: "center", gap: 8 }}>arrastra las piezas <span style={{ display: "inline-block", animation: window.KIN_REDUCED ? "none" : "kin-hint 1.6s ease-in-out infinite" }}>✦</span></span>
        </div>
        <div data-reveal data-reveal-scale ref={fieldRef}
          style={{ position: "relative", height: "clamp(380px, 52vh, 560px)", borderRadius: "var(--radius-xl)", border: "2px solid var(--ink-900)", overflow: "hidden", background: "var(--paper-100)", boxShadow: "8px 8px 0 var(--ink-900)", touchAction: "none", cursor: "grab" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.6, backgroundImage: "radial-gradient(var(--paper-300) 1.5px, transparent 1.5px)", backgroundSize: "26px 26px" }} />
          <span style={{ position: "absolute", top: 16, left: 20, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-600)" }}>física en vivo · {KIN_ORBS.length} objetos</span>
          {KIN_ORBS.map((o, i) => (
            <div key={i} data-orb={i} data-cursor="drag" onPointerDown={grab(i)}
              style={{ position: "absolute", top: 0, left: 0, width: o.r * 2, height: o.r * 2, borderRadius: "50%", display: "grid", placeItems: "center", textAlign: "center",
                background: o.bg, color: o.fg, cursor: "grab", touchAction: "none", userSelect: "none",
                fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: o.r < 52 ? 11 : 13, letterSpacing: "0.06em",
                border: "2px solid var(--ink-900)", boxShadow: "4px 4px 0 var(--ink-900)",
                opacity: ready ? 1 : 0, transition: "opacity .5s, scale .35s cubic-bezier(.34,1.56,.64,1), rotate .35s var(--ease-out), box-shadow .35s var(--ease-out)" }}>{o.label}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Playground = Playground;
