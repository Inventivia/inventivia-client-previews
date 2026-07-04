/* global React, WordReveal */
const KIN_STEPS = [
  { n: "01", t: "Escuchamos", d: "Analizamos tu negocio, tu mercado y tus objetivos reales de venta." },
  { n: "02", t: "Estrategia", d: "Diseñamos un plan a medida: web, SEO, contenido y automatización con IA." },
  { n: "03", t: "Creamos", d: "Construimos webs, marcas y campañas que destacan y convierten." },
  { n: "04", t: "Optimizamos", d: "Medimos, automatizamos y mejoramos en continuo para crecer sin freno." },
];

function Process() {
  const secRef = React.useRef(null);
  const lineRef = React.useRef(null);
  React.useEffect(() => {
    if (window.KIN_REDUCED) { if (lineRef.current) lineRef.current.style.transform = "scaleY(1)"; return; }
    const onScroll = () => {
      const el = secRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const prog = Math.max(0, Math.min(1, (window.innerHeight * 0.75 - r.top) / (r.height * 0.7)));
      if (lineRef.current) lineRef.current.style.transform = `scaleY(${prog})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section id="proceso" ref={secRef} style={{ background: "var(--ink-900)", color: "var(--paper-200)", padding: "var(--section-y) 0" }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <h2 data-reveal style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.2rem,5vw,4rem)", letterSpacing: "-0.04em", lineHeight: 0.95, color: "var(--paper-200)", margin: "0 0 56px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.2em", fontWeight: 700, letterSpacing: "0.2em", verticalAlign: "super", color: "var(--signal)" }}>(cómo trabajamos)</span><br />
          <WordReveal text="Un proceso claro" start="scroll" stagger={50} />
        </h2>
        <div style={{ position: "relative", paddingLeft: "clamp(40px, 8vw, 90px)" }}>
          {/* progress rail */}
          <div style={{ position: "absolute", left: "clamp(18px,3.4vw,38px)", top: 8, bottom: 8, width: 2, background: "var(--ink-600)" }}>
            <div ref={lineRef} style={{ position: "absolute", inset: 0, background: "var(--gold)", transformOrigin: "top", transform: "scaleY(0)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(30px,5vw,60px)" }}>
            {KIN_STEPS.map((s, i) => (
              <div key={s.n} data-reveal data-reveal-dir="left" data-reveal-delay={i * 60} style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "calc(clamp(40px, 8vw, 90px) * -1 + clamp(8px,1.8vw,28px))", top: 4, width: 22, height: 22, borderRadius: "50%", background: "var(--gold)", border: "3px solid var(--ink-900)", boxShadow: "0 0 0 2px var(--gold)", animation: window.KIN_REDUCED ? "none" : `kin-pulse 2.6s ease-in-out ${i * 300}ms infinite` }} />
                <div style={{ display: "flex", gap: "clamp(16px,3vw,40px)", alignItems: "baseline", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem,6vw,5rem)", color: "transparent", WebkitTextStroke: "1.5px var(--gold)", lineHeight: 0.9, display: "inline-block", animation: window.KIN_REDUCED ? "none" : `kin-floaty ${4 + i * 0.4}s ease-in-out ${i * 200}ms infinite` }}>{s.n}</span>
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.6rem,3.4vw,2.6rem)", letterSpacing: "-0.02em", color: "var(--paper-200)", margin: 0 }}>{s.t}</h3>
                    <p style={{ color: "var(--gray-100)", fontSize: "var(--fs-body)", marginTop: 10, maxWidth: 520 }}>{s.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
window.Process = Process;
