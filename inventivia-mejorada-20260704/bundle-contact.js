var InventiviaContact = (() => {
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
  const SN_CSS = `.sn-wrap{position:fixed;top:0;left:0;right:0;z-index:200;padding:14px var(--gutter) 0;transition:transform .5s cubic-bezier(.16,1,.3,1)}
.sn-wrap *{box-sizing:border-box}
.sn-wrap.sn-hidden{transform:translateY(-150%)}
.sn-cap{max-width:var(--container-wide);margin:0 auto;display:flex;align-items:center;gap:18px;height:64px;padding:0 10px 0 14px;border-radius:999px;background:linear-gradient(135deg,rgba(13,13,24,.88),rgba(13,13,24,.66));-webkit-backdrop-filter:blur(22px) saturate(1.45);backdrop-filter:blur(22px) saturate(1.45);border:1px solid rgba(197,168,49,.38);box-shadow:0 18px 55px rgba(0,0,0,.34),inset 0 1px 0 rgba(255,255,255,.08),0 0 0 1px rgba(13,13,24,.35);transition:height .4s cubic-bezier(.16,1,.3,1),background .4s,box-shadow .4s}
.sn-wrap.sn-scrolled .sn-cap{height:58px;background:linear-gradient(135deg,rgba(13,13,24,.94),rgba(13,13,24,.74));box-shadow:0 18px 55px rgba(0,0,0,.38),inset 0 1px 0 rgba(255,255,255,.08)}
.sn-brand{display:flex;align-items:center;gap:12px;flex:none;text-decoration:none;color:var(--paper-200)}
.sn-mark{width:42px;height:42px;border-radius:50%;background:var(--paper-200);object-fit:contain;padding:5px;border:1px solid rgba(197,168,49,.58);box-shadow:0 0 0 3px rgba(197,168,49,.11),0 8px 24px rgba(0,0,0,.22);animation:none!important}
.sn-word{font-family:var(--font-display);font-weight:800;font-size:20px;letter-spacing:-.04em;color:var(--paper-200);line-height:1}.sn-word b{color:var(--gold)}
.sn-links{display:flex;align-items:center;gap:6px;margin:0 auto;background:rgba(243,242,229,.06);padding:5px;border-radius:999px;border:1px solid rgba(255,255,255,.06)}
.sn-link{font-family:var(--font-body);font-size:13px;letter-spacing:.015em;text-transform:none;font-weight:850;color:var(--paper-200);padding:13px 17px;border-radius:999px;white-space:nowrap;text-decoration:none;transition:background .25s,color .25s,transform .25s,box-shadow .25s}
.sn-link:hover,.sn-link.sn-active{background:var(--gold);color:var(--ink-900);transform:translateY(-1px);box-shadow:0 8px 22px rgba(197,168,49,.24)}
.sn-right{display:flex;align-items:center;gap:10px;flex:none}.sn-cta{font-family:var(--font-body);font-size:13px;letter-spacing:.015em;text-transform:none;font-weight:900;color:var(--ink-900);background:var(--paper-200);padding:13px 18px;border-radius:999px;display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(197,168,49,.55);cursor:pointer;text-decoration:none;transition:background .25s,transform .25s,box-shadow .25s}.sn-cta:hover{background:var(--gold);transform:translateY(-1px);box-shadow:0 10px 24px -8px rgba(197,168,49,.7)}.sn-cta:active{transform:scale(.97)}
.sn-burger{display:none;flex-direction:column;align-items:center;justify-content:center;gap:4px;width:44px;height:44px;border-radius:999px;border:0;background:var(--gold);cursor:pointer;box-shadow:0 8px 24px rgba(197,168,49,.24)}.sn-burger span{width:18px;height:2px;background:var(--ink-900);border-radius:2px;transition:transform .3s,opacity .3s}.sn-panel{display:none}
@media(max-width:900px){.sn-links{display:none}.sn-cta-desktop{display:none}.sn-burger{display:flex}.sn-panel{display:flex;flex-direction:column;gap:8px;position:absolute;left:var(--gutter);right:var(--gutter);top:86px;background:rgba(13,13,24,.96);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border:1px solid rgba(197,168,49,.34);border-radius:24px;box-shadow:0 28px 64px -20px rgba(0,0,0,.55);padding:14px;opacity:0;transform:translateY(-12px) scale(.98);transform-origin:top right;pointer-events:none;transition:opacity .3s,transform .3s}.sn-wrap.sn-open .sn-panel{opacity:1;transform:none;pointer-events:auto}.sn-wrap.sn-open .sn-burger span:nth-child(1){transform:translateY(6px) rotate(45deg)}.sn-wrap.sn-open .sn-burger span:nth-child(2){opacity:0}.sn-wrap.sn-open .sn-burger span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}.sn-panel a{display:flex;align-items:center;justify-content:space-between;font-family:var(--font-body);font-size:16px;font-weight:850;letter-spacing:.015em;text-transform:none;color:var(--paper-200);padding:15px 16px;border-radius:16px;text-decoration:none;background:rgba(255,255,255,.05)}.sn-panel a:hover,.sn-panel a.sn-active{background:var(--gold);color:var(--ink-900)}.sn-panel .sn-cta{justify-content:center;width:100%;margin-top:6px;font-size:16px;padding:15px;box-sizing:border-box;background:var(--paper-200);color:var(--ink-900)}}
@media(max-width:760px){.sn-wrap{padding:10px max(12px,var(--gutter)) 0;transform:none!important}.sn-cap{height:58px;padding:0 8px 0 10px;gap:10px}.sn-wrap.sn-scrolled .sn-cap{height:56px}.sn-word{font-size:18px}.sn-mark{width:38px;height:38px}.sn-panel{left:max(12px,var(--gutter));right:max(12px,var(--gutter));top:74px;max-height:calc(100dvh - 90px);overflow:auto;border-radius:20px}}
@media(max-width:380px){.sn-word{font-size:17px}.sn-burger{width:40px;height:40px}}
@media(prefers-reduced-motion:reduce){.sn-link,.sn-cta{transition:none}}`;
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
      ["Qui\xE9nes somos", active === "quienes" ? "#top" : "quienes-somos.html", "quienes"],
      ["Contacto", active === "contacto" ? "#top" : "contacto.html", "contacto"]
    ];
    const ctaHref = active === "contacto" ? "#form" : "contacto.html#form";
    const mark = "assets/mark-inventivia.svg";
    const wrapClass = ["sn-wrap", hidden ? "sn-hidden" : "", scrolled ? "sn-scrolled" : "", open ? "sn-open" : ""].filter(Boolean).join(" ");
    return /* @__PURE__ */ React.createElement("header", { className: wrapClass }, /* @__PURE__ */ React.createElement("div", { className: "sn-cap" }, /* @__PURE__ */ React.createElement("a", { href: isHome ? "#top" : "index.html", className: "sn-brand", "data-cursor": "view", "aria-label": "Inventivia \u2014 inicio" }, /* @__PURE__ */ React.createElement("img", { className: "sn-mark", src: mark, alt: "" }), /* @__PURE__ */ React.createElement("span", { className: "sn-word" }, "Inventiv", /* @__PURE__ */ React.createElement("b", null, "IA"))), /* @__PURE__ */ React.createElement("nav", { className: "sn-links", "aria-label": "Menú principal" }, links.map(([l, h, key]) => /* @__PURE__ */ React.createElement("a", { key: l, href: h, className: "sn-link" + (key === active ? " sn-active" : ""), "aria-current": key === active ? "page" : void 0, "data-cursor": "view" }, l))), /* @__PURE__ */ React.createElement("div", { className: "sn-right" }, /* @__PURE__ */ React.createElement("a", { href: ctaHref, className: "sn-cta sn-cta-desktop", "data-cursor": "view" }, "Hablemos"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "sn-burger", "aria-label": "Men\xFA", "aria-expanded": open, onClick: () => setOpen((o) => !o) }, /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement("span", null)))), /* @__PURE__ */ React.createElement("div", { className: "sn-panel" }, links.map(([l, h, key]) => /* @__PURE__ */ React.createElement("a", { key: l, href: h, className: key === active ? "sn-active" : "", "aria-current": key === active ? "page" : void 0, "data-cursor": "view", onClick: () => setOpen(false) }, l, /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true" }, "\u2192"))), /* @__PURE__ */ React.createElement("a", { href: ctaHref, className: "sn-cta", "data-cursor": "view", onClick: () => setOpen(false) }, "Hablemos")));
  }
  window.SiteNav = SiteNav;
  function ContactHero() {
    const chip = (label, bg, color, anim, extra = {}) => /* @__PURE__ */ React.createElement("div", { style: { padding: "9px 14px", borderRadius: "var(--radius-pill)", background: bg, color, fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "1.5px solid var(--ink-900)", boxShadow: "3px 3px 0 var(--ink-900)", whiteSpace: "nowrap", animation: window.KIN_REDUCED ? "none" : anim, ...extra } }, label);
    return /* @__PURE__ */ React.createElement("section", { id: "top", style: { position: "relative", paddingTop: 150, paddingBottom: "clamp(3rem,7vw,6rem)", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, opacity: 0.5, backgroundImage: "linear-gradient(90deg, var(--paper-line) 1px, transparent 1px)", backgroundSize: "calc(100% / 12) 100%", maskImage: "linear-gradient(180deg, transparent, black 18%, black 82%, transparent)" } }), /* @__PURE__ */ React.createElement("div", { "aria-hidden": "true", style: { position: "absolute", left: "-3%", top: "20%", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "24vw", lineHeight: 0.8, color: "var(--paper-300)", opacity: 0.5, letterSpacing: "-0.05em", pointerEvents: "none", userSelect: "none", animation: window.KIN_REDUCED ? "none" : "kin-drift 9s ease-in-out infinite" } }, "hola"), /* @__PURE__ */ React.createElement("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5 } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "20%", right: "9%", pointerEvents: "auto", animation: window.KIN_REDUCED ? "none" : "kin-seal-in 1.1s cubic-bezier(.16,1,.3,1) both" } }, /* @__PURE__ */ React.createElement(Draggable, { bounds: 150 }, /* @__PURE__ */ React.createElement(RotatingSeal, { text: "DA EL SALTO \xB7 HABLEMOS \xB7 ", size: 146, speed: 15, center: /* @__PURE__ */ React.createElement("span", { style: { color: "var(--ink-900)", fontSize: 26 } }, "\u2726") }))), /* @__PURE__ */ React.createElement("div", { className: "kin-hero-chip", style: { position: "absolute", top: "58%", right: "16%", pointerEvents: "auto" } }, /* @__PURE__ */ React.createElement(Draggable, { bounds: 120, idleDelay: -2200 }, chip("\u2706 WHATSAPP", "var(--gold)", "var(--ink-900)", "kin-pulse 3.2s ease-in-out infinite"))), /* @__PURE__ */ React.createElement("div", { className: "kin-hero-chip", style: { position: "absolute", top: "40%", right: "33%", pointerEvents: "auto" } }, /* @__PURE__ */ React.createElement(Draggable, { bounds: 120, idleDelay: -3800 }, chip("\u2726 EN DIRECTO", "var(--signal)", "var(--ink-900)", "kin-tilt 2.6s ease-in-out infinite")))), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 3, maxWidth: "var(--container-wide)", margin: "0 auto", padding: "0 var(--gutter)", width: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 24 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 60, height: 1.5, background: "var(--ink-900)" } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-800)" } }, /* @__PURE__ */ React.createElement(WordReveal, { text: "(contacto)", delay: 100, stagger: 28 }))), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(3rem, 10.5vw, 10rem)", lineHeight: 0.84, letterSpacing: "-0.05em", color: "var(--ink-900)", margin: 0, maxWidth: 980 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(WordReveal, { text: "Contacto", byLetter: true, delay: 150, stagger: 48 })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: "0.22em", flexWrap: "wrap", paddingBottom: "0.16em" } }, /* @__PURE__ */ React.createElement(WordReveal, { text: "SEO Murcia", byLetter: true, delay: 540, stagger: 48 }), /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", color: "var(--gold-deep)", fontStyle: "italic", animation: window.KIN_REDUCED ? "none" : "kin-rise .9s cubic-bezier(.16,1,.3,1) .62s both" } }, "proyecto"))), /* @__PURE__ */ React.createElement("div", { "data-reveal": true, "data-reveal-delay": "600", style: { display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 28, marginTop: 40 } }, /* @__PURE__ */ React.createElement("p", { style: { maxWidth: 520, fontSize: "var(--fs-lead)", color: "var(--ink-800)", lineHeight: 1.5, margin: 0 } }, "Completa el formulario y da el primer paso hacia una estrategia que elevar\xE1 tu marca a nuevas alturas. Sin compromiso, sin tecnicismos \u2014 solo una conversaci\xF3n honesta sobre c\xF3mo hacer crecer tu negocio."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", color: "var(--ink-800)" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 9, height: 9, borderRadius: "50%", background: "var(--signal-deep)", boxShadow: "0 0 0 4px rgba(47,175,141,0.18)", animation: window.KIN_REDUCED ? "none" : "kin-blink 2s ease-in-out infinite" } }), "Respondemos en menos de 24\xA0h"))));
  }
  function Channels() {
    const cards = [
      { tag: "01 / R\xC1PIDO", glyph: "\u2706", title: "Email", body: "La vía directa. Escríbenos y te contestamos en horario de oficina, normalmente en minutos.", action: "Enviar email", href: "mailto:hola@inventiviamarketing.com?subject=Auditoría%20SEO%20Murcia", accent: "var(--gold)" },
      { tag: "02 / DE VIVA VOZ", glyph: "\u260E", title: "Ll\xE1manos", body: "\xBFPrefieres hablar? Pide una llamada y aterrizamos tu idea contigo al momento.", action: "Pedir llamada", href: "mailto:hola@inventiviamarketing.com?subject=Pedir%20llamada%20InventivIA", accent: "var(--signal)" },
      { tag: "03 / EN PERSONA", glyph: "\u25C9", title: "Vis\xEDtanos", body: "Ctra. de Churra, 96 \xB7 2\xAA planta, 30007 Murcia. Caf\xE9 incluido y mucha estrategia.", action: "Ver en el mapa", href: "https://www.google.com/maps/search/?api=1&query=Ctra.%20de%20Churra%2096%2030007%20Murcia", accent: "var(--paper-200)" }
    ];
    return /* @__PURE__ */ React.createElement("section", { style: { background: "var(--paper-200)", padding: "clamp(2.5rem,5vw,4.5rem) 0 clamp(1rem,3vw,2.5rem)" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)" } }, /* @__PURE__ */ React.createElement("div", { "data-reveal": true, style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 30 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 40, height: 1.5, background: "var(--ink-900)" } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-800)" } }, "Elige c\xF3mo empezar")), /* @__PURE__ */ React.createElement("div", { className: "kin-chan-grid", style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 } }, cards.map((c, i) => /* @__PURE__ */ React.createElement(
      "a",
      {
        key: c.title,
        href: c.href,
        "data-cursor": "view",
        "data-reveal": true,
        "data-reveal-delay": i * 90,
        style: { display: "flex", flexDirection: "column", background: "linear-gradient(160deg, var(--ink-700), var(--ink-800))", border: "1px solid var(--hairline)", borderRadius: "var(--radius-lg)", padding: "26px 24px 24px", boxShadow: "var(--shadow-md)", transition: "transform .4s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s", minHeight: 230 },
        onMouseEnter: (e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.borderColor = "var(--gold-hairline)";
          e.currentTarget.style.boxShadow = "var(--shadow-lg), var(--glow-gold)";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "var(--hairline)";
          e.currentTarget.style.boxShadow = "var(--shadow-md)";
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 46, height: 46, borderRadius: "var(--radius-md)", border: "1px solid var(--gold-hairline)", display: "grid", placeItems: "center", color: c.accent, fontSize: 20 } }, c.glyph), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.16em", color: "var(--text-muted)" } }, c.tag)),
      /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 26, letterSpacing: "-0.03em", color: "var(--paper-200)", margin: "20px 0 10px" } }, c.title),
      /* @__PURE__ */ React.createElement("p", { style: { color: "var(--text-body)", fontSize: 14.5, lineHeight: 1.5, margin: 0, flex: 1 } }, c.body),
      /* @__PURE__ */ React.createElement("span", { style: { marginTop: 18, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", color: "var(--gold)", display: "inline-flex", alignItems: "center", gap: 8 } }, c.action, " ", /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true" }, "\u2192"))
    )))));
  }
  function KField({ label, placeholder, type = "text", textarea, value, onChange, half }) {
    const [f, setF] = React.useState(false);
    const common = {
      value,
      onChange,
      placeholder,
      onFocus: () => setF(true),
      onBlur: () => setF(false),
      style: { width: "100%", fontFamily: "var(--font-body)", fontSize: 15, color: "var(--ink-900)", background: "var(--paper-200)", border: `1.5px solid ${f ? "var(--gold-deep)" : "var(--ink-900)"}`, borderRadius: "var(--radius-sm)", padding: "12px 14px", outline: "none", boxSizing: "border-box", transition: "border-color .2s" }
    };
    return /* @__PURE__ */ React.createElement("label", { style: { display: "flex", flexDirection: "column", gap: 6, gridColumn: half ? "auto" : "1 / -1" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: f ? "var(--gold-deep)" : "var(--ink-700)", transition: "color .2s" } }, label), textarea ? /* @__PURE__ */ React.createElement("textarea", { rows: 4, ...common, style: { ...common.style, resize: "vertical" } }) : /* @__PURE__ */ React.createElement("input", { type, ...common }));
  }
  function ChipSelect({ label, options, multi, value, onToggle }) {
    return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9, gridColumn: "1 / -1" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-700)" } }, label), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, options.map((o) => {
      const on = multi ? value.includes(o) : value === o;
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: o,
          type: "button",
          "data-cursor": "view",
          onClick: () => onToggle(o),
          style: {
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            padding: "8px 13px",
            borderRadius: "var(--radius-pill)",
            cursor: "pointer",
            transition: "all .2s",
            background: on ? "var(--ink-900)" : "transparent",
            color: on ? "var(--gold)" : "var(--ink-800)",
            border: `1.5px solid var(--ink-900)`,
            boxShadow: on ? "2px 2px 0 var(--gold)" : "none"
          }
        },
        o
      );
    })));
  }
  function ContactForm() {
    const services = ["Dise\xF1o web", "SEO + IA", "Social Media", "Branding", "Automatizaci\xF3n", "Google Ads"];
    const budgets = ["< 1.000 \u20AC", "1.000 \u2013 3.000 \u20AC", "3.000 \u2013 8.000 \u20AC", "+ 8.000 \u20AC"];
    const [form, setForm] = React.useState({ nombre: "", empresa: "", email: "", tel: "", msg: "" });
    const [picked, setPicked] = React.useState([]);
    const [budget, setBudget] = React.useState("");
    const [sent, setSent] = React.useState(false);
    const set = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));
    const toggleSvc = (o) => setPicked((p) => p.includes(o) ? p.filter((x) => x !== o) : [...p, o]);
    return /* @__PURE__ */ React.createElement("section", { id: "contact-form", style: { position: "relative", background: "radial-gradient(120% 80% at 80% 0%, var(--ink-700), var(--ink-900) 60%)", color: "var(--paper-200)", padding: "var(--section-y) 0", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { "aria-hidden": "true", style: { position: "absolute", top: "-20%", left: "-10%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(197,168,49,0.16), transparent 70%)", filter: "blur(8px)", pointerEvents: "none" } }), /* @__PURE__ */ React.createElement("div", { className: "iv-grain", "aria-hidden": "true", style: { position: "absolute", inset: 0, pointerEvents: "none" } }), /* @__PURE__ */ React.createElement("div", { className: "kin-form-split", style: { position: "relative", maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)", display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 56, alignItems: "start", zIndex: 2 } }, /* @__PURE__ */ React.createElement("div", { "data-reveal": true }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" } }, "(briefing)"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.2rem,4.4vw,3.6rem)", letterSpacing: "-0.04em", lineHeight: 0.95, color: "var(--paper-200)", margin: "14px 0 18px" } }, "Hablemos de", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { fontStyle: "italic", color: "var(--gold)" } }, "lo que viene.")), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--text-body)", fontSize: "var(--fs-lead)", lineHeight: 1.55, margin: "0 0 30px", maxWidth: 380 } }, "Cu\xE9ntanos en qu\xE9 andas. Cuanto m\xE1s nos cuentes, mejor ser\xE1 la primera propuesta que te devolvemos."), /* @__PURE__ */ React.createElement("ol", { style: { listStyle: "none", margin: "0 0 34px", padding: 0, display: "flex", flexDirection: "column", gap: 16 } }, [["Nos escribes", "Rellenas el formulario o nos lanzas un WhatsApp."], ["Te llamamos", "En menos de 24 h agendamos una llamada para entendernos."], ["Propuesta a medida", "Recibes un plan claro, con plazos y precio cerrado."]].map(([t, d], i) => /* @__PURE__ */ React.createElement("li", { key: t, style: { display: "flex", gap: 14 } }, /* @__PURE__ */ React.createElement("span", { style: { flex: "none", width: 30, height: 30, borderRadius: "50%", border: "1px solid var(--gold-hairline)", display: "grid", placeItems: "center", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--gold)" } }, i + 1), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--paper-200)" } }, t), /* @__PURE__ */ React.createElement("div", { style: { color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.45 } }, d))))), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid var(--hairline)", paddingTop: 22, display: "flex", flexDirection: "column", gap: 8 } }, /* @__PURE__ */ React.createElement("a", { href: "mailto:hola@inventiviamarketing.com", "data-cursor": "view", style: { fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.04em", color: "var(--gold)" } }, "hola@inventiviamarketing.com"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", color: "var(--text-muted)" } }, "Ctra. de Churra, 96 \xB7 2\xAA planta \xB7 30007 Murcia"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 8 } }, ["Instagram", "Facebook", "X", "LinkedIn"].map((s) => /* @__PURE__ */ React.createElement(
      "a",
      {
        key: s,
        href: "#form",
        "data-cursor": "view",
        style: { fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper-200)", padding: "6px 11px", borderRadius: "var(--radius-pill)", border: "1px solid var(--hairline-strong)", transition: "all .25s" },
        onMouseEnter: (e) => {
          e.currentTarget.style.color = "var(--gold)";
          e.currentTarget.style.borderColor = "var(--gold-hairline)";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.color = "var(--paper-200)";
          e.currentTarget.style.borderColor = "var(--hairline-strong)";
        }
      },
      s
    ))))), /* @__PURE__ */ React.createElement("div", { "data-reveal": true, "data-reveal-dir": "left", style: { position: "relative" } }, /* @__PURE__ */ React.createElement("div", { "aria-hidden": "true", style: { position: "absolute", top: -34, right: -18, zIndex: 4 }, className: "kin-desktop" }, /* @__PURE__ */ React.createElement(Draggable, { bounds: 90 }, /* @__PURE__ */ React.createElement(RotatingSeal, { text: "ENV\xCDA \xB7 INVENTIVIA \xB7 ", size: 104, speed: 13, color: "var(--paper-200)", fill: "var(--gold)", center: /* @__PURE__ */ React.createElement("span", { style: { color: "var(--ink-900)", fontSize: 18 } }, "\u2192") }))), sent ? /* @__PURE__ */ React.createElement("div", { style: { background: "var(--paper-100)", border: "2px solid var(--ink-900)", borderRadius: "var(--radius-lg)", padding: "48px 34px", boxShadow: "8px 8px 0 var(--gold)", textAlign: "center", color: "var(--ink-900)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 40, color: "var(--gold-deep)" } }, "\u2726"), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, letterSpacing: "-0.03em", margin: "12px 0 10px" } }, "\xA1Recibido!"), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--text-body-ink)", fontSize: 15.5, lineHeight: 1.55, maxWidth: 360, margin: "0 auto" } }, "Gracias, ", form.nombre ? form.nombre.split(" ")[0] : "crack", ". Tenemos tu mensaje y te respondemos en menos de 24\xA0h. Mientras, ya estamos pensando ideas."), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        "data-cursor": "view",
        onClick: () => {
          setSent(false);
          setForm({ nombre: "", empresa: "", email: "", tel: "", msg: "" });
          setPicked([]);
          setBudget("");
        },
        style: { marginTop: 22, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", background: "none", border: "1.5px solid var(--ink-900)", borderRadius: "var(--radius-pill)", padding: "10px 18px", cursor: "pointer", color: "var(--ink-900)" }
      },
      "Enviar otro"
    )) : /* @__PURE__ */ React.createElement(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          const subject = encodeURIComponent("Contacto InventivIA - Auditoría SEO");
          const body = encodeURIComponent(`Nombre: ${form.nombre}\nEmpresa: ${form.empresa}\nEmail: ${form.email}\nTeléfono: ${form.tel}\nServicios: ${picked.join(", ")}\nPresupuesto: ${budget}\nMensaje: ${form.msg}`);
          window.location.href = `mailto:hola@inventiviamarketing.com?subject=${subject}&body=${body}`;
          setSent(true);
        },
        className: "kin-contact-form",
        style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, background: "var(--paper-100)", border: "2px solid var(--ink-900)", borderRadius: "var(--radius-lg)", padding: "30px 28px", boxShadow: "8px 8px 0 var(--ink-900)" }
      },
      /* @__PURE__ */ React.createElement(KField, { half: true, label: "Nombre", placeholder: "Tu nombre", value: form.nombre, onChange: set("nombre") }),
      /* @__PURE__ */ React.createElement(KField, { half: true, label: "Empresa", placeholder: "Tu marca o negocio", value: form.empresa, onChange: set("empresa") }),
      /* @__PURE__ */ React.createElement(KField, { half: true, label: "Email", type: "email", placeholder: "hola@empresa.com", value: form.email, onChange: set("email") }),
      /* @__PURE__ */ React.createElement(KField, { half: true, label: "Tel\xE9fono", type: "tel", placeholder: "600 000 000", value: form.tel, onChange: set("tel") }),
      /* @__PURE__ */ React.createElement(ChipSelect, { label: "\xBFQu\xE9 necesitas?", options: services, multi: true, value: picked, onToggle: toggleSvc }),
      /* @__PURE__ */ React.createElement(ChipSelect, { label: "Presupuesto aproximado", options: budgets, value: budget, onToggle: setBudget }),
      /* @__PURE__ */ React.createElement(KField, { label: "Cu\xE9ntanos", placeholder: "\xBFQu\xE9 quieres conseguir? \xBFPlazos? \xBFWeb actual?\u2026", textarea: true, value: form.msg, onChange: set("msg") }),
      /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "submit",
          "data-cursor": "view",
          style: { gridColumn: "1 / -1", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16, color: "var(--paper-200)", background: "var(--ink-900)", padding: "15px", borderRadius: "var(--radius-pill)", border: "none", cursor: "pointer", marginTop: 4, transition: "background .25s" },
          onMouseEnter: (e) => e.currentTarget.style.background = "var(--gold-deep)",
          onMouseLeave: (e) => e.currentTarget.style.background = "var(--ink-900)"
        },
        "Da el salto \u2192"
      ),
      /* @__PURE__ */ React.createElement("p", { style: { gridColumn: "1 / -1", margin: 0, fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.04em", color: "var(--text-muted-ink)", textAlign: "center" } }, "Al enviar aceptas nuestra pol\xEDtica de privacidad. Cero spam, prometido.")
    ))));
  }
  function FaqItem({ q, a, open, onClick }) {
    return /* @__PURE__ */ React.createElement("div", { style: { borderBottom: "1px solid var(--paper-line)" } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        "data-cursor": "view",
        onClick,
        style: { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 18, background: "none", border: "none", cursor: "pointer", padding: "22px 0", textAlign: "left" }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.1rem,2vw,1.5rem)", letterSpacing: "-0.02em", color: "var(--ink-900)" } }, q),
      /* @__PURE__ */ React.createElement("span", { style: { flex: "none", width: 34, height: 34, borderRadius: "50%", border: "1.5px solid var(--ink-900)", display: "grid", placeItems: "center", fontSize: 18, color: open ? "var(--gold-deep)" : "var(--ink-900)", transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform .3s cubic-bezier(.34,1.56,.64,1), color .3s" } }, "+")
    ), /* @__PURE__ */ React.createElement("div", { style: { maxHeight: open ? 300 : 0, overflow: "hidden", transition: "max-height .45s cubic-bezier(.16,1,.3,1)" } }, /* @__PURE__ */ React.createElement("p", { style: { margin: 0, paddingBottom: 24, color: "var(--text-body-ink)", fontSize: 15.5, lineHeight: 1.6, maxWidth: 720 } }, a)));
  }
  function Faq() {
    const items = [
      ["\xBFCu\xE1nto tarda un proyecto?", "Depende del alcance, pero una web suele estar lista en 3\u20136 semanas y una estrategia de SEO empieza a dar se\xF1ales en 2\u20133 meses. Te damos plazos cerrados antes de empezar."],
      ["\xBFTrabaj\xE1is con el Kit Digital?", "S\xED. Somos agentes digitalizadores: gestionamos la subvenci\xF3n del Kit Digital de principio a fin para que tu web, tienda o redes te salgan gratis o casi."],
      ["\xBFQu\xE9 es eso del SEO con IA?", "Usamos inteligencia artificial para investigar keywords, generar borradores y detectar oportunidades m\xE1s r\xE1pido \u2014 pero la estrategia y la edici\xF3n final siempre las hace una persona. IA para acelerar, criterio humano para decidir."],
      ["\xBFSolo trabaj\xE1is en Murcia?", "Tenemos el estudio en Murcia y nos encanta el caf\xE9 en persona, pero trabajamos con marcas de toda Espa\xF1a. La distancia no es problema."],
      ["\xBFY si a\xFAn no tengo claro qu\xE9 necesito?", "Perfecto, para eso estamos. Escr\xEDbenos sin m\xE1s, lo charlamos y te decimos con honestidad qu\xE9 tiene sentido para tu negocio (y qu\xE9 no)."]
    ];
    const [open, setOpen] = React.useState(0);
    return /* @__PURE__ */ React.createElement("section", { style: { background: "var(--paper-200)", padding: "var(--section-y) 0" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--gutter)", display: "grid", gridTemplateColumns: "0.7fr 1.3fr", gap: 48, alignItems: "start" }, className: "kin-faq-grid" }, /* @__PURE__ */ React.createElement("div", { "data-reveal": true }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-deep)" } }, "(dudas)"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.2rem,4.6vw,3.8rem)", letterSpacing: "-0.04em", lineHeight: 0.95, color: "var(--ink-900)", margin: "14px 0 16px" } }, "Antes de", /* @__PURE__ */ React.createElement("br", null), "escribirnos."), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--text-body-ink)", fontSize: "var(--fs-lead)", lineHeight: 1.55, maxWidth: 300, margin: 0 } }, "Lo que m\xE1s nos preguntan. Si tu duda no est\xE1 aqu\xED, ya sabes \u2014 un WhatsApp y listo.")), /* @__PURE__ */ React.createElement("div", { "data-reveal": true, "data-reveal-delay": "120" }, items.map(([q, a], i) => /* @__PURE__ */ React.createElement(FaqItem, { key: q, q, a, open: open === i, onClick: () => setOpen(open === i ? -1 : i) })))));
  }
  function ContactApp() {
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
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { id: "kin-progress", style: { position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "var(--gold)", transform: "scaleX(0)", transformOrigin: "0 50%", zIndex: 300 } }), /* @__PURE__ */ React.createElement(EditorialCursor, null), /* @__PURE__ */ React.createElement(SiteNav, { active: "contacto" }), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(ContactHero, null), /* @__PURE__ */ React.createElement(Channels, null), /* @__PURE__ */ React.createElement(ContactForm, null), /* @__PURE__ */ React.createElement(Faq, null)), /* @__PURE__ */ React.createElement(Footer, null));
  }
  window.ContactApp = ContactApp;
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(ContactApp, null));
})();
