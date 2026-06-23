/* global React, Marquee */
function Bands() {
  const big = (t, i) => (
    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem, 6vw, 5.5rem)", letterSpacing: "-0.03em", lineHeight: 1, color: i % 2 ? "transparent" : "var(--paper-200)", WebkitTextStroke: i % 2 ? "1.5px var(--paper-200)" : "0", textTransform: "uppercase" }}>{t}</span>
  );
  return (
    <section style={{ background: "var(--ink-900)", padding: "clamp(2.4rem, 5vw, 4rem) 0", overflow: "hidden", borderTop: "2px solid var(--gold)", borderBottom: "2px solid var(--gold)" }}>
      <Marquee dir="left" speed={30}
        items={["Diseño Web", "SEO", "Inteligencia Artificial", "Branding"].map(big)}
        sep={<span style={{ color: "var(--gold)", margin: "0 0.5em" }}>✦</span>} />
      <div style={{ height: "clamp(0.6rem,1.6vw,1.4rem)" }} />
      <Marquee dir="right" speed={34}
        items={["Social Media", "Automatización", "Leads", "Google Ads"].map((t, i) => big(t, i + 1))}
        sep={<span style={{ color: "var(--gold)", margin: "0 0.5em" }}>◆</span>} />
    </section>
  );
}
window.Bands = Bands;
