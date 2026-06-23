/* global React, WordReveal, CountUp */
const KIN_SVC = [
  { n: "01", t: "Diseño Web", d: "Webs estratégicas que atrapan miradas y convierten visitas en clientes.", tags: "UX · UI · Desarrollo", c: "var(--gold)" },
  { n: "02", t: "Posicionamiento SEO", d: "Escalamos tu marca a la cima de Google con estrategia técnica, contenido e IA.", tags: "Técnico · Contenido · Local", c: "var(--signal)" },
  { n: "03", t: "Inteligencia Artificial", d: "Automatizamos captación, respuestas y procesos para que trabajen por ti 24/7.", tags: "Agentes · Flujos · Datos", c: "var(--gold-bright)" },
  { n: "04", t: "Branding", d: "Identidades con carácter: marcas que se recuerdan y se diferencian de verdad.", tags: "Identidad · Voz · Sistema", c: "var(--paper-300)" },
  { n: "05", t: "Social Media", d: "Conectamos tu marca con audiencias reales con contenido que engancha y vende.", tags: "Estrategia · Contenido · Ads", c: "var(--signal)" },
];

function Row({ s, i }) {
  const [h, setH] = React.useState(false);
  return (
    <div data-reveal data-reveal-dir={i % 2 ? "right" : "left"} data-cursor="view"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: "relative", borderBottom: "1px solid var(--ink-900)", overflow: "hidden", cursor: "pointer" }}>
      {/* sliding color fill */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: s.c, transform: h ? "translateY(0)" : "translateY(101%)", transition: "transform .5s cubic-bezier(.16,1,.3,1)" }} />
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "clamp(16px,3vw,48px)", alignItems: "center", padding: "clamp(20px,3vw,40px) 0" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(13px,1.4vw,16px)", color: h ? "var(--ink-900)" : "var(--ink-500)", letterSpacing: "0.1em", transition: "color .4s", width: 40 }}>{s.n}</span>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.8rem,4.4vw,3.6rem)", letterSpacing: "-0.03em", lineHeight: 1, color: "var(--ink-900)", margin: 0, transition: "transform .5s cubic-bezier(.16,1,.3,1)", transform: h ? "translateX(18px)" : "translateX(0)" }}>{s.t}</h3>
          <div style={{ maxWidth: 520, overflow: "hidden", height: h ? 64 : 0, opacity: h ? 1 : 0, transition: "height .45s cubic-bezier(.16,1,.3,1), opacity .4s", marginTop: h ? 12 : 0 }}>
            <p style={{ color: "var(--ink-800)", fontSize: 15, lineHeight: 1.5, margin: 0, transform: h ? "translateX(18px)" : "translateX(0)", transition: "transform .5s cubic-bezier(.16,1,.3,1)" }}>{s.d}</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <span className="kin-desktop" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: h ? "var(--ink-900)" : "var(--ink-500)", transition: "color .4s", whiteSpace: "nowrap" }}>{s.tags}</span>
          <span style={{ fontSize: 30, color: "var(--ink-900)", transform: h ? "rotate(0deg) translateX(0)" : "rotate(-45deg)", transition: "transform .5s cubic-bezier(.34,1.56,.64,1)", display: "inline-block" }}>→</span>
        </div>
      </div>
    </div>
  );
}

function Services() {
  return (
    <section id="servicios" style={{ background: "var(--paper-200)", padding: "var(--section-y) 0" }}>
      <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 30 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.2rem,5vw,4rem)", letterSpacing: "-0.04em", lineHeight: 0.95, color: "var(--ink-900)", margin: 0 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.2em", fontWeight: 700, letterSpacing: "0.2em", verticalAlign: "super", color: "var(--gold-deep)" }}>(qué hacemos)</span><br />
            <WordReveal text="Servicios que mueven" start="scroll" stagger={50} />
          </h2>
          <div style={{ display: "flex", gap: 36 }}>
            <div><div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 40, color: "var(--gold-deep)", lineHeight: 1 }}><CountUp to={12} suffix="+" /></div><div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-700)", marginTop: 4 }}>Marcas</div></div>
            <div><div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 40, color: "var(--ink-900)", lineHeight: 1 }}><CountUp to={180} prefix="+" suffix="%" /></div><div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-700)", marginTop: 4 }}>Tráfico</div></div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--ink-900)" }}>
          {KIN_SVC.map((s, i) => <Row key={s.n} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
window.Services = Services;
