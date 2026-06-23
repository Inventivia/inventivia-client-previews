/* global React, WordReveal, RotatingSeal, OrbitCluster, Draggable, Magnetic */
function Hero() {
  const wrap = React.useRef(null);
  const big = React.useRef(null);
  const sub = React.useRef(null);

  // counter-scroll choreography: headline drifts up slower, sub elements faster
  React.useEffect(() => {
    if (window.KIN_REDUCED) return;
    let raf;
    const onScroll = () => {
      const y = window.scrollY;
      if (big.current) big.current.style.transform = `translateY(${y * 0.12}px)`;
      if (sub.current) sub.current.style.transform = `translateY(${y * -0.06}px)`;
    };
    const loop = () => { onScroll(); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  const chip = (label, bg, color, anim, extra = {}) => (
    <div style={{ padding: "9px 14px", borderRadius: "var(--radius-pill)", background: bg, color, fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "1.5px solid var(--ink-900)", boxShadow: "3px 3px 0 var(--ink-900)", whiteSpace: "nowrap", animation: window.KIN_REDUCED ? "none" : anim, ...extra }}>{label}</div>
  );

  return (
    <section id="top" ref={wrap} style={{ position: "relative", minHeight: "100vh", paddingTop: 132, paddingBottom: 40, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {/* baseline grid */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.5, backgroundImage: "linear-gradient(90deg, var(--paper-line) 1px, transparent 1px)", backgroundSize: "calc(100% / 12) 100%", maskImage: "linear-gradient(180deg, transparent, black 18%, black 82%, transparent)" }} />
      {/* big background word, drifts */}
      <div aria-hidden="true" style={{ position: "absolute", right: "-2%", top: "8%", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "26vw", lineHeight: 0.8, color: "var(--paper-300)", opacity: 0.5, letterSpacing: "-0.05em", pointerEvents: "none", userSelect: "none", animation: window.KIN_REDUCED ? "none" : "kin-drift 9s ease-in-out infinite" }}>ia</div>

      {/* draggable kinetic pieces */}
      <div aria-hidden="true" className="kin-hero-pieces" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5 }}>
        <div style={{ position: "absolute", top: "16%", right: "12%", pointerEvents: "auto", animation: window.KIN_REDUCED ? "none" : "kin-seal-in 1.1s cubic-bezier(.16,1,.3,1) both" }}>
          <Draggable bounds={150}>
            <RotatingSeal text="ARRASTRA · INVENTIVIA · IA · SEO · " size={132} speed={16} center={<span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--ink-900)" }}>i</span>} />
          </Draggable>
        </div>
        <div className="kin-hero-chip" style={{ position: "absolute", bottom: "22%", right: "30%", pointerEvents: "auto" }}>
          <Draggable bounds={130} idleDelay={-2200}>{chip("WEB", "var(--gold)", "var(--ink-900)", "kin-pulse 3.2s ease-in-out infinite")}</Draggable>
        </div>
        <div className="kin-hero-chip" style={{ position: "absolute", top: "44%", right: "8%", pointerEvents: "auto" }}>
          <Draggable bounds={120} idleDelay={-3800}>{chip("✦ IA", "var(--signal)", "var(--ink-900)", "kin-tilt 2.6s ease-in-out infinite")}</Draggable>
        </div>
        <div className="kin-hero-chip" style={{ position: "absolute", bottom: "30%", left: "6%", pointerEvents: "auto" }}>
          <Draggable bounds={120} idleDelay={-1200}>{chip("SEO", "var(--ink-900)", "var(--paper-200)", "kin-wobble 2.9s ease-in-out infinite", { boxShadow: "3px 3px 0 var(--gold)" })}</Draggable>
        </div>
        <div className="kin-hero-chip" style={{ position: "absolute", top: "60%", right: "40%", pointerEvents: "auto" }}>
          <Draggable bounds={120} idleDelay={-2800}>{chip("◆ ADS", "var(--paper-100)", "var(--ink-900)", "kin-floaty 3.6s ease-in-out infinite", { boxShadow: "3px 3px 0 var(--signal-deep)" })}</Draggable>
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 3, maxWidth: "var(--container-wide)", margin: "0 auto", padding: "0 var(--gutter)", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
          <span style={{ width: 60, height: 1.5, background: "var(--ink-900)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-800)" }}>
            <WordReveal text="Agencia de marketing digital · Murcia" delay={100} stagger={28} />
          </span>
        </div>

        <h1 ref={big} style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(3.2rem, 11vw, 11rem)", lineHeight: 0.86, letterSpacing: "-0.05em", color: "var(--ink-900)", margin: 0, willChange: "transform" }}>
          <div><WordReveal text="MARKETING" byLetter delay={150} stagger={52} /></div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.2em", flexWrap: "wrap" }}>
            <WordReveal text="QUE" byLetter delay={560} stagger={52} />
            <span style={{ position: "relative", display: "inline-block" }}>
              <WordReveal text="PIENSA" byLetter delay={720} stagger={60} wordStyle={{ color: "var(--gold-deep)", fontStyle: "italic" }} />
              <span aria-hidden="true" style={{ position: "absolute", left: 0, bottom: "0.08em", height: "0.07em", width: "100%", background: "var(--gold-deep)", transformOrigin: "left", animation: window.KIN_REDUCED ? "none" : "kin-shift 3.4s ease-in-out infinite" }} />
            </span>
          </div>
          <div style={{ fontSize: "0.42em", fontWeight: 700, color: "var(--ink-900)", marginTop: "0.3em", letterSpacing: "-0.02em" }}>
            <WordReveal text="más visibilidad · más ventas" delay={1300} stagger={24} wordStyle={{ fontWeight: 500 }} />
          </div>
        </h1>

        <div ref={sub} data-reveal data-reveal-delay="700" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 28, marginTop: 44, willChange: "transform" }}>
          <p style={{ maxWidth: 460, fontSize: "var(--fs-lead)", color: "var(--ink-800)", lineHeight: 1.5, margin: 0 }}>
            Webs estratégicas, SEO real y automatización con IA. Diseñamos experiencias digitales que tu audiencia quiere explorar — y que convierten.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Magnetic strength={0.3}>
              <a href="#contacto" data-cursor="view" style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16, color: "var(--paper-200)", background: "var(--ink-900)", padding: "16px 28px", borderRadius: "var(--radius-pill)", display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "4px 4px 0 var(--gold)" }}>Empieza tu proyecto →</a>
            </Magnetic>
            <a href="#proyectos" data-cursor="view" style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16, color: "var(--ink-900)", padding: "16px 24px", borderRadius: "var(--radius-pill)", border: "1.5px solid var(--ink-900)" }}>Ver trabajos</a>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
