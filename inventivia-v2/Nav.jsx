/* global React, Marquee */
function Nav() {
  const { Button } = window.InventiviaDesignSystem_a147c4;
  const [hidden, setHidden] = React.useState(false);
  const lastY = React.useRef(0);
  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 200 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [["Servicios", "#servicios"], ["SEO+IA", "#seo-ia"], ["Juega", "#playground"], ["Proyectos", "#proyectos"], ["Proceso", "#proceso"]];
  const ticker = ["Diseño web", "SEO", "Inteligencia artificial", "Branding", "Social media", "Automatización", "Captación de leads", "Google Ads"];
  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, transform: hidden ? "translateY(-100%)" : "translateY(0)", transition: "transform .5s cubic-bezier(.16,1,.3,1)" }}>
      {/* top ticker bar */}
      <div style={{ background: "var(--ink-900)", color: "var(--paper-200)", borderBottom: "1px solid var(--ink-600)" }}>
        <Marquee speed={28} items={ticker}
          itemStyle={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", padding: "7px 0", color: "var(--paper-200)" }}
          sep="✦" sepStyle={{ color: "var(--gold)" }} />
      </div>
      {/* main bar */}
      <div style={{ background: "rgba(243,242,229,0.86)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--ink-900)" }}>
        <div style={{ maxWidth: "var(--container-wide)", margin: "0 auto", padding: "0 var(--gutter)", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#top" data-cursor="view" style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <img src={(window.__resources && window.__resources.mark) || "assets/mark.svg"} alt="" style={{ width: 26, height: 26, animation: window.KIN_REDUCED ? "none" : "kin-spin 20s linear infinite" }} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, letterSpacing: "-0.04em", color: "var(--ink-900)" }}>Inventiv<span style={{ color: "var(--gold-deep)" }}>ia</span></span>
          </a>
          <nav className="kin-desktop" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {links.map(([l, h]) => (
              <a key={l} href={h} data-cursor="view" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-800)", position: "relative", paddingBottom: 2 }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold-deep)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--ink-800)"; }}>{l}</a>
            ))}
          </nav>
          <a href="#contacto" data-cursor="view" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--paper-200)", background: "var(--ink-900)", padding: "9px 18px", borderRadius: "var(--radius-pill)", display: "inline-flex", alignItems: "center", gap: 8, transition: "background .25s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-deep)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink-900)")}>Hablemos →</a>
        </div>
      </div>
    </header>
  );
}
window.Nav = Nav;
