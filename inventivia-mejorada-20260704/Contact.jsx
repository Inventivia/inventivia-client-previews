/* global React, WordReveal, RotatingSeal, Draggable, Magnetic, Marquee */
function ContactCTA() {
  const { Input, Textarea } = window.InventiviaDesignSystem_a147c4;
  return (
    <section id="contacto" style={{ background: "var(--gold)", color: "var(--ink-900)", padding: "var(--section-y) 0", position: "relative", overflow: "hidden" }}>
      {/* moving editorial lines */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: "-50%", width: "200%", backgroundImage: "repeating-linear-gradient(90deg, transparent 0 119px, var(--ink-900) 119px 120px)", animation: window.KIN_REDUCED ? "none" : "kin-marq-l 24s linear infinite", opacity: 0.16 }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: "30%", height: 1.5, background: "var(--ink-900)", opacity: 0.25, transformOrigin: "left", animation: window.KIN_REDUCED ? "none" : "kin-shift 5s ease-in-out infinite" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: "26%", height: 1.5, background: "var(--ink-900)", opacity: 0.18, transformOrigin: "right", animation: window.KIN_REDUCED ? "none" : "kin-shift 6.5s ease-in-out infinite reverse" }} />
      </div>
      {/* draggable seal */}
      <div aria-hidden="true" style={{ position: "absolute", top: "12%", right: "6%", zIndex: 2 }}>
        <Draggable bounds={120}>
          <RotatingSeal text="DA EL SALTO · HABLEMOS · " size={138} speed={14} color="var(--ink-900)" fill="var(--ink-900)" center={<span style={{ color: "var(--gold)", fontSize: 24 }}>→</span>} />
        </Draggable>
      </div>
      <div className="kin-split" style={{ position: "relative", maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center", zIndex: 3 }}>
        <div data-reveal>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-800)" }}>(contacto)</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.6rem,6vw,5.2rem)", letterSpacing: "-0.045em", lineHeight: 0.88, color: "var(--ink-900)", margin: "14px 0 0" }}>
            <WordReveal text="¿Listo para" start="scroll" stagger={40} /><br />
            <span style={{ fontStyle: "italic" }}><WordReveal text="despegar?" start="scroll" delay={160} stagger={40} /></span>
          </h2>
          <p style={{ color: "var(--ink-800)", fontSize: "var(--fs-lead)", marginTop: 22, maxWidth: 420, lineHeight: 1.5 }}>
            Cuéntanos tu proyecto y da el primer paso hacia una estrategia que elevará tu marca a nuevas alturas.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
            <Magnetic strength={0.3}><a href="mailto:hola@inventiviamarketing.com?subject=Auditoría%20SEO%20Murcia" data-cursor="view" style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16, color: "var(--gold)", background: "var(--ink-900)", padding: "15px 26px", borderRadius: "var(--radius-pill)", display: "inline-flex", alignItems: "center", gap: 10 }}>✆ WhatsApp</a></Magnetic>
            <a href="contacto.html#form" data-cursor="view" style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16, color: "var(--ink-900)", padding: "15px 24px", borderRadius: "var(--radius-pill)", border: "1.5px solid var(--ink-900)" }}>☎ Llamar</a>
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-800)", marginTop: 26, letterSpacing: "0.06em" }}>Murcia, España · hola@inventiviamarketing.com</p>
        </div>
        <div data-reveal data-reveal-dir="left">
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 16, background: "var(--paper-100)", border: "2px solid var(--ink-900)", borderRadius: "var(--radius-lg)", padding: 28, boxShadow: "8px 8px 0 var(--ink-900)" }}>
            <div className="kin-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <KField label="Nombre" placeholder="Tu nombre" />
              <KField label="Email" type="email" placeholder="hola@empresa.com" />
            </div>
            <KField label="Mensaje" placeholder="Cuéntanos qué necesitas…" textarea />
            <button type="submit" data-cursor="view" style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16, color: "var(--paper-200)", background: "var(--ink-900)", padding: "15px", borderRadius: "var(--radius-pill)", border: "none", cursor: "pointer", marginTop: 4, transition: "background .25s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-deep)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink-900)")}>Da el salto →</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function KField({ label, placeholder, type = "text", textarea }) {
  const [f, setF] = React.useState(false);
  const common = { onFocus: () => setF(true), onBlur: () => setF(false), placeholder,
    style: { width: "100%", fontFamily: "var(--font-body)", fontSize: 15, color: "var(--ink-900)", background: "var(--paper-200)", border: `1.5px solid ${f ? "var(--gold-deep)" : "var(--ink-900)"}`, borderRadius: "var(--radius-sm)", padding: "12px 14px", outline: "none", boxSizing: "border-box", transition: "border-color .2s" } };
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: f ? "var(--gold-deep)" : "var(--ink-700)", transition: "color .2s" }}>{label}</span>
      {textarea ? <textarea rows={4} {...common} style={{ ...common.style, resize: "vertical" }} /> : <input type={type} {...common} />}
    </label>
  );
}
window.ContactCTA = ContactCTA;

function Footer() {
  const cols = [
    { h: "Servicios", items: ["Diseño web", "SEO + IA", "Social Media", "Branding", "Automatización"] },
    { h: "Agencia", items: ["Nosotros", "Proyectos", "Proceso", "Blog", "Contacto"] },
    { h: "Síguenos", items: ["Instagram", "Facebook", "X / Twitter", "LinkedIn"] },
  ];
  return (
    <footer style={{ background: "var(--ink-900)", color: "var(--paper-200)" }}>
      <div style={{ borderBottom: "1px solid var(--ink-600)", padding: "26px 0", overflow: "hidden" }}>
        <Marquee dir="left" speed={26}
          items={["Hablemos", "Da el salto", "Empieza tu proyecto", "Más visibilidad", "Más ventas"].map((t) => (
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.8rem,4vw,3.4rem)", letterSpacing: "-0.03em", color: "var(--paper-200)" }}>{t}</span>
          ))} sep={<span style={{ color: "var(--gold)", margin: "0 0.6em" }}>✦</span>} />
      </div>
      <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto", padding: "56px var(--gutter) 34px" }}>
        <div className="kin-footer-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr repeat(3, 1fr)", gap: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 18 }}>
              <img src={(window.__resources && window.__resources.mark) || "assets/mark.svg"} alt="" style={{ width: 28, height: 28 }} />
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--paper-200)", letterSpacing: "-0.04em" }}>Inventiv<span style={{ color: "var(--gold)" }}>ia</span></span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-small)", maxWidth: 280, margin: 0 }}>Agencia de marketing digital con IA en Murcia. Mostramos al mundo lo mejor y más innovador de Murcia.</p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>{c.h}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {c.items.map((i) => (<li key={i}><a href="contacto.html" data-cursor="view" style={{ color: "var(--text-muted)", fontSize: "var(--fs-small)", transition: "color .25s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--paper-200)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>{i}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, marginTop: 52, paddingTop: 24, borderTop: "1px solid var(--ink-600)" }}>
          <span style={{ color: "var(--text-muted)", fontSize: 13, fontStyle: "italic" }}>Todos los berberechos reservados — puedes copiarnos el texto, pero nunca la magia.</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)", letterSpacing: "0.08em" }}>© 2026 INVENTIVIA MARKETING</span>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
