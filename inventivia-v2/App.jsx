/* global React, SiteNav, Hero, Bands, Services, SeoIA, Playground, Projects, Process, ContactCTA, Footer, EditorialCursor, useReveal */
function App() {
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
      <SiteNav active="home" />
      <main>
        <Hero />
        <Bands />
        <Services />
        <SeoIA />
        <Playground />
        <Projects />
        <Process />
        <ContactCTA />
      </main>
      <Footer />
    </React.Fragment>
  );
}
window.App = App;
