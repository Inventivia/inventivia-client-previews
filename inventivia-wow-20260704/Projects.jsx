/* global React, WordReveal */
const KIN_PROJ = [
  { name: "Laura Valle", cat: "Branding + Web", yr: "'25", tint: "linear-gradient(135deg, #2a2438, #c5a831)" },
  { name: "World Adventure", cat: "Diseño web + SEO", yr: "'25", tint: "linear-gradient(135deg, #14202a, #6fe3c2)" },
  { name: "Multiculatas", cat: "E-commerce + Social", yr: "'24", tint: "linear-gradient(135deg, #2a1c14, #e4c552)" },
  { name: "Bahía Norte", cat: "Web + Automatización", yr: "'24", tint: "linear-gradient(135deg, #101c2a, #7db9ff)" },
  { name: "Estudio Ámbar", cat: "Branding", yr: "'24", tint: "linear-gradient(135deg, #2a2018, #d8c168)" },
];

function Card({ p, i }) {
  const [h, setH] = React.useState(false);
  return (
    <a href="contacto.html#form" draggable="false" data-cursor="view" data-reveal data-reveal-scale data-reveal-delay={i * 90}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ flex: "0 0 auto", width: "clamp(280px, 34vw, 400px)", scrollSnapAlign: "center" }}>
      <div style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "2px solid var(--ink-900)", aspectRatio: "4 / 5", background: "var(--ink-800)", transition: "transform .4s cubic-bezier(.16,1,.3,1)", transform: h ? "translateY(-8px) rotate(-1deg)" : "none", boxShadow: h ? "10px 10px 0 var(--gold)" : "5px 5px 0 var(--ink-900)" }}>
        <div data-image-slot style={{ position: "absolute", inset: 0, background: p.tint, transform: h ? "scale(1.07)" : "scale(1)", transition: "transform .7s cubic-bezier(.16,1,.3,1)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(9,9,15,0.1) 30%, rgba(9,9,15,0.8))" }} />
        <span style={{ position: "absolute", top: 14, left: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--paper-200)", textTransform: "uppercase" }}>{String(i + 1).padStart(2, "0")} / {p.yr}</span>
        <div style={{ position: "absolute", left: 18, right: 18, bottom: 18 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-bright)", marginBottom: 6 }}>{p.cat}</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.4rem,2.6vw,2rem)", letterSpacing: "-0.02em", color: "var(--paper-200)", margin: 0 }}>{p.name}</h3>
          <div style={{ overflow: "hidden", height: h ? 22 : 0, opacity: h ? 1 : 0, transition: "height .4s cubic-bezier(.16,1,.3,1), opacity .35s", marginTop: h ? 8 : 0 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold-bright)" }}>Ver proyecto →</span>
          </div>
        </div>
      </div>
    </a>
  );
}

function Projects() {
  const trackRef = React.useRef(null);
  const drag = React.useRef({ down: false, sx: 0, sl: 0, moved: false });
  const onDown = (e) => { const el = trackRef.current; drag.current = { down: true, sx: e.clientX, sl: el.scrollLeft, moved: false }; el.style.scrollBehavior = "auto"; };
  const onMove = (e) => { if (!drag.current.down) return; const el = trackRef.current; const dx = e.clientX - drag.current.sx; if (Math.abs(dx) > 4) drag.current.moved = true; el.scrollLeft = drag.current.sl - dx; };
  const onUp = () => { drag.current.down = false; };
  const onClickCapture = (e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); } };
  return (
    <section id="proyectos" style={{ background: "var(--paper-200)", padding: "var(--section-y) 0", borderTop: "1px solid var(--ink-900)" }}>
      <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 40 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.2rem,5vw,4rem)", letterSpacing: "-0.04em", lineHeight: 0.95, color: "var(--ink-900)", margin: 0 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.2em", fontWeight: 700, letterSpacing: "0.2em", verticalAlign: "super", color: "var(--gold-deep)" }}>(trabajos)</span><br />
            <WordReveal text="Marcas con impacto" start="scroll" stagger={50} />
          </h2>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-700)", display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ display: "inline-block", animation: window.KIN_REDUCED ? "none" : "kin-hint 1.6s ease-in-out infinite reverse" }}>←</span> arrastra <span style={{ display: "inline-block", animation: window.KIN_REDUCED ? "none" : "kin-hint 1.6s ease-in-out infinite" }}>→</span></span>
        </div>
      </div>
      <div ref={trackRef} data-cursor="drag"
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp} onClickCapture={onClickCapture}
        style={{ display: "flex", gap: 22, overflowX: "auto", scrollSnapType: "x proximity", padding: "8px var(--gutter) 16px", cursor: "grab", touchAction: "pan-y", scrollbarWidth: "none", maxWidth: "var(--container-wide)", margin: "0 auto" }}>
        {KIN_PROJ.map((p, i) => <Card key={p.name} p={p} i={i} />)}
        <div style={{ flex: "0 0 1px" }} />
      </div>
    </section>
  );
}
window.Projects = Projects;
