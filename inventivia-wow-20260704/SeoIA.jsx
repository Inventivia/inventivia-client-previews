/* global React, WordReveal, OrbitCluster, RotatingSeal, Magnetic */
function SeoIA() {
  const rows = [
    { kw: "agencia marketing murcia", pos: 1, w: "94%" },
    { kw: "diseño web murcia", pos: 2, w: "86%" },
    { kw: "seo murcia", pos: 1, w: "97%" },
    { kw: "automatización ia pymes", pos: 3, w: "72%" },
  ];
  const orbitChip = (label) => (
    <div style={{ padding: "8px 13px", borderRadius: "var(--radius-pill)", background: "var(--ink-800)", color: "var(--paper-200)", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid var(--gold-hairline)", whiteSpace: "nowrap" }}>{label}</div>
  );
  return (
    <section id="seo-ia" style={{ background: "var(--ink-900)", color: "var(--paper-200)", padding: "var(--section-y) 0", position: "relative", overflow: "hidden" }}>
      <div className="kin-split" style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 60, alignItems: "center" }}>
        <div data-reveal data-reveal-dir="right">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
            <span style={{ width: 40, height: 1.5, background: "var(--signal)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--signal)" }}>SEO + Inteligencia Artificial</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem,5.2vw,4.6rem)", letterSpacing: "-0.04em", lineHeight: 0.92, margin: 0, color: "var(--paper-200)" }}>
            <WordReveal text="Posicionamiento" start="scroll" stagger={40} /><br />
            <span style={{ fontStyle: "italic", color: "var(--signal)" }}><WordReveal text="que trabaja solo" start="scroll" delay={200} stagger={40} /></span>
          </h2>
          <p style={{ color: "var(--gray-100)", fontSize: "var(--fs-lead)", marginTop: 22, maxWidth: 480, lineHeight: 1.5 }}>
            Unimos SEO técnico con automatización inteligente: análisis de intención, generación de contenido y monitorización continua. Tu web sube — y se mantiene arriba.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "28px 0 0", display: "flex", flexDirection: "column", gap: 12 }}>
            {["Investigación de palabras clave con IA", "Contenido por intención de búsqueda", "Informes y seguimiento automáticos 24/7", "Schema, velocidad y Core Web Vitals"].map((t) => (
              <li key={t} style={{ display: "flex", gap: 12, alignItems: "center", color: "var(--gray-100)", fontSize: 15, fontFamily: "var(--font-mono)", letterSpacing: "0.02em" }}>
                <span style={{ color: "var(--signal)" }}>▸</span>{t}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 32 }}>
            <Magnetic strength={0.3}>
              <a href="#contacto" data-cursor="view" style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16, color: "var(--ink-900)", background: "var(--signal)", padding: "15px 26px", borderRadius: "var(--radius-pill)", display: "inline-flex", alignItems: "center", gap: 10 }}>Audita tu web gratis →</a>
            </Magnetic>
          </div>
        </div>

        <div data-reveal data-reveal-dir="left" style={{ position: "relative", display: "grid", placeItems: "center", minHeight: 420 }}>
          {/* orbiting service chips around a live SEO panel */}
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", opacity: 0.9 }}>
            <OrbitCluster size={440} radius={210} speed={32} items={["AUDIT", "KEYWORDS", "SCHEMA", "CONTENT", "SPEED", "RANK"].map(orbitChip)} />
          </div>
          <div style={{ position: "relative", width: "min(360px, 80%)", background: "var(--ink-800)", border: "1px solid var(--gold-hairline)", borderRadius: "var(--radius-lg)", padding: 22, boxShadow: "var(--shadow-xl)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", color: "var(--gray-100)" }}>RANKINGS · inventivia.ai</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--signal)", textTransform: "uppercase" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)", boxShadow: "0 0 8px var(--signal)" }} />En directo</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {rows.map((r) => (
                <div key={r.kw}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6, fontFamily: "var(--font-mono)" }}>
                    <span style={{ color: "var(--gray-100)" }}>{r.kw}</span>
                    <span style={{ color: "var(--signal)" }}>#{r.pos} ↑</span>
                  </div>
                  <div style={{ height: 7, borderRadius: 99, background: "var(--ink-900)", overflow: "hidden" }}>
                    <div className="kin-bar" style={{ height: "100%", width: r.w, borderRadius: 99, background: "linear-gradient(90deg, var(--signal-deep), var(--signal))" }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18, padding: "12px 14px", borderRadius: "var(--radius-md)", background: "rgba(111,227,194,0.07)", border: "1px solid rgba(111,227,194,0.18)", fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--gray-100)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "var(--signal)" }}>⚡</span> Agente IA: 18 mejoras aplicadas hoy.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.SeoIA = SeoIA;
