var InventiviaHome = (() => {
  const { useRef: uR, useEffect: uE, useState: uS, useCallback: uC } = React;
  const KIN_REDUCED = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const KIN_TOUCH = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  function WordReveal({ text, as = "span", delay = 0, stagger = 60, start = "load", byLetter = false, style = {}, wordStyle = {} }) {
    const ref = uR(null);
    const [go, setGo] = uS(start === "load");
    uE(() => {
      if (start !== "scroll" || KIN_REDUCED) {
        setGo(true);
        return;
      }
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) {
          setGo(true);
          io.disconnect();
        }
      }), { threshold: 0.3 });
      if (ref.current) io.observe(ref.current);
      return () => io.disconnect();
    }, [start]);
    const words = String(text).split(" ");
    const Tag = as;
    const shown = go || KIN_REDUCED;
    if (byLetter) {
      let k = 0;
      return /* @__PURE__ */ React.createElement(Tag, { ref, style: { display: "inline", ...style } }, words.map((w, wi) => /* @__PURE__ */ React.createElement("span", { key: wi, style: { display: "inline-block", whiteSpace: "nowrap" } }, Array.from(w).map((ch, ci) => {
        const idx = k++;
        return /* @__PURE__ */ React.createElement("span", { key: ci, style: { display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.1em", marginBottom: "-0.1em" } }, /* @__PURE__ */ React.createElement("span", { style: {
          display: "inline-block",
          transform: shown ? "translateY(0) rotate(0deg)" : "translateY(115%) rotate(6deg)",
          opacity: shown ? 1 : 0,
          transition: `transform 1s cubic-bezier(.16,1,.3,1) ${delay + idx * stagger}ms, opacity .6s ease ${delay + idx * stagger}ms`,
          ...wordStyle
        } }, ch));
      }), wi < words.length - 1 ? "\xA0" : "")));
    }
    return /* @__PURE__ */ React.createElement(Tag, { ref, style: { display: "inline", ...style } }, words.map((w, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: { display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.08em", marginBottom: "-0.08em" } }, /* @__PURE__ */ React.createElement("span", { style: {
      display: "inline-block",
      transform: shown ? "translateY(0) rotate(0deg)" : "translateY(110%) rotate(4deg)",
      opacity: shown ? 1 : 0,
      transition: `transform .9s cubic-bezier(.16,1,.3,1) ${delay + i * stagger}ms, opacity .7s ease ${delay + i * stagger}ms`,
      ...wordStyle
    } }, w, i < words.length - 1 ? "\xA0" : ""))));
  }
  function RotatingSeal({ text = "INVENTIVIA \xB7 MARKETING \xB7 ", size = 150, speed = 18, color = "var(--ink-900)", fill = "var(--gold)", center, reverse = false, style = {} }) {
    const id = uR("seal-" + Math.random().toString(36).slice(2, 8));
    const svgRef = uR(null);
    const r = size / 2 - 14;
    const chars = text.repeat(2).slice(0, Math.max(text.length, 1) * 2);
    const boost = (fast) => () => {
      if (svgRef.current && !KIN_REDUCED) svgRef.current.style.animationDuration = `${fast ? speed / 3.2 : speed}s`;
    };
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        onPointerEnter: boost(true),
        onPointerLeave: boost(false),
        style: { width: size, height: size, position: "relative", display: "grid", placeItems: "center", transition: "transform .4s cubic-bezier(.34,1.56,.64,1)", ...style },
        onPointerDown: (e) => {
          e.currentTarget.style.transform = "scale(1.08)";
        },
        onPointerUp: (e) => {
          e.currentTarget.style.transform = "scale(1)";
        }
      },
      /* @__PURE__ */ React.createElement(
        "svg",
        {
          ref: svgRef,
          viewBox: `0 0 ${size} ${size}`,
          width: size,
          height: size,
          style: { animation: KIN_REDUCED ? "none" : `kin-spin ${speed}s linear infinite ${reverse ? "reverse" : ""}`, transition: "animation-duration .5s" }
        },
        /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("path", { id: id.current, d: `M ${size / 2},${size / 2} m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0` })),
        /* @__PURE__ */ React.createElement("text", { fill: color, style: { fontFamily: "var(--font-mono)", fontSize: size * 0.082, letterSpacing: "0.18em", fontWeight: 700, textTransform: "uppercase" } }, /* @__PURE__ */ React.createElement("textPath", { href: `#${id.current}`, startOffset: "0%" }, chars))
      ),
      /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", width: size * 0.42, height: size * 0.42, borderRadius: "50%", background: fill, display: "grid", placeItems: "center", color } }, center)
    );
  }
  function OrbitCluster({ items, radius = 130, speed = 26, hub, size = 320 }) {
    return /* @__PURE__ */ React.createElement("div", { style: { width: size, height: size, position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, animation: KIN_REDUCED ? "none" : `kin-spin ${speed}s linear infinite` } }, items.map((it, i) => {
      const a = i / items.length * Math.PI * 2;
      const x = Math.cos(a) * radius, y = Math.sin(a) * radius;
      return /* @__PURE__ */ React.createElement("div", { key: i, style: { position: "absolute", top: "50%", left: "50%", transform: `translate(-50%,-50%) translate(${x}px, ${y}px)` } }, /* @__PURE__ */ React.createElement("div", { style: { animation: KIN_REDUCED ? "none" : `kin-spin ${speed}s linear infinite reverse` } }, it));
    })), hub && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" } }, hub));
  }
  function Draggable({ children, bounds = 110, idle = true, idleDelay = 0, z = 2, style = {}, ...rest }) {
    const elRef = uR(null);
    const st = uR({ x: 0, y: 0, vx: 0, vy: 0, dragging: false, raf: 0, last: 0, px: 0, py: 0 });
    const [grab, setGrab] = uS(false);
    const apply = () => {
      if (elRef.current) elRef.current.style.transform = `translate3d(${st.current.x}px, ${st.current.y}px, 0)`;
    };
    const tick = () => {
      const s = st.current;
      if (s.dragging) {
        s.raf = requestAnimationFrame(tick);
        return;
      }
      s.vx *= 0.93;
      s.vy *= 0.93;
      s.x += s.vx;
      s.y += s.vy;
      if (s.x > bounds) {
        s.x = bounds;
        s.vx *= -0.5;
      }
      if (s.x < -bounds) {
        s.x = -bounds;
        s.vx *= -0.5;
      }
      if (s.y > bounds) {
        s.y = bounds;
        s.vy *= -0.5;
      }
      if (s.y < -bounds) {
        s.y = -bounds;
        s.vy *= -0.5;
      }
      apply();
      if (Math.abs(s.vx) > 0.05 || Math.abs(s.vy) > 0.05) s.raf = requestAnimationFrame(tick);
      else {
        cancelAnimationFrame(s.raf);
        s.raf = 0;
      }
    };
    const onDown = (e) => {
      const s = st.current;
      s.dragging = true;
      setGrab(true);
      s.last = performance.now();
      s.px = e.clientX;
      s.py = e.clientY;
      cancelAnimationFrame(s.raf);
      elRef.current.setPointerCapture?.(e.pointerId);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    };
    const onMove = (e) => {
      const s = st.current;
      if (!s.dragging) return;
      const now = performance.now(), dt = Math.max(now - s.last, 1);
      const dx = e.clientX - s.px, dy = e.clientY - s.py;
      s.x += dx;
      s.y += dy;
      s.vx = dx / dt * 16;
      s.vy = dy / dt * 16;
      s.px = e.clientX;
      s.py = e.clientY;
      s.last = now;
      apply();
    };
    const onUp = () => {
      const s = st.current;
      s.dragging = false;
      setGrab(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      if (!KIN_REDUCED) s.raf = requestAnimationFrame(tick);
    };
    uE(() => {
      apply();
      return () => cancelAnimationFrame(st.current.raf);
    }, []);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        ref: elRef,
        onPointerDown: onDown,
        "data-cursor": "drag",
        style: {
          position: "absolute",
          cursor: grab ? "grabbing" : "grab",
          touchAction: "none",
          userSelect: "none",
          zIndex: grab ? 60 : z,
          animation: idle && !KIN_REDUCED ? `kin-bob 7s ease-in-out ${idleDelay}ms infinite` : "none",
          ...style
        },
        ...rest
      },
      children
    );
  }
  function Magnetic({ children, strength = 0.4, radius = 110, style = {}, as = "div", ...rest }) {
    const ref = uR(null);
    uE(() => {
      if (KIN_REDUCED || KIN_TOUCH) return;
      const el = ref.current;
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = e.clientX - cx, dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        el.style.transform = dist < radius + Math.max(r.width, r.height) / 2 ? `translate(${dx * strength}px, ${dy * strength}px)` : "translate(0,0)";
      };
      const onLeave = () => {
        el.style.transform = "translate(0,0)";
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerleave", onLeave);
      return () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerleave", onLeave);
      };
    }, [strength, radius]);
    const Tag = as;
    return /* @__PURE__ */ React.createElement(Tag, { ref, style: { display: "inline-flex", transition: "transform .4s cubic-bezier(.34,1.56,.64,1)", ...style }, ...rest }, children);
  }
  function Marquee({ items, speed = 32, sep, dir = "left", style = {}, itemStyle = {}, sepStyle = {} }) {
    const [slow, setSlow] = uS(false);
    const content = [...items, ...items];
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        onPointerEnter: () => setSlow(true),
        onPointerLeave: () => setSlow(false),
        style: { overflow: "hidden", ...style }
      },
      /* @__PURE__ */ React.createElement("div", { style: {
        display: "inline-flex",
        whiteSpace: "nowrap",
        willChange: "transform",
        animation: KIN_REDUCED ? "none" : `${dir === "left" ? "kin-marq-l" : "kin-marq-r"} ${slow ? speed * 2.6 : speed}s linear infinite`,
        animationPlayState: "running",
        transition: "none"
      } }, content.map((it, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: { display: "inline-flex", alignItems: "center", ...itemStyle } }, it, sep != null && /* @__PURE__ */ React.createElement("span", { style: { margin: "0 0.7em", ...sepStyle } }, sep))))
    );
  }
  function EditorialCursor() {
    const dot = uR(null), ring = uR(null), label = uR(null);
    uE(() => {
      if (KIN_REDUCED || KIN_TOUCH) return;
      let tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, raf;
      const onMove = (e) => {
        tx = e.clientX;
        ty = e.clientY;
        if (dot.current) dot.current.style.transform = `translate(${tx}px, ${ty}px)`;
        const t = e.target.closest?.("[data-cursor]");
        const ringEl = ring.current, lab = label.current;
        if (t) {
          const kind = t.getAttribute("data-cursor");
          ringEl.style.width = ringEl.style.height = "64px";
          ringEl.style.borderColor = "var(--gold)";
          lab.textContent = kind === "drag" ? "ARRASTRA" : kind === "view" ? "VER" : "";
          lab.style.opacity = lab.textContent ? "1" : "0";
        } else {
          ringEl.style.width = ringEl.style.height = "30px";
          ringEl.style.borderColor = "var(--ink-700)";
          lab.style.opacity = "0";
        }
      };
      const loop = () => {
        x += (tx - x) * 0.2;
        y += (ty - y) * 0.2;
        if (ring.current) ring.current.style.transform = `translate(${x}px, ${y}px)`;
        raf = requestAnimationFrame(loop);
      };
      addEventListener("pointermove", onMove);
      loop();
      document.body.style.cursor = "none";
      return () => {
        removeEventListener("pointermove", onMove);
        cancelAnimationFrame(raf);
        document.body.style.cursor = "";
      };
    }, []);
    if (KIN_TOUCH) return null;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { ref: dot, style: { position: "fixed", top: 0, left: 0, width: 6, height: 6, marginLeft: -3, marginTop: -3, borderRadius: "50%", background: "var(--gold)", pointerEvents: "none", zIndex: 9999 } }), /* @__PURE__ */ React.createElement("div", { ref: ring, style: { position: "fixed", top: 0, left: 0, width: 30, height: 30, marginLeft: -15, marginTop: -15, borderRadius: "50%", border: "1.5px solid var(--ink-700)", pointerEvents: "none", zIndex: 9998, transition: "width .25s, height .25s, border-color .25s", display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement("span", { ref: label, style: { fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.1em", color: "var(--gold)", opacity: 0, transition: "opacity .2s", whiteSpace: "nowrap" } })));
  }
  function CountUp({ to, prefix = "", suffix = "", dur = 1400, style = {} }) {
    const ref = uR(null);
    const [val, setVal] = uS(0);
    uE(() => {
      if (KIN_REDUCED) {
        setVal(to);
        return;
      }
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) {
          const t0 = performance.now();
          const step = (t) => {
            const p = Math.min((t - t0) / dur, 1);
            setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io.disconnect();
        }
      }), { threshold: 0.5 });
      if (ref.current) io.observe(ref.current);
      return () => io.disconnect();
    }, [to]);
    return /* @__PURE__ */ React.createElement("span", { ref, style }, prefix, val, suffix);
  }
  function useReveal() {
    uE(() => {
      const els = document.querySelectorAll("[data-reveal]");
      els.forEach((el) => {
        const dir = el.getAttribute("data-reveal-dir") || "up";
        const sc = el.hasAttribute("data-reveal-scale") ? " scale(0.9)" : "";
        const off = (dir === "left" ? "translateX(48px)" : dir === "right" ? "translateX(-48px)" : dir === "down" ? "translateY(-44px)" : "translateY(48px)") + sc;
        el.style.opacity = "0";
        el.style.transform = off;
        el.style.transition = "opacity 1s cubic-bezier(.16,1,.3,1), transform 1s cubic-bezier(.16,1,.3,1)";
        el.style.willChange = "opacity, transform";
      });
      if (KIN_REDUCED) {
        els.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
        return;
      }
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) {
          const d = e.target.getAttribute("data-reveal-delay") || 0;
          e.target.style.transitionDelay = `${d}ms`;
          e.target.style.opacity = "1";
          e.target.style.transform = "none";
          io.unobserve(e.target);
        }
      }), { threshold: 0.16 });
      els.forEach((el) => io.observe(el));
      return () => io.disconnect();
    }, []);
  }
  Object.assign(window, { WordReveal, RotatingSeal, OrbitCluster, Draggable, Magnetic, Marquee, EditorialCursor, CountUp, useReveal, KIN_REDUCED, KIN_TOUCH });
  const SN_CSS = `
.sn-wrap{position:fixed;top:0;left:0;right:0;z-index:200;padding:16px var(--gutter) 0;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.sn-wrap *{box-sizing:border-box}
.sn-wrap.sn-hidden{transform:translateY(-150%)}
.sn-cap{max-width:var(--container-wide);margin:0 auto;display:flex;align-items:center;gap:18px;height:60px;padding:0 8px 0 20px;border-radius:999px;background:rgba(243,242,229,.7);-webkit-backdrop-filter:blur(20px) saturate(1.5);backdrop-filter:blur(20px) saturate(1.5);border:1px solid rgba(13,13,24,.08);box-shadow:0 12px 36px -16px rgba(13,13,24,.3), inset 0 1px 0 rgba(255,255,255,.55);transition:height .4s cubic-bezier(.16,1,.3,1), background .4s, box-shadow .4s}
.sn-wrap.sn-scrolled .sn-cap{height:54px;background:rgba(243,242,229,.86);box-shadow:0 16px 44px -18px rgba(13,13,24,.42), inset 0 1px 0 rgba(255,255,255,.6)}
.sn-brand{display:flex;align-items:center;gap:10px;flex:none;text-decoration:none}
.sn-mark{width:26px;height:26px;animation:kin-spin 20s linear infinite}
.sn-word{font-family:var(--font-display);font-weight:700;font-size:20px;letter-spacing:-.04em;color:var(--ink-900);line-height:1}
.sn-word b{color:var(--gold-deep)}
.sn-links{display:flex;align-items:center;gap:2px;margin:0 auto}
.sn-link{font-family:var(--font-mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-800);padding:9px 16px;border-radius:999px;white-space:nowrap;text-decoration:none;transition:background .25s, color .25s}
.sn-link:hover{background:rgba(13,13,24,.06);color:var(--ink-900)}
.sn-link.sn-active{background:var(--ink-900);color:var(--gold)}
.sn-right{display:flex;align-items:center;gap:10px;flex:none}
.sn-cta{font-family:var(--font-mono);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-900);background:var(--gold);padding:11px 18px;border-radius:999px;display:inline-flex;align-items:center;gap:8px;border:none;cursor:pointer;text-decoration:none;transition:background .25s, transform .25s, box-shadow .25s}
.sn-cta:hover{background:var(--gold-bright);transform:translateY(-1px);box-shadow:0 10px 24px -8px rgba(197,168,49,.7)}
.sn-cta:active{transform:scale(.97)}
.sn-burger{display:none;flex-direction:column;align-items:center;justify-content:center;gap:4px;width:44px;height:44px;border-radius:999px;border:1px solid rgba(13,13,24,.12);background:transparent;cursor:pointer}
.sn-burger span{width:18px;height:2px;background:var(--ink-900);border-radius:2px;transition:transform .3s, opacity .3s}
.sn-panel{display:none}
@media(max-width:900px){
  .sn-links{display:none}
  .sn-cta-desktop{display:none}
  .sn-burger{display:flex}
  .sn-panel{display:flex;flex-direction:column;gap:4px;position:absolute;left:var(--gutter);right:var(--gutter);top:84px;background:rgba(243,242,229,.96);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border:1px solid rgba(13,13,24,.1);border-radius:24px;box-shadow:0 28px 64px -20px rgba(13,13,24,.45);padding:14px;opacity:0;transform:translateY(-12px) scale(.98);transform-origin:top right;pointer-events:none;transition:opacity .3s, transform .3s}
  .sn-wrap.sn-open .sn-panel{opacity:1;transform:none;pointer-events:auto}
  .sn-wrap.sn-open .sn-burger span:nth-child(1){transform:translateY(6px) rotate(45deg)}
  .sn-wrap.sn-open .sn-burger span:nth-child(2){opacity:0}
  .sn-wrap.sn-open .sn-burger span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
  .sn-panel a{display:flex;align-items:center;justify-content:space-between;font-family:var(--font-mono);font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-800);padding:15px 16px;border-radius:14px;text-decoration:none}
  .sn-panel a:hover,.sn-panel a.sn-active{background:rgba(13,13,24,.06);color:var(--gold-deep)}
  .sn-panel .sn-cta{justify-content:center;width:100%;margin-top:6px;font-size:13px;padding:15px;box-sizing:border-box}
}
@media(max-width:760px){
  .sn-wrap{padding:10px max(12px,var(--gutter)) 0;transform:none!important}
  .sn-cap{height:56px;padding:0 8px 0 14px;gap:10px}
  .sn-wrap.sn-scrolled .sn-cap{height:54px}
  .sn-word{font-size:18px}
  .sn-mark{width:24px;height:24px}
  .sn-panel{left:max(12px,var(--gutter));right:max(12px,var(--gutter));top:74px;max-height:calc(100dvh - 90px);overflow:auto;border-radius:20px}
}
@media(max-width:380px){
  .sn-word{font-size:17px}
  .sn-burger{width:40px;height:40px}
}
@media(prefers-reduced-motion:reduce){ .sn-mark{animation:none} }
`;
  function SiteNav({ active = "home" }) {
    const [open, setOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);
    const lastY = React.useRef(0);
    React.useEffect(() => {
      if (!document.getElementById("sn-css")) {
        const s = document.createElement("style");
        s.id = "sn-css";
        s.textContent = SN_CSS;
        document.head.appendChild(s);
      }
    }, []);
    React.useEffect(() => {
      const onScroll = () => {
        const y = window.scrollY;
        setScrolled(y > 12);
        setHidden(y > 220 && y > lastY.current && !open);
        lastY.current = y;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, [open]);
    const isHome = active === "home";
    const sec = (id) => isHome ? `#${id}` : `index.html#${id}`;
    const links = [
      ["Inicio", isHome ? "#top" : "index.html", "home"],
      ["Servicios", active === "servicios" ? "#top" : "servicios.html", "servicios"],
      ["Contacto", active === "contacto" ? "#top" : "contacto.html", "contacto"]
    ];
    const ctaHref = active === "contacto" ? "#form" : "contacto.html#form";
    const mark = window.__resources && window.__resources.mark || "assets/mark.svg";
    const wrapClass = ["sn-wrap", hidden ? "sn-hidden" : "", scrolled ? "sn-scrolled" : "", open ? "sn-open" : ""].filter(Boolean).join(" ");
    return /* @__PURE__ */ React.createElement("header", { className: wrapClass }, /* @__PURE__ */ React.createElement("div", { className: "sn-cap" }, /* @__PURE__ */ React.createElement("a", { href: isHome ? "#top" : "index.html", className: "sn-brand", "data-cursor": "view", "aria-label": "Inventivia \u2014 inicio" }, /* @__PURE__ */ React.createElement("img", { className: "sn-mark", src: mark, alt: "" }), /* @__PURE__ */ React.createElement("span", { className: "sn-word" }, "Inventiv", /* @__PURE__ */ React.createElement("b", null, "ia"))), /* @__PURE__ */ React.createElement("nav", { className: "sn-links" }, links.map(([l, h, key]) => /* @__PURE__ */ React.createElement("a", { key: l, href: h, className: "sn-link" + (key === active ? " sn-active" : ""), "data-cursor": "view" }, l))), /* @__PURE__ */ React.createElement("div", { className: "sn-right" }, /* @__PURE__ */ React.createElement("a", { href: ctaHref, className: "sn-cta sn-cta-desktop", "data-cursor": "view" }, "Hablemos \u2192"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "sn-burger", "aria-label": "Men\xFA", "aria-expanded": open, onClick: () => setOpen((o) => !o) }, /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement("span", null)))), /* @__PURE__ */ React.createElement("div", { className: "sn-panel" }, links.map(([l, h, key]) => /* @__PURE__ */ React.createElement("a", { key: l, href: h, className: key === active ? "sn-active" : "", "data-cursor": "view", onClick: () => setOpen(false) }, l, /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true" }, "\u2192"))), /* @__PURE__ */ React.createElement("a", { href: ctaHref, className: "sn-cta", "data-cursor": "view", onClick: () => setOpen(false) }, "Hablemos \u2192")));
  }
  window.SiteNav = SiteNav;
  function Hero() {
    const wrap = React.useRef(null);
    const big = React.useRef(null);
    const sub = React.useRef(null);
    React.useEffect(() => {
      if (window.KIN_REDUCED) return;
      let raf;
      const onScroll = () => {
        const y = window.scrollY;
        if (big.current) big.current.style.transform = `translateY(${y * 0.12}px)`;
        if (sub.current) sub.current.style.transform = `translateY(${y * -0.06}px)`;
      };
      const loop = () => {
        onScroll();
        raf = requestAnimationFrame(loop);
      };
      loop();
      return () => cancelAnimationFrame(raf);
    }, []);
    const chip = (label, bg, color, anim, extra = {}) => /* @__PURE__ */ React.createElement("div", { style: { padding: "9px 14px", borderRadius: "var(--radius-pill)", background: bg, color, fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "1.5px solid var(--ink-900)", boxShadow: "3px 3px 0 var(--ink-900)", whiteSpace: "nowrap", animation: window.KIN_REDUCED ? "none" : anim, ...extra } }, label);
    return /* @__PURE__ */ React.createElement("section", { id: "top", ref: wrap, style: { position: "relative", minHeight: "100vh", paddingTop: 132, paddingBottom: 40, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, opacity: 0.5, backgroundImage: "linear-gradient(90deg, var(--paper-line) 1px, transparent 1px)", backgroundSize: "calc(100% / 12) 100%", maskImage: "linear-gradient(180deg, transparent, black 18%, black 82%, transparent)" } }), /* @__PURE__ */ React.createElement("div", { "aria-hidden": "true", style: { position: "absolute", right: "-2%", top: "8%", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "26vw", lineHeight: 0.8, color: "var(--paper-300)", opacity: 0.5, letterSpacing: "-0.05em", pointerEvents: "none", userSelect: "none", animation: window.KIN_REDUCED ? "none" : "kin-drift 9s ease-in-out infinite" } }, "ia"), /* @__PURE__ */ React.createElement("div", { "aria-hidden": "true", className: "kin-hero-pieces", style: { position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5 } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "16%", right: "12%", pointerEvents: "auto", animation: window.KIN_REDUCED ? "none" : "kin-seal-in 1.1s cubic-bezier(.16,1,.3,1) both" } }, /* @__PURE__ */ React.createElement(Draggable, { bounds: 150 }, /* @__PURE__ */ React.createElement(RotatingSeal, { text: "ARRASTRA \xB7 INVENTIVIA \xB7 IA \xB7 SEO \xB7 ", size: 132, speed: 16, center: /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--ink-900)" } }, "i") }))), /* @__PURE__ */ React.createElement("div", { className: "kin-hero-chip", style: { position: "absolute", bottom: "22%", right: "30%", pointerEvents: "auto" } }, /* @__PURE__ */ React.createElement(Draggable, { bounds: 130, idleDelay: -2200 }, chip("WEB", "var(--gold)", "var(--ink-900)", "kin-pulse 3.2s ease-in-out infinite"))), /* @__PURE__ */ React.createElement("div", { className: "kin-hero-chip", style: { position: "absolute", top: "44%", right: "8%", pointerEvents: "auto" } }, /* @__PURE__ */ React.createElement(Draggable, { bounds: 120, idleDelay: -3800 }, chip("\u2726 IA", "var(--signal)", "var(--ink-900)", "kin-tilt 2.6s ease-in-out infinite"))), /* @__PURE__ */ React.createElement("div", { className: "kin-hero-chip", style: { position: "absolute", bottom: "30%", left: "6%", pointerEvents: "auto" } }, /* @__PURE__ */ React.createElement(Draggable, { bounds: 120, idleDelay: -1200 }, chip("SEO", "var(--ink-900)", "var(--paper-200)", "kin-wobble 2.9s ease-in-out infinite", { boxShadow: "3px 3px 0 var(--gold)" }))), /* @__PURE__ */ React.createElement("div", { className: "kin-hero-chip", style: { position: "absolute", top: "60%", right: "40%", pointerEvents: "auto" } }, /* @__PURE__ */ React.createElement(Draggable, { bounds: 120, idleDelay: -2800 }, chip("\u25C6 ADS", "var(--paper-100)", "var(--ink-900)", "kin-floaty 3.6s ease-in-out infinite", { boxShadow: "3px 3px 0 var(--signal-deep)" })))), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 3, maxWidth: "var(--container-wide)", margin: "0 auto", padding: "0 var(--gutter)", width: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 26 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 60, height: 1.5, background: "var(--ink-900)" } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-800)" } }, /* @__PURE__ */ React.createElement(WordReveal, { text: "Agencia de marketing digital \xB7 Murcia", delay: 100, stagger: 28 }))), /* @__PURE__ */ React.createElement("h1", { ref: big, style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(3.2rem, 11vw, 11rem)", lineHeight: 0.86, letterSpacing: "-0.05em", color: "var(--ink-900)", margin: 0, willChange: "transform" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(WordReveal, { text: "MARKETING", byLetter: true, delay: 150, stagger: 52 })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: "0.2em", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(WordReveal, { text: "QUE", byLetter: true, delay: 560, stagger: 52 }), /* @__PURE__ */ React.createElement("span", { style: { position: "relative", display: "inline-block" } }, /* @__PURE__ */ React.createElement(WordReveal, { text: "PIENSA", byLetter: true, delay: 720, stagger: 60, wordStyle: { color: "var(--gold-deep)", fontStyle: "italic" } }), /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true", style: { position: "absolute", left: 0, bottom: "0.08em", height: "0.07em", width: "100%", background: "var(--gold-deep)", transformOrigin: "left", animation: window.KIN_REDUCED ? "none" : "kin-shift 3.4s ease-in-out infinite" } }))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.42em", fontWeight: 700, color: "var(--ink-900)", marginTop: "0.3em", letterSpacing: "-0.02em" } }, /* @__PURE__ */ React.createElement(WordReveal, { text: "m\xE1s visibilidad \xB7 m\xE1s ventas", delay: 1300, stagger: 24, wordStyle: { fontWeight: 500 } }))), /* @__PURE__ */ React.createElement("div", { ref: sub, "data-reveal": true, "data-reveal-delay": "700", style: { display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 28, marginTop: 44, willChange: "transform" } }, /* @__PURE__ */ React.createElement("p", { style: { maxWidth: 460, fontSize: "var(--fs-lead)", color: "var(--ink-800)", lineHeight: 1.5, margin: 0 } }, "Webs estrat\xE9gicas, SEO real y automatizaci\xF3n con IA. Dise\xF1amos experiencias digitales que tu audiencia quiere explorar \u2014 y que convierten."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Magnetic, { strength: 0.3 }, /* @__PURE__ */ React.createElement("a", { href: "#contacto", "data-cursor": "view", style: { fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16, color: "var(--paper-200)", background: "var(--ink-900)", padding: "16px 28px", borderRadius: "var(--radius-pill)", display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "4px 4px 0 var(--gold)" } }, "Empieza tu proyecto \u2192")), /* @__PURE__ */ React.createElement("a", { href: "#proyectos", "data-cursor": "view", style: { fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16, color: "var(--ink-900)", padding: "16px 24px", borderRadius: "var(--radius-pill)", border: "1.5px solid var(--ink-900)" } }, "Ver trabajos")))));
  }
  window.Hero = Hero;
  function Bands() {
    const big = (t, i) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem, 6vw, 5.5rem)", letterSpacing: "-0.03em", lineHeight: 1, color: i % 2 ? "transparent" : "var(--paper-200)", WebkitTextStroke: i % 2 ? "1.5px var(--paper-200)" : "0", textTransform: "uppercase" } }, t);
    return /* @__PURE__ */ React.createElement("section", { style: { background: "var(--ink-900)", padding: "clamp(2.4rem, 5vw, 4rem) 0", overflow: "hidden", borderTop: "2px solid var(--gold)", borderBottom: "2px solid var(--gold)" } }, /* @__PURE__ */ React.createElement(
      Marquee,
      {
        dir: "left",
        speed: 30,
        items: ["Dise\xF1o Web", "SEO", "Inteligencia Artificial", "Branding"].map(big),
        sep: /* @__PURE__ */ React.createElement("span", { style: { color: "var(--gold)", margin: "0 0.5em" } }, "\u2726")
      }
    ), /* @__PURE__ */ React.createElement("div", { style: { height: "clamp(0.6rem,1.6vw,1.4rem)" } }), /* @__PURE__ */ React.createElement(
      Marquee,
      {
        dir: "right",
        speed: 34,
        items: ["Social Media", "Automatizaci\xF3n", "Leads", "Google Ads"].map((t, i) => big(t, i + 1)),
        sep: /* @__PURE__ */ React.createElement("span", { style: { color: "var(--gold)", margin: "0 0.5em" } }, "\u25C6")
      }
    ));
  }
  window.Bands = Bands;
  const KIN_SVC = [
    { n: "01", t: "Dise\xF1o Web", d: "Webs estrat\xE9gicas que atrapan miradas y convierten visitas en clientes.", tags: "UX \xB7 UI \xB7 Desarrollo", c: "var(--gold)" },
    { n: "02", t: "Posicionamiento SEO", d: "Escalamos tu marca a la cima de Google con estrategia t\xE9cnica, contenido e IA.", tags: "T\xE9cnico \xB7 Contenido \xB7 Local", c: "var(--signal)" },
    { n: "03", t: "Inteligencia Artificial", d: "Automatizamos captaci\xF3n, respuestas y procesos para que trabajen por ti 24/7.", tags: "Agentes \xB7 Flujos \xB7 Datos", c: "var(--gold-bright)" },
    { n: "04", t: "Branding", d: "Identidades con car\xE1cter: marcas que se recuerdan y se diferencian de verdad.", tags: "Identidad \xB7 Voz \xB7 Sistema", c: "var(--paper-300)" },
    { n: "05", t: "Social Media", d: "Conectamos tu marca con audiencias reales con contenido que engancha y vende.", tags: "Estrategia \xB7 Contenido \xB7 Ads", c: "var(--signal)" }
  ];
  function Row({ s, i }) {
    const [h, setH] = React.useState(false);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        "data-reveal": true,
        "data-reveal-dir": i % 2 ? "right" : "left",
        "data-cursor": "view",
        onMouseEnter: () => setH(true),
        onMouseLeave: () => setH(false),
        style: { position: "relative", borderBottom: "1px solid var(--ink-900)", overflow: "hidden", cursor: "pointer" }
      },
      /* @__PURE__ */ React.createElement("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, background: s.c, transform: h ? "translateY(0)" : "translateY(101%)", transition: "transform .5s cubic-bezier(.16,1,.3,1)" } }),
      /* @__PURE__ */ React.createElement("div", { style: { position: "relative", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "clamp(16px,3vw,48px)", alignItems: "center", padding: "clamp(20px,3vw,40px) 0" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: "clamp(13px,1.4vw,16px)", color: h ? "var(--ink-900)" : "var(--ink-500)", letterSpacing: "0.1em", transition: "color .4s", width: 40 } }, s.n), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.8rem,4.4vw,3.6rem)", letterSpacing: "-0.03em", lineHeight: 1, color: "var(--ink-900)", margin: 0, transition: "transform .5s cubic-bezier(.16,1,.3,1)", transform: h ? "translateX(18px)" : "translateX(0)" } }, s.t), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 520, overflow: "hidden", height: h ? 64 : 0, opacity: h ? 1 : 0, transition: "height .45s cubic-bezier(.16,1,.3,1), opacity .4s", marginTop: h ? 12 : 0 } }, /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-800)", fontSize: 15, lineHeight: 1.5, margin: 0, transform: h ? "translateX(18px)" : "translateX(0)", transition: "transform .5s cubic-bezier(.16,1,.3,1)" } }, s.d))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 22 } }, /* @__PURE__ */ React.createElement("span", { className: "kin-desktop", style: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: h ? "var(--ink-900)" : "var(--ink-500)", transition: "color .4s", whiteSpace: "nowrap" } }, s.tags), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 30, color: "var(--ink-900)", transform: h ? "rotate(0deg) translateX(0)" : "rotate(-45deg)", transition: "transform .5s cubic-bezier(.34,1.56,.64,1)", display: "inline-block" } }, "\u2192")))
    );
  }
  function Services() {
    return /* @__PURE__ */ React.createElement("section", { id: "servicios", style: { background: "var(--paper-200)", padding: "var(--section-y) 0" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "var(--container-wide)", margin: "0 auto", padding: "0 var(--gutter)" } }, /* @__PURE__ */ React.createElement("div", { "data-reveal": true, style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 30 } }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.2rem,5vw,4rem)", letterSpacing: "-0.04em", lineHeight: 0.95, color: "var(--ink-900)", margin: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: "0.2em", fontWeight: 700, letterSpacing: "0.2em", verticalAlign: "super", color: "var(--gold-deep)" } }, "(qu\xE9 hacemos)"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(WordReveal, { text: "Servicios que mueven", start: "scroll", stagger: 50 })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 36 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 40, color: "var(--gold-deep)", lineHeight: 1 } }, /* @__PURE__ */ React.createElement(CountUp, { to: 12, suffix: "+" })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-700)", marginTop: 4 } }, "Marcas")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 40, color: "var(--ink-900)", lineHeight: 1 } }, /* @__PURE__ */ React.createElement(CountUp, { to: 180, prefix: "+", suffix: "%" })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-700)", marginTop: 4 } }, "Tr\xE1fico")))), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid var(--ink-900)" } }, KIN_SVC.map((s, i) => /* @__PURE__ */ React.createElement(Row, { key: s.n, s, i })))));
  }
  window.Services = Services;
  function SeoIA() {
    const rows = [
      { kw: "agencia marketing murcia", pos: 1, w: "94%" },
      { kw: "dise\xF1o web murcia", pos: 2, w: "86%" },
      { kw: "seo murcia", pos: 1, w: "97%" },
      { kw: "automatizaci\xF3n ia pymes", pos: 3, w: "72%" }
    ];
    const orbitChip = (label) => /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 13px", borderRadius: "var(--radius-pill)", background: "var(--ink-800)", color: "var(--paper-200)", fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid var(--gold-hairline)", whiteSpace: "nowrap" } }, label);
    return /* @__PURE__ */ React.createElement("section", { id: "seo-ia", style: { background: "var(--ink-900)", color: "var(--paper-200)", padding: "var(--section-y) 0", position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { className: "kin-split", style: { maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 60, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { "data-reveal": true, "data-reveal-dir": "right" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 22 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 40, height: 1.5, background: "var(--signal)" } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--signal)" } }, "SEO + Inteligencia Artificial")), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem,5.2vw,4.6rem)", letterSpacing: "-0.04em", lineHeight: 0.92, margin: 0, color: "var(--paper-200)" } }, /* @__PURE__ */ React.createElement(WordReveal, { text: "Posicionamiento", start: "scroll", stagger: 40 }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { fontStyle: "italic", color: "var(--signal)" } }, /* @__PURE__ */ React.createElement(WordReveal, { text: "que trabaja solo", start: "scroll", delay: 200, stagger: 40 }))), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--gray-100)", fontSize: "var(--fs-lead)", marginTop: 22, maxWidth: 480, lineHeight: 1.5 } }, "Unimos SEO t\xE9cnico con automatizaci\xF3n inteligente: an\xE1lisis de intenci\xF3n, generaci\xF3n de contenido y monitorizaci\xF3n continua. Tu web sube \u2014 y se mantiene arriba."), /* @__PURE__ */ React.createElement("ul", { style: { listStyle: "none", padding: 0, margin: "28px 0 0", display: "flex", flexDirection: "column", gap: 12 } }, ["Investigaci\xF3n de palabras clave con IA", "Contenido por intenci\xF3n de b\xFAsqueda", "Informes y seguimiento autom\xE1ticos 24/7", "Schema, velocidad y Core Web Vitals"].map((t) => /* @__PURE__ */ React.createElement("li", { key: t, style: { display: "flex", gap: 12, alignItems: "center", color: "var(--gray-100)", fontSize: 15, fontFamily: "var(--font-mono)", letterSpacing: "0.02em" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--signal)" } }, "\u25B8"), t))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 32 } }, /* @__PURE__ */ React.createElement(Magnetic, { strength: 0.3 }, /* @__PURE__ */ React.createElement("a", { href: "#contacto", "data-cursor": "view", style: { fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16, color: "var(--ink-900)", background: "var(--signal)", padding: "15px 26px", borderRadius: "var(--radius-pill)", display: "inline-flex", alignItems: "center", gap: 10 } }, "Audita tu web gratis \u2192")))), /* @__PURE__ */ React.createElement("div", { "data-reveal": true, "data-reveal-dir": "left", style: { position: "relative", display: "grid", placeItems: "center", minHeight: 420 } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", opacity: 0.9 } }, /* @__PURE__ */ React.createElement(OrbitCluster, { size: 440, radius: 210, speed: 32, items: ["AUDIT", "KEYWORDS", "SCHEMA", "CONTENT", "SPEED", "RANK"].map(orbitChip) })), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", width: "min(360px, 80%)", background: "var(--ink-800)", border: "1px solid var(--gold-hairline)", borderRadius: "var(--radius-lg)", padding: 22, boxShadow: "var(--shadow-xl)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", color: "var(--gray-100)" } }, "RANKINGS \xB7 inventivia.ai"), /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--signal)", textTransform: "uppercase" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: "var(--signal)", boxShadow: "0 0 8px var(--signal)" } }), "En directo")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 13 } }, rows.map((r) => /* @__PURE__ */ React.createElement("div", { key: r.kw }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6, fontFamily: "var(--font-mono)" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--gray-100)" } }, r.kw), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--signal)" } }, "#", r.pos, " \u2191")), /* @__PURE__ */ React.createElement("div", { style: { height: 7, borderRadius: 99, background: "var(--ink-900)", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { className: "kin-bar", style: { height: "100%", width: r.w, borderRadius: 99, background: "linear-gradient(90deg, var(--signal-deep), var(--signal))" } }))))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 18, padding: "12px 14px", borderRadius: "var(--radius-md)", background: "rgba(111,227,194,0.07)", border: "1px solid rgba(111,227,194,0.18)", fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--gray-100)", display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--signal)" } }, "\u26A1"), " Agente IA: 18 mejoras aplicadas hoy.")))));
  }
  window.SeoIA = SeoIA;
  const KIN_ORBS = [
    { label: "SEO", r: 56, bg: "var(--gold)", fg: "var(--ink-900)", b: false },
    { label: "WEB", r: 64, bg: "var(--ink-900)", fg: "var(--paper-200)", b: true },
    { label: "IA", r: 74, bg: "var(--signal)", fg: "var(--ink-900)", b: false },
    { label: "SOCIAL", r: 50, bg: "var(--paper-100)", fg: "var(--ink-900)", b: true },
    { label: "BRANDING", r: 60, bg: "var(--gold-bright)", fg: "var(--ink-900)", b: false },
    { label: "LEADS", r: 48, bg: "var(--ink-800)", fg: "var(--gold)", b: false },
    { label: "ADS", r: 46, bg: "var(--signal-deep)", fg: "var(--paper-200)", b: false }
  ];
  function Playground() {
    const fieldRef = React.useRef(null);
    const bodiesRef = React.useRef([]);
    const rafRef = React.useRef(0);
    const dragRef = React.useRef({ i: -1, px: 0, py: 0, last: 0 });
    const [ready, setReady] = React.useState(false);
    React.useEffect(() => {
      const field = fieldRef.current;
      if (!field) return;
      const reduced = window.KIN_REDUCED;
      const init = () => {
        const W = field.clientWidth, H = field.clientHeight, n = KIN_ORBS.length;
        bodiesRef.current = KIN_ORBS.map((o, i) => {
          const col = (i + 0.5) / n;
          const x = Math.max(16, Math.min(W - o.r * 2 - 16, col * (W - o.r * 2)));
          const y = H * 0.5 - o.r + Math.sin(i * 1.3) * (H * 0.26);
          return { ...o, i, x, y, vx: reduced ? 0 : (Math.random() - 0.5) * 1.4, vy: reduced ? 0 : (Math.random() - 0.5) * 1.4, el: field.querySelector(`[data-orb="${i}"]`) };
        });
        bodiesRef.current.forEach((b) => {
          if (b.el) b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
        });
        setReady(true);
      };
      const id = requestAnimationFrame(init);
      const step = () => {
        const W = field.clientWidth, H = field.clientHeight, bodies = bodiesRef.current;
        for (let a = 0; a < bodies.length; a++) {
          const b = bodies[a];
          if (dragRef.current.i === a) continue;
          b.x += b.vx;
          b.y += b.vy;
          b.vx *= 0.992;
          b.vy *= 0.992;
          if (b.x < 0) {
            b.x = 0;
            b.vx = Math.abs(b.vx) * 0.7;
          }
          if (b.x > W - b.r * 2) {
            b.x = W - b.r * 2;
            b.vx = -Math.abs(b.vx) * 0.7;
          }
          if (b.y < 0) {
            b.y = 0;
            b.vy = Math.abs(b.vy) * 0.7;
          }
          if (b.y > H - b.r * 2) {
            b.y = H - b.r * 2;
            b.vy = -Math.abs(b.vy) * 0.7;
          }
        }
        for (let a = 0; a < bodies.length; a++) for (let c = a + 1; c < bodies.length; c++) {
          const A = bodies[a], B = bodies[c];
          const ax = A.x + A.r, ay = A.y + A.r, bx = B.x + B.r, by = B.y + B.r;
          let dx = bx - ax, dy = by - ay, d = Math.hypot(dx, dy) || 1;
          const min = A.r + B.r;
          if (d < min) {
            const push = (min - d) / 2, nx = dx / d, ny = dy / d;
            if (dragRef.current.i !== a) {
              A.x -= nx * push;
              A.y -= ny * push;
              A.vx -= nx * 0.3;
              A.vy -= ny * 0.3;
            }
            if (dragRef.current.i !== c) {
              B.x += nx * push;
              B.y += ny * push;
              B.vx += nx * 0.3;
              B.vy += ny * 0.3;
            }
          }
        }
        for (const b of bodies) if (b.el) b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
        rafRef.current = requestAnimationFrame(step);
      };
      if (!reduced) rafRef.current = requestAnimationFrame(step);
      return () => {
        cancelAnimationFrame(id);
        cancelAnimationFrame(rafRef.current);
      };
    }, []);
    const grab = (i) => (e) => {
      e.preventDefault();
      dragRef.current = { i, px: e.clientX, py: e.clientY, last: performance.now() };
      const b = bodiesRef.current[i];
      b.vx = 0;
      b.vy = 0;
      e.currentTarget.setPointerCapture?.(e.pointerId);
      const el = e.currentTarget;
      el.style.scale = "1.14";
      el.style.rotate = "-6deg";
      el.style.zIndex = "40";
      el.style.boxShadow = "10px 14px 0 var(--ink-900)";
      const onMove = (ev) => {
        const bd = bodiesRef.current[i];
        const now = performance.now(), dt = Math.max(now - dragRef.current.last, 1);
        const dx = ev.clientX - dragRef.current.px, dy = ev.clientY - dragRef.current.py;
        bd.x += dx;
        bd.y += dy;
        bd.vx = dx / dt * 16;
        bd.vy = dy / dt * 16;
        dragRef.current.px = ev.clientX;
        dragRef.current.py = ev.clientY;
        dragRef.current.last = now;
        if (bd.el) bd.el.style.transform = `translate3d(${bd.x}px, ${bd.y}px, 0)`;
      };
      const onUp = () => {
        dragRef.current.i = -1;
        el.style.scale = "1";
        el.style.rotate = "0deg";
        el.style.boxShadow = "4px 4px 0 var(--ink-900)";
        setTimeout(() => {
          el.style.zIndex = "";
        }, 300);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    };
    return /* @__PURE__ */ React.createElement("section", { id: "playground", style: { background: "var(--paper-200)", padding: "var(--section-y) 0", position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "var(--container-wide)", margin: "0 auto", padding: "0 var(--gutter)" } }, /* @__PURE__ */ React.createElement("div", { "data-reveal": true, style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 30 } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 640 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-deep)" } }, "(zona interactiva)"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.2rem,5vw,4rem)", letterSpacing: "-0.04em", lineHeight: 0.95, color: "var(--ink-900)", margin: "14px 0 0" } }, "C\xF3gelos. L\xE1nzalos.", /* @__PURE__ */ React.createElement("br", null), "Juega."), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-800)", fontSize: "var(--fs-body)", marginTop: 16, maxWidth: 500 } }, "Arrastra los orbes con el dedo o el rat\xF3n \u2014 tienen peso, rebotan y se empujan. Como una buena estrategia: todo conectado, todo en movimiento.")), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-700)", border: "1.5px solid var(--ink-900)", borderRadius: "var(--radius-pill)", padding: "8px 16px", display: "inline-flex", alignItems: "center", gap: 8 } }, "arrastra las piezas ", /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", animation: window.KIN_REDUCED ? "none" : "kin-hint 1.6s ease-in-out infinite" } }, "\u2726"))), /* @__PURE__ */ React.createElement(
      "div",
      {
        "data-reveal": true,
        "data-reveal-scale": true,
        ref: fieldRef,
        style: { position: "relative", height: "clamp(380px, 52vh, 560px)", borderRadius: "var(--radius-xl)", border: "2px solid var(--ink-900)", overflow: "hidden", background: "var(--paper-100)", boxShadow: "8px 8px 0 var(--ink-900)", touchAction: "none", cursor: "grab" }
      },
      /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, opacity: 0.6, backgroundImage: "radial-gradient(var(--paper-300) 1.5px, transparent 1.5px)", backgroundSize: "26px 26px" } }),
      /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 16, left: 20, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-600)" } }, "f\xEDsica en vivo \xB7 ", KIN_ORBS.length, " objetos"),
      KIN_ORBS.map((o, i) => /* @__PURE__ */ React.createElement(
        "div",
        {
          key: i,
          "data-orb": i,
          "data-cursor": "drag",
          onPointerDown: grab(i),
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            width: o.r * 2,
            height: o.r * 2,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            textAlign: "center",
            background: o.bg,
            color: o.fg,
            cursor: "grab",
            touchAction: "none",
            userSelect: "none",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: o.r < 52 ? 11 : 13,
            letterSpacing: "0.06em",
            border: "2px solid var(--ink-900)",
            boxShadow: "4px 4px 0 var(--ink-900)",
            opacity: ready ? 1 : 0,
            transition: "opacity .5s, scale .35s cubic-bezier(.34,1.56,.64,1), rotate .35s var(--ease-out), box-shadow .35s var(--ease-out)"
          }
        },
        o.label
      ))
    )));
  }
  window.Playground = Playground;
  const KIN_PROJ = [
    { name: "Laura Valle", cat: "Branding + Web", yr: "'25", tint: "linear-gradient(135deg, #2a2438, #c5a831)" },
    { name: "World Adventure", cat: "Dise\xF1o web + SEO", yr: "'25", tint: "linear-gradient(135deg, #14202a, #6fe3c2)" },
    { name: "Multiculatas", cat: "E-commerce + Social", yr: "'24", tint: "linear-gradient(135deg, #2a1c14, #e4c552)" },
    { name: "Bah\xEDa Norte", cat: "Web + Automatizaci\xF3n", yr: "'24", tint: "linear-gradient(135deg, #101c2a, #7db9ff)" },
    { name: "Estudio \xC1mbar", cat: "Branding", yr: "'24", tint: "linear-gradient(135deg, #2a2018, #d8c168)" }
  ];
  function Card({ p, i }) {
    const [h, setH] = React.useState(false);
    return /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "#",
        draggable: "false",
        "data-cursor": "view",
        "data-reveal": true,
        "data-reveal-scale": true,
        "data-reveal-delay": i * 90,
        onMouseEnter: () => setH(true),
        onMouseLeave: () => setH(false),
        style: { flex: "0 0 auto", width: "clamp(280px, 34vw, 400px)", scrollSnapAlign: "center" }
      },
      /* @__PURE__ */ React.createElement("div", { style: { position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "2px solid var(--ink-900)", aspectRatio: "4 / 5", background: "var(--ink-800)", transition: "transform .4s cubic-bezier(.16,1,.3,1)", transform: h ? "translateY(-8px) rotate(-1deg)" : "none", boxShadow: h ? "10px 10px 0 var(--gold)" : "5px 5px 0 var(--ink-900)" } }, /* @__PURE__ */ React.createElement("div", { "data-image-slot": true, style: { position: "absolute", inset: 0, background: p.tint, transform: h ? "scale(1.07)" : "scale(1)", transition: "transform .7s cubic-bezier(.16,1,.3,1)" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(9,9,15,0.1) 30%, rgba(9,9,15,0.8))" } }), /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 14, left: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--paper-200)", textTransform: "uppercase" } }, String(i + 1).padStart(2, "0"), " / ", p.yr), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 18, right: 18, bottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-bright)", marginBottom: 6 } }, p.cat), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.4rem,2.6vw,2rem)", letterSpacing: "-0.02em", color: "var(--paper-200)", margin: 0 } }, p.name), /* @__PURE__ */ React.createElement("div", { style: { overflow: "hidden", height: h ? 22 : 0, opacity: h ? 1 : 0, transition: "height .4s cubic-bezier(.16,1,.3,1), opacity .35s", marginTop: h ? 8 : 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold-bright)" } }, "Ver proyecto \u2192"))))
    );
  }
  function Projects() {
    const trackRef = React.useRef(null);
    const drag = React.useRef({ down: false, sx: 0, sl: 0, moved: false });
    const onDown = (e) => {
      const el = trackRef.current;
      drag.current = { down: true, sx: e.clientX, sl: el.scrollLeft, moved: false };
      el.style.scrollBehavior = "auto";
    };
    const onMove = (e) => {
      if (!drag.current.down) return;
      const el = trackRef.current;
      const dx = e.clientX - drag.current.sx;
      if (Math.abs(dx) > 4) drag.current.moved = true;
      el.scrollLeft = drag.current.sl - dx;
    };
    const onUp = () => {
      drag.current.down = false;
    };
    const onClickCapture = (e) => {
      if (drag.current.moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    return /* @__PURE__ */ React.createElement("section", { id: "proyectos", style: { background: "var(--paper-200)", padding: "var(--section-y) 0", borderTop: "1px solid var(--ink-900)" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "var(--container-wide)", margin: "0 auto", padding: "0 var(--gutter)" } }, /* @__PURE__ */ React.createElement("div", { "data-reveal": true, style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 40 } }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.2rem,5vw,4rem)", letterSpacing: "-0.04em", lineHeight: 0.95, color: "var(--ink-900)", margin: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: "0.2em", fontWeight: 700, letterSpacing: "0.2em", verticalAlign: "super", color: "var(--gold-deep)" } }, "(trabajos)"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(WordReveal, { text: "Marcas con impacto", start: "scroll", stagger: 50 })), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-700)", display: "inline-flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", animation: window.KIN_REDUCED ? "none" : "kin-hint 1.6s ease-in-out infinite reverse" } }, "\u2190"), " arrastra ", /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", animation: window.KIN_REDUCED ? "none" : "kin-hint 1.6s ease-in-out infinite" } }, "\u2192")))), /* @__PURE__ */ React.createElement(
      "div",
      {
        ref: trackRef,
        "data-cursor": "drag",
        onPointerDown: onDown,
        onPointerMove: onMove,
        onPointerUp: onUp,
        onPointerLeave: onUp,
        onClickCapture,
        style: { display: "flex", gap: 22, overflowX: "auto", scrollSnapType: "x proximity", padding: "8px var(--gutter) 16px", cursor: "grab", touchAction: "pan-y", scrollbarWidth: "none", maxWidth: "var(--container-wide)", margin: "0 auto" }
      },
      KIN_PROJ.map((p, i) => /* @__PURE__ */ React.createElement(Card, { key: p.name, p, i })),
      /* @__PURE__ */ React.createElement("div", { style: { flex: "0 0 1px" } })
    ));
  }
  window.Projects = Projects;
  const KIN_STEPS = [
    { n: "01", t: "Escuchamos", d: "Analizamos tu negocio, tu mercado y tus objetivos reales de venta." },
    { n: "02", t: "Estrategia", d: "Dise\xF1amos un plan a medida: web, SEO, contenido y automatizaci\xF3n con IA." },
    { n: "03", t: "Creamos", d: "Construimos webs, marcas y campa\xF1as que destacan y convierten." },
    { n: "04", t: "Optimizamos", d: "Medimos, automatizamos y mejoramos en continuo para crecer sin freno." }
  ];
  function Process() {
    const secRef = React.useRef(null);
    const lineRef = React.useRef(null);
    React.useEffect(() => {
      if (window.KIN_REDUCED) {
        if (lineRef.current) lineRef.current.style.transform = "scaleY(1)";
        return;
      }
      const onScroll = () => {
        const el = secRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const prog = Math.max(0, Math.min(1, (window.innerHeight * 0.75 - r.top) / (r.height * 0.7)));
        if (lineRef.current) lineRef.current.style.transform = `scaleY(${prog})`;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return /* @__PURE__ */ React.createElement("section", { id: "proceso", ref: secRef, style: { background: "var(--ink-900)", color: "var(--paper-200)", padding: "var(--section-y) 0" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)" } }, /* @__PURE__ */ React.createElement("h2", { "data-reveal": true, style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.2rem,5vw,4rem)", letterSpacing: "-0.04em", lineHeight: 0.95, color: "var(--paper-200)", margin: "0 0 56px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: "0.2em", fontWeight: 700, letterSpacing: "0.2em", verticalAlign: "super", color: "var(--signal)" } }, "(c\xF3mo trabajamos)"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(WordReveal, { text: "Un proceso claro", start: "scroll", stagger: 50 })), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", paddingLeft: "clamp(40px, 8vw, 90px)" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: "clamp(18px,3.4vw,38px)", top: 8, bottom: 8, width: 2, background: "var(--ink-600)" } }, /* @__PURE__ */ React.createElement("div", { ref: lineRef, style: { position: "absolute", inset: 0, background: "var(--gold)", transformOrigin: "top", transform: "scaleY(0)" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "clamp(30px,5vw,60px)" } }, KIN_STEPS.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: s.n, "data-reveal": true, "data-reveal-dir": "left", "data-reveal-delay": i * 60, style: { position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: "calc(clamp(40px, 8vw, 90px) * -1 + clamp(8px,1.8vw,28px))", top: 4, width: 22, height: 22, borderRadius: "50%", background: "var(--gold)", border: "3px solid var(--ink-900)", boxShadow: "0 0 0 2px var(--gold)", animation: window.KIN_REDUCED ? "none" : `kin-pulse 2.6s ease-in-out ${i * 300}ms infinite` } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: "clamp(16px,3vw,40px)", alignItems: "baseline", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem,6vw,5rem)", color: "transparent", WebkitTextStroke: "1.5px var(--gold)", lineHeight: 0.9, display: "inline-block", animation: window.KIN_REDUCED ? "none" : `kin-floaty ${4 + i * 0.4}s ease-in-out ${i * 200}ms infinite` } }, s.n), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 240 } }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.6rem,3.4vw,2.6rem)", letterSpacing: "-0.02em", color: "var(--paper-200)", margin: 0 } }, s.t), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--gray-100)", fontSize: "var(--fs-body)", marginTop: 10, maxWidth: 520 } }, s.d)))))))));
  }
  window.Process = Process;
  function ContactCTA() {
    const { Input, Textarea } = window.InventiviaDesignSystem_a147c4;
    return /* @__PURE__ */ React.createElement("section", { id: "contacto", style: { background: "var(--gold)", color: "var(--ink-900)", padding: "var(--section-y) 0", position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 0, bottom: 0, left: "-50%", width: "200%", backgroundImage: "repeating-linear-gradient(90deg, transparent 0 119px, var(--ink-900) 119px 120px)", animation: window.KIN_REDUCED ? "none" : "kin-marq-l 24s linear infinite", opacity: 0.16 } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 0, right: 0, top: "30%", height: 1.5, background: "var(--ink-900)", opacity: 0.25, transformOrigin: "left", animation: window.KIN_REDUCED ? "none" : "kin-shift 5s ease-in-out infinite" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 0, right: 0, bottom: "26%", height: 1.5, background: "var(--ink-900)", opacity: 0.18, transformOrigin: "right", animation: window.KIN_REDUCED ? "none" : "kin-shift 6.5s ease-in-out infinite reverse" } })), /* @__PURE__ */ React.createElement("div", { "aria-hidden": "true", style: { position: "absolute", top: "12%", right: "6%", zIndex: 2 } }, /* @__PURE__ */ React.createElement(Draggable, { bounds: 120 }, /* @__PURE__ */ React.createElement(RotatingSeal, { text: "DA EL SALTO \xB7 HABLEMOS \xB7 ", size: 138, speed: 14, color: "var(--ink-900)", fill: "var(--ink-900)", center: /* @__PURE__ */ React.createElement("span", { style: { color: "var(--gold)", fontSize: 24 } }, "\u2192") }))), /* @__PURE__ */ React.createElement("div", { className: "kin-split", style: { position: "relative", maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center", zIndex: 3 } }, /* @__PURE__ */ React.createElement("div", { "data-reveal": true }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-800)" } }, "(contacto)"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.6rem,6vw,5.2rem)", letterSpacing: "-0.045em", lineHeight: 0.88, color: "var(--ink-900)", margin: "14px 0 0" } }, /* @__PURE__ */ React.createElement(WordReveal, { text: "\xBFListo para", start: "scroll", stagger: 40 }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { fontStyle: "italic" } }, /* @__PURE__ */ React.createElement(WordReveal, { text: "despegar?", start: "scroll", delay: 160, stagger: 40 }))), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-800)", fontSize: "var(--fs-lead)", marginTop: 22, maxWidth: 420, lineHeight: 1.5 } }, "Cu\xE9ntanos tu proyecto y da el primer paso hacia una estrategia que elevar\xE1 tu marca a nuevas alturas."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Magnetic, { strength: 0.3 }, /* @__PURE__ */ React.createElement("a", { href: "#", "data-cursor": "view", style: { fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16, color: "var(--gold)", background: "var(--ink-900)", padding: "15px 26px", borderRadius: "var(--radius-pill)", display: "inline-flex", alignItems: "center", gap: 10 } }, "\u2706 WhatsApp")), /* @__PURE__ */ React.createElement("a", { href: "#", "data-cursor": "view", style: { fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16, color: "var(--ink-900)", padding: "15px 24px", borderRadius: "var(--radius-pill)", border: "1.5px solid var(--ink-900)" } }, "\u260E Llamar")), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-800)", marginTop: 26, letterSpacing: "0.06em" } }, "Murcia, Espa\xF1a \xB7 hola@inventiviamarketing.com")), /* @__PURE__ */ React.createElement("div", { "data-reveal": true, "data-reveal-dir": "left" }, /* @__PURE__ */ React.createElement("form", { onSubmit: (e) => e.preventDefault(), style: { display: "flex", flexDirection: "column", gap: 16, background: "var(--paper-100)", border: "2px solid var(--ink-900)", borderRadius: "var(--radius-lg)", padding: 28, boxShadow: "8px 8px 0 var(--ink-900)" } }, /* @__PURE__ */ React.createElement("div", { className: "kin-form-row", style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 } }, /* @__PURE__ */ React.createElement(KField, { label: "Nombre", placeholder: "Tu nombre" }), /* @__PURE__ */ React.createElement(KField, { label: "Email", type: "email", placeholder: "hola@empresa.com" })), /* @__PURE__ */ React.createElement(KField, { label: "Mensaje", placeholder: "Cu\xE9ntanos qu\xE9 necesitas\u2026", textarea: true }), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "submit",
        "data-cursor": "view",
        style: { fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16, color: "var(--paper-200)", background: "var(--ink-900)", padding: "15px", borderRadius: "var(--radius-pill)", border: "none", cursor: "pointer", marginTop: 4, transition: "background .25s" },
        onMouseEnter: (e) => e.currentTarget.style.background = "var(--gold-deep)",
        onMouseLeave: (e) => e.currentTarget.style.background = "var(--ink-900)"
      },
      "Da el salto \u2192"
    )))));
  }
  function KField({ label, placeholder, type = "text", textarea }) {
    const [f, setF] = React.useState(false);
    const common = {
      onFocus: () => setF(true),
      onBlur: () => setF(false),
      placeholder,
      style: { width: "100%", fontFamily: "var(--font-body)", fontSize: 15, color: "var(--ink-900)", background: "var(--paper-200)", border: `1.5px solid ${f ? "var(--gold-deep)" : "var(--ink-900)"}`, borderRadius: "var(--radius-sm)", padding: "12px 14px", outline: "none", boxSizing: "border-box", transition: "border-color .2s" }
    };
    return /* @__PURE__ */ React.createElement("label", { style: { display: "flex", flexDirection: "column", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: f ? "var(--gold-deep)" : "var(--ink-700)", transition: "color .2s" } }, label), textarea ? /* @__PURE__ */ React.createElement("textarea", { rows: 4, ...common, style: { ...common.style, resize: "vertical" } }) : /* @__PURE__ */ React.createElement("input", { type, ...common }));
  }
  window.ContactCTA = ContactCTA;
  function Footer() {
    const cols = [
      { h: "Servicios", items: ["Dise\xF1o web", "SEO + IA", "Social Media", "Branding", "Automatizaci\xF3n"] },
      { h: "Agencia", items: ["Nosotros", "Proyectos", "Proceso", "Blog", "Contacto"] },
      { h: "S\xEDguenos", items: ["Instagram", "Facebook", "X / Twitter", "LinkedIn"] }
    ];
    return /* @__PURE__ */ React.createElement("footer", { style: { background: "var(--ink-900)", color: "var(--paper-200)" } }, /* @__PURE__ */ React.createElement("div", { style: { borderBottom: "1px solid var(--ink-600)", padding: "26px 0", overflow: "hidden" } }, /* @__PURE__ */ React.createElement(
      Marquee,
      {
        dir: "left",
        speed: 26,
        items: ["Hablemos", "Da el salto", "Empieza tu proyecto", "M\xE1s visibilidad", "M\xE1s ventas"].map((t) => /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.8rem,4vw,3.4rem)", letterSpacing: "-0.03em", color: "var(--paper-200)" } }, t)),
        sep: /* @__PURE__ */ React.createElement("span", { style: { color: "var(--gold)", margin: "0 0.6em" } }, "\u2726")
      }
    )), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "var(--container-wide)", margin: "0 auto", padding: "56px var(--gutter) 34px" } }, /* @__PURE__ */ React.createElement("div", { className: "kin-footer-grid", style: { display: "grid", gridTemplateColumns: "1.6fr repeat(3, 1fr)", gap: 40 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 11, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("img", { src: window.__resources && window.__resources.mark || "assets/mark.svg", alt: "", style: { width: 28, height: 28 } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--paper-200)", letterSpacing: "-0.04em" } }, "Inventiv", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--gold)" } }, "ia"))), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--text-muted)", fontSize: "var(--fs-small)", maxWidth: 280, margin: 0 } }, "Agencia de marketing digital con IA en Murcia. Mostramos al mundo lo mejor y m\xE1s innovador de Murcia.")), cols.map((c) => /* @__PURE__ */ React.createElement("div", { key: c.h }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 } }, c.h), /* @__PURE__ */ React.createElement("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 } }, c.items.map((i) => /* @__PURE__ */ React.createElement("li", { key: i }, /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "#",
        "data-cursor": "view",
        style: { color: "var(--text-muted)", fontSize: "var(--fs-small)", transition: "color .25s" },
        onMouseEnter: (e) => e.currentTarget.style.color = "var(--paper-200)",
        onMouseLeave: (e) => e.currentTarget.style.color = "var(--text-muted)"
      },
      i
    ))))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, marginTop: 52, paddingTop: 24, borderTop: "1px solid var(--ink-600)" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--text-muted)", fontSize: 13, fontStyle: "italic" } }, "Todos los berberechos reservados \u2014 puedes copiarnos el texto, pero nunca la magia."), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)", letterSpacing: "0.08em" } }, "\xA9 2026 INVENTIVIA MARKETING"))));
  }
  window.Footer = Footer;
  function App() {
    useReveal();
    React.useEffect(() => {
      const bar = document.getElementById("kin-progress");
      const onScroll = () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? window.scrollY / h : 0;
        if (bar) bar.style.transform = `scaleX(${p})`;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { id: "kin-progress", style: { position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "var(--gold)", transform: "scaleX(0)", transformOrigin: "0 50%", zIndex: 300 } }), /* @__PURE__ */ React.createElement(EditorialCursor, null), /* @__PURE__ */ React.createElement(SiteNav, { active: "home" }), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(Hero, null), /* @__PURE__ */ React.createElement(Bands, null), /* @__PURE__ */ React.createElement(Services, null), /* @__PURE__ */ React.createElement(SeoIA, null), /* @__PURE__ */ React.createElement(Playground, null), /* @__PURE__ */ React.createElement(Projects, null), /* @__PURE__ */ React.createElement(Process, null), /* @__PURE__ */ React.createElement(ContactCTA, null)), /* @__PURE__ */ React.createElement(Footer, null));
  }
  window.App = App;
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
})();
