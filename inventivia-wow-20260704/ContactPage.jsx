/* global React, WordReveal, RotatingSeal, Draggable, Magnetic, Marquee, useReveal, EditorialCursor, SiteNav, Footer */

/* ============================================================
   INVENTIVIA — CONTACTO (Kinetic Editorial)
   Dedicated contact page composed from the homepage motion lib.
   Top menu is the shared <SiteNav active="contacto" />.
   ============================================================ */

/* ---------- HERO ---------- */
function ContactHero() {
  const chip = (label, bg, color, anim, extra = {}) => (
    <div style={{ padding: "9px 14px", borderRadius: "var(--radius-pill)", background: bg, color, fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "1.5px solid var(--ink-900)", boxShadow: "3px 3px 0 var(--ink-900)", whiteSpace: "nowrap", animation: window.KIN_REDUCED ? "none" : anim, ...extra }}>{label}</div>
  );
  return (
    <section id="top" style={{ position: "relative", paddingTop: 150, paddingBottom: "clamp(3rem,7vw,6rem)", overflow: "hidden" }}>
      {/* baseline grid */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.5, backgroundImage: "linear-gradient(90deg, var(--paper-line) 1px, transparent 1px)", backgroundSize: "calc(100% / 12) 100%", maskImage: "linear-gradient(180deg, transparent, black 18%, black 82%, transparent)" }} />
      {/* drifting bg word */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-3%", top: "20%", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "24vw", lineHeight: 0.8, color: "var(--paper-300)", opacity: 0.5, letterSpacing: "-0.05em", pointerEvents: "none", userSelect: "none", animation: window.KIN_REDUCED ? "none" : "kin-drift 9s ease-in-out infinite" }}>hola</div>

      {/* draggable kinetic pieces */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5 }}>
        <div style={{ position: "absolute", top: "20%", right: "9%", pointerEvents: "auto", animation: window.KIN_REDUCED ? "none" : "kin-seal-in 1.1s cubic-bezier(.16,1,.3,1) both" }}>
          <Draggable bounds={150}>
            <RotatingSeal text="DA EL SALTO · HABLEMOS · " size={146} speed={15} center={<span style={{ color: "var(--ink-900)", fontSize: 26 }}>✦</span>} />
          </Draggable>
        </div>
        <div className="kin-hero-chip" style={{ position: "absolute", top: "58%", right: "16%", pointerEvents: "auto" }}>
          <Draggable bounds={120} idleDelay={-2200}>{chip("✆ WHATSAPP", "var(--gold)", "var(--ink-900)", "kin-pulse 3.2s ease-in-out infinite")}</Draggable>
        </div>
        <div className="kin-hero-chip" style={{ position: "absolute", top: "40%", right: "33%", pointerEvents: "auto" }}>
          <Draggable bounds={120} idleDelay={-3800}>{chip("✦ EN DIRECTO", "var(--signal)", "var(--ink-900)", "kin-tilt 2.6s ease-in-out infinite")}</Draggable>
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 3, maxWidth: "var(--container-wide)", margin: "0 auto", padding: "0 var(--gutter)", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <span style={{ width: 60, height: 1.5, background: "var(--ink-900)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-800)" }}>
            <WordReveal text="(contacto)" delay={100} stagger={28} />
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(3rem, 10.5vw, 10rem)", lineHeight: 0.84, letterSpacing: "-0.05em", color: "var(--ink-900)", margin: 0, maxWidth: 980 }}>
          <div><WordReveal text="Cuéntanos" byLetter delay={150} stagger={48} /></div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.22em", flexWrap: "wrap", paddingBottom: "0.16em" }}>
            <WordReveal text="tu" byLetter delay={540} stagger={48} />
            <span style={{ display: "inline-block", color: "var(--gold-deep)", fontStyle: "italic", animation: window.KIN_REDUCED ? "none" : "kin-rise .9s cubic-bezier(.16,1,.3,1) .62s both" }}>proyecto</span>
          </div>
        </h1>

        <div data-reveal data-reveal-delay="600" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 28, marginTop: 40 }}>
          <p style={{ maxWidth: 520, fontSize: "var(--fs-lead)", color: "var(--ink-800)", lineHeight: 1.5, margin: 0 }}>
            Completa el formulario y da el primer paso hacia una estrategia que elevará tu marca a nuevas alturas. Sin compromiso, sin tecnicismos — solo una conversación honesta sobre cómo hacer crecer tu negocio.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", color: "var(--ink-800)" }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--signal-deep)", boxShadow: "0 0 0 4px rgba(47,175,141,0.18)", animation: window.KIN_REDUCED ? "none" : "kin-blink 2s ease-in-out infinite" }} />
            Respondemos en menos de 24&nbsp;h
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CHANNELS: three direct ways in ---------- */
function Channels() {
  const cards = [
    { tag: "01 / RÁPIDO", glyph: "✆", title: "WhatsApp", body: "La vía directa. Escríbenos y te contestamos en horario de oficina, normalmente en minutos.", action: "Abrir WhatsApp", href: "mailto:hola@inventiviamarketing.com?subject=Auditoría%20SEO%20Murcia", accent: "var(--gold)" },
    { tag: "02 / DE VIVA VOZ", glyph: "☎", title: "Llámanos", body: "¿Prefieres hablar? Cuéntanos tu idea por teléfono y la aterrizamos contigo al momento.", action: "+34 600 000 000", href: "tel:+34600000000", accent: "var(--signal)" },
    { tag: "03 / EN PERSONA", glyph: "◉", title: "Visítanos", body: "Ctra. de Churra, 96 · 2ª planta, 30007 Murcia. Café incluido y mucha estrategia.", action: "Ver en el mapa", href: "https://www.google.com/maps/search/?api=1&query=Ctra.%20de%20Churra%2096%2030007%20Murcia", accent: "var(--paper-200)" },
  ];
  return (
    <section style={{ background: "var(--paper-200)", padding: "clamp(2.5rem,5vw,4.5rem) 0 clamp(1rem,3vw,2.5rem)" }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <div data-reveal style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 30 }}>
          <span style={{ width: 40, height: 1.5, background: "var(--ink-900)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-800)" }}>Elige cómo empezar</span>
        </div>
        <div className="kin-chan-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {cards.map((c, i) => (
            <a key={c.title} href={c.href} data-cursor="view" data-reveal data-reveal-delay={i * 90}
              style={{ display: "flex", flexDirection: "column", background: "linear-gradient(160deg, var(--ink-700), var(--ink-800))", border: "1px solid var(--hairline)", borderRadius: "var(--radius-lg)", padding: "26px 24px 24px", boxShadow: "var(--shadow-md)", transition: "transform .4s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s", minHeight: 230 }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = "var(--gold-hairline)"; e.currentTarget.style.boxShadow = "var(--shadow-lg), var(--glow-gold)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--hairline)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ width: 46, height: 46, borderRadius: "var(--radius-md)", border: "1px solid var(--gold-hairline)", display: "grid", placeItems: "center", color: c.accent, fontSize: 20 }}>{c.glyph}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.16em", color: "var(--text-muted)" }}>{c.tag}</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 26, letterSpacing: "-0.03em", color: "var(--paper-200)", margin: "20px 0 10px" }}>{c.title}</h3>
              <p style={{ color: "var(--text-body)", fontSize: 14.5, lineHeight: 1.5, margin: 0, flex: 1 }}>{c.body}</p>
              <span style={{ marginTop: 18, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", color: "var(--gold)", display: "inline-flex", alignItems: "center", gap: 8 }}>{c.action} <span aria-hidden="true">→</span></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FORM (dark stage) ---------- */
function KField({ label, placeholder, type = "text", textarea, value, onChange, half }) {
  const [f, setF] = React.useState(false);
  const common = {
    value, onChange, placeholder,
    onFocus: () => setF(true), onBlur: () => setF(false),
    style: { width: "100%", fontFamily: "var(--font-body)", fontSize: 15, color: "var(--ink-900)", background: "var(--paper-200)", border: `1.5px solid ${f ? "var(--gold-deep)" : "var(--ink-900)"}`, borderRadius: "var(--radius-sm)", padding: "12px 14px", outline: "none", boxSizing: "border-box", transition: "border-color .2s" },
  };
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, gridColumn: half ? "auto" : "1 / -1" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: f ? "var(--gold-deep)" : "var(--ink-700)", transition: "color .2s" }}>{label}</span>
      {textarea ? <textarea rows={4} {...common} style={{ ...common.style, resize: "vertical" }} /> : <input type={type} {...common} />}
    </label>
  );
}

function ChipSelect({ label, options, multi, value, onToggle }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9, gridColumn: "1 / -1" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-700)" }}>{label}</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {options.map((o) => {
          const on = multi ? value.includes(o) : value === o;
          return (
            <button key={o} type="button" data-cursor="view" onClick={() => onToggle(o)}
              style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.04em", textTransform: "uppercase", padding: "8px 13px", borderRadius: "var(--radius-pill)", cursor: "pointer", transition: "all .2s",
                background: on ? "var(--ink-900)" : "transparent", color: on ? "var(--gold)" : "var(--ink-800)", border: `1.5px solid var(--ink-900)`, boxShadow: on ? "2px 2px 0 var(--gold)" : "none" }}>
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ContactForm() {
  const services = ["Diseño web", "SEO + IA", "Social Media", "Branding", "Automatización", "Google Ads"];
  const budgets = ["< 1.000 €", "1.000 – 3.000 €", "3.000 – 8.000 €", "+ 8.000 €"];
  const [form, setForm] = React.useState({ nombre: "", empresa: "", email: "", tel: "", msg: "" });
  const [picked, setPicked] = React.useState([]);
  const [budget, setBudget] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const set = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));
  const toggleSvc = (o) => setPicked((p) => p.includes(o) ? p.filter((x) => x !== o) : [...p, o]);

  return (
    <section id="form" style={{ position: "relative", background: "radial-gradient(120% 80% at 80% 0%, var(--ink-700), var(--ink-900) 60%)", color: "var(--paper-200)", padding: "var(--section-y) 0", overflow: "hidden" }}>
      {/* soft gold wash */}
      <div aria-hidden="true" style={{ position: "absolute", top: "-20%", left: "-10%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(197,168,49,0.16), transparent 70%)", filter: "blur(8px)", pointerEvents: "none" }} />
      {/* grain */}
      <div className="iv-grain" aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      <div className="kin-form-split" style={{ position: "relative", maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)", display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 56, alignItems: "start", zIndex: 2 }}>
        {/* LEFT — context */}
        <div data-reveal>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>(briefing)</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.2rem,4.4vw,3.6rem)", letterSpacing: "-0.04em", lineHeight: 0.95, color: "var(--paper-200)", margin: "14px 0 18px" }}>
            Hablemos de<br /><span style={{ fontStyle: "italic", color: "var(--gold)" }}>lo que viene.</span>
          </h2>
          <p style={{ color: "var(--text-body)", fontSize: "var(--fs-lead)", lineHeight: 1.55, margin: "0 0 30px", maxWidth: 380 }}>
            Cuéntanos en qué andas. Cuanto más nos cuentes, mejor será la primera propuesta que te devolvemos.
          </p>
          <ol style={{ listStyle: "none", margin: "0 0 34px", padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {[["Nos escribes", "Rellenas el formulario o nos lanzas un WhatsApp."], ["Te llamamos", "En menos de 24 h agendamos una llamada para entendernos."], ["Propuesta a medida", "Recibes un plan claro, con plazos y precio cerrado."]].map(([t, d], i) => (
              <li key={t} style={{ display: "flex", gap: 14 }}>
                <span style={{ flex: "none", width: 30, height: 30, borderRadius: "50%", border: "1px solid var(--gold-hairline)", display: "grid", placeItems: "center", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--gold)" }}>{i + 1}</span>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--paper-200)" }}>{t}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.45 }}>{d}</div>
                </div>
              </li>
            ))}
          </ol>
          <div style={{ borderTop: "1px solid var(--hairline)", paddingTop: 22, display: "flex", flexDirection: "column", gap: 8 }}>
            <a href="mailto:hola@inventiviamarketing.com" data-cursor="view" style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.04em", color: "var(--gold)" }}>hola@inventiviamarketing.com</a>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", color: "var(--text-muted)" }}>Ctra. de Churra, 96 · 2ª planta · 30007 Murcia</span>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              {["Instagram", "Facebook", "X", "LinkedIn"].map((s) => (
                <a key={s} href="mailto:hola@inventiviamarketing.com" data-cursor="view" style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-200)", padding: "6px 11px", borderRadius: "var(--radius-pill)", border: "1px solid var(--hairline-strong)", transition: "all .25s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.borderColor = "var(--gold-hairline)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--paper-200)"; e.currentTarget.style.borderColor = "var(--hairline-strong)"; }}>{s}</a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — the form card */}
        <div data-reveal data-reveal-dir="left" style={{ position: "relative" }}>
          {/* draggable seal pinned to the card corner */}
          <div aria-hidden="true" style={{ position: "absolute", top: -34, right: -18, zIndex: 4 }} className="kin-desktop">
            <Draggable bounds={90}>
              <RotatingSeal text="ENVÍA · INVENTIVIA · " size={104} speed={13} color="var(--paper-200)" fill="var(--gold)" center={<span style={{ color: "var(--ink-900)", fontSize: 18 }}>→</span>} />
            </Draggable>
          </div>

          {sent ? (
            <div style={{ background: "var(--paper-100)", border: "2px solid var(--ink-900)", borderRadius: "var(--radius-lg)", padding: "48px 34px", boxShadow: "8px 8px 0 var(--gold)", textAlign: "center", color: "var(--ink-900)" }}>
              <div style={{ fontSize: 40, color: "var(--gold-deep)" }}>✦</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, letterSpacing: "-0.03em", margin: "12px 0 10px" }}>¡Recibido!</h3>
              <p style={{ color: "var(--text-body-ink)", fontSize: 15.5, lineHeight: 1.55, maxWidth: 360, margin: "0 auto" }}>
                Gracias, {form.nombre ? form.nombre.split(" ")[0] : "crack"}. Tenemos tu mensaje y te respondemos en menos de 24&nbsp;h. Mientras, ya estamos pensando ideas.
              </p>
              <button type="button" data-cursor="view" onClick={() => { setSent(false); setForm({ nombre: "", empresa: "", email: "", tel: "", msg: "" }); setPicked([]); setBudget(""); }}
                style={{ marginTop: 22, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", background: "none", border: "1.5px solid var(--ink-900)", borderRadius: "var(--radius-pill)", padding: "10px 18px", cursor: "pointer", color: "var(--ink-900)" }}>
                Enviar otro
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="kin-contact-form" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, background: "var(--paper-100)", border: "2px solid var(--ink-900)", borderRadius: "var(--radius-lg)", padding: "30px 28px", boxShadow: "8px 8px 0 var(--ink-900)" }}>
              <KField half label="Nombre" placeholder="Tu nombre" value={form.nombre} onChange={set("nombre")} />
              <KField half label="Empresa" placeholder="Tu marca o negocio" value={form.empresa} onChange={set("empresa")} />
              <KField half label="Email" type="email" placeholder="hola@empresa.com" value={form.email} onChange={set("email")} />
              <KField half label="Teléfono" type="tel" placeholder="600 000 000" value={form.tel} onChange={set("tel")} />
              <ChipSelect label="¿Qué necesitas?" options={services} multi value={picked} onToggle={toggleSvc} />
              <ChipSelect label="Presupuesto aproximado" options={budgets} value={budget} onToggle={setBudget} />
              <KField label="Cuéntanos" placeholder="¿Qué quieres conseguir? ¿Plazos? ¿Web actual?…" textarea value={form.msg} onChange={set("msg")} />
              <button type="submit" data-cursor="view"
                style={{ gridColumn: "1 / -1", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16, color: "var(--paper-200)", background: "var(--ink-900)", padding: "15px", borderRadius: "var(--radius-pill)", border: "none", cursor: "pointer", marginTop: 4, transition: "background .25s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-deep)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink-900)")}>Da el salto →</button>
              <p style={{ gridColumn: "1 / -1", margin: 0, fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.04em", color: "var(--text-muted-ink)", textAlign: "center" }}>
                Al enviar aceptas nuestra política de privacidad. Cero spam, prometido.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FaqItem({ q, a, open, onClick }) {
  return (
    <div style={{ borderBottom: "1px solid var(--paper-line)" }}>
      <button type="button" data-cursor="view" onClick={onClick}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 18, background: "none", border: "none", cursor: "pointer", padding: "22px 0", textAlign: "left" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.1rem,2vw,1.5rem)", letterSpacing: "-0.02em", color: "var(--ink-900)" }}>{q}</span>
        <span style={{ flex: "none", width: 34, height: 34, borderRadius: "50%", border: "1.5px solid var(--ink-900)", display: "grid", placeItems: "center", fontSize: 18, color: open ? "var(--gold-deep)" : "var(--ink-900)", transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform .3s cubic-bezier(.34,1.56,.64,1), color .3s" }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 300 : 0, overflow: "hidden", transition: "max-height .45s cubic-bezier(.16,1,.3,1)" }}>
        <p style={{ margin: 0, paddingBottom: 24, color: "var(--text-body-ink)", fontSize: 15.5, lineHeight: 1.6, maxWidth: 720 }}>{a}</p>
      </div>
    </div>
  );
}

function Faq() {
  const items = [
    ["¿Cuánto tarda un proyecto?", "Depende del alcance, pero una web suele estar lista en 3–6 semanas y una estrategia de SEO empieza a dar señales en 2–3 meses. Te damos plazos cerrados antes de empezar."],
    ["¿Trabajáis con el Kit Digital?", "Sí. Somos agentes digitalizadores: gestionamos la subvención del Kit Digital de principio a fin para que tu web, tienda o redes te salgan gratis o casi."],
    ["¿Qué es eso del SEO con IA?", "Usamos inteligencia artificial para investigar keywords, generar borradores y detectar oportunidades más rápido — pero la estrategia y la edición final siempre las hace una persona. IA para acelerar, criterio humano para decidir."],
    ["¿Solo trabajáis en Murcia?", "Tenemos el estudio en Murcia y nos encanta el café en persona, pero trabajamos con marcas de toda España. La distancia no es problema."],
    ["¿Y si aún no tengo claro qué necesito?", "Perfecto, para eso estamos. Escríbenos sin más, lo charlamos y te decimos con honestidad qué tiene sentido para tu negocio (y qué no)."],
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section style={{ background: "var(--paper-200)", padding: "var(--section-y) 0" }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)", display: "grid", gridTemplateColumns: "0.7fr 1.3fr", gap: 48, alignItems: "start" }} className="kin-faq-grid">
        <div data-reveal>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-deep)" }}>(dudas)</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.2rem,4.6vw,3.8rem)", letterSpacing: "-0.04em", lineHeight: 0.95, color: "var(--ink-900)", margin: "14px 0 16px" }}>
            Antes de<br />escribirnos.
          </h2>
          <p style={{ color: "var(--text-body-ink)", fontSize: "var(--fs-lead)", lineHeight: 1.55, maxWidth: 300, margin: 0 }}>
            Lo que más nos preguntan. Si tu duda no está aquí, ya sabes — un WhatsApp y listo.
          </p>
        </div>
        <div data-reveal data-reveal-delay="120">
          {items.map(([q, a], i) => (
            <FaqItem key={q} q={q} a={a} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- APP ---------- */
function ContactApp() {
  useReveal();
  React.useEffect(() => {
    const bar = document.getElementById("kin-progress");
    const onScroll = () => { const h = document.documentElement.scrollHeight - window.innerHeight; const p = h > 0 ? window.scrollY / h : 0; if (bar) bar.style.transform = `scaleX(${p})`; };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <React.Fragment>
      <div id="kin-progress" style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "var(--gold)", transform: "scaleX(0)", transformOrigin: "0 50%", zIndex: 300 }} />
      <EditorialCursor />
      <SiteNav active="contacto" />
      <main>
        <ContactHero />
        <Channels />
        <ContactForm />
        <Faq />
      </main>
      <Footer />
    </React.Fragment>
  );
}
window.ContactApp = ContactApp;
