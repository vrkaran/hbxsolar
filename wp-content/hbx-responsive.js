/* HBX — mobile menu + responsive helpers + hero unlock */
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function unlockPage() {
    var body = document.body;
    if (!body) return;
    body.classList.add("render", "pix-loaded");
    document.documentElement.classList.add("hbx-ready");
    // Reveal Elementor animated widgets that stay invisible without frontend JS
    document.querySelectorAll(".elementor-invisible").forEach(function (n) {
      n.classList.remove("elementor-invisible");
      n.classList.add("animated");
    });
    document.querySelectorAll(".e-con").forEach(function (n) {
      n.classList.add("e-lazyloaded");
    });
    var loader = document.querySelector(".pix-page-loading-bg");
    if (loader) loader.style.display = "none";
  }

  // Unlock ASAP so hero is not stuck behind white overlay
  unlockPage();
  ready(unlockPage);
  window.addEventListener("load", unlockPage);

  ready(function () {
    // Mobile nav fallback
    document.querySelectorAll(".xpro-elementor-horizontal-menu-toggler").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var wrap = btn.closest(".elementor-widget-xpro-horizontal-menu") || btn.parentElement.parentElement;
        var panel = wrap.querySelector(".xpro-elementor-horizontal-navbar-wrapper");
        var overlay = wrap.querySelector(".xpro-elementor-horizontal-menu-overlay");
        if (!panel) return;
        panel.classList.add("active");
        if (overlay) overlay.classList.add("active");
        document.documentElement.classList.add("hbx-nav-open");
      });
    });

    document.querySelectorAll(".xpro-elementor-horizontal-menu-close, .xpro-elementor-horizontal-menu-overlay").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelectorAll(".xpro-elementor-horizontal-navbar-wrapper.active").forEach(function (p) {
          p.classList.remove("active");
        });
        document.querySelectorAll(".xpro-elementor-horizontal-menu-overlay.active").forEach(function (o) {
          o.classList.remove("active");
        });
        document.documentElement.classList.remove("hbx-nav-open");
      });
    });

    // City rotator(s): Varanasi → Azamgarh → Mau → Prayagraj
    var cities = ["Varanasi", "Azamgarh", "Mau", "Prayagraj"];
    var nodes = document.querySelectorAll("#hbx-city-rotator, .hbx-city-rotator");
    if (nodes.length) {
      var i = 0;
      setInterval(function () {
        nodes.forEach(function (el) {
          el.classList.add("is-swapping");
        });
        setTimeout(function () {
          i = (i + 1) % cities.length;
          nodes.forEach(function (el) {
            el.textContent = cities[i];
            el.classList.remove("is-swapping");
          });
        }, 350);
      }, 2800);
    }
  });
})();

/* HBX premium navigation, reveal, and desktop pointer enhancements. */
(function () {
  function onReady(callback) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", callback);
    else callback();
  }

  onReady(function () {
    var header = document.querySelector(".elementor-location-header.elementor-6964");
    var navButtons = document.querySelectorAll(".xpro-elementor-horizontal-menu-toggler");
    var navPanels = document.querySelectorAll(".xpro-elementor-horizontal-navbar-wrapper");
    var navOverlays = document.querySelectorAll(".xpro-elementor-horizontal-menu-overlay");
    var closeButtons = document.querySelectorAll(".xpro-elementor-horizontal-menu-close");

    function setNav(open) {
      navPanels.forEach(function (panel) { panel.classList.toggle("active", open); });
      navOverlays.forEach(function (overlay) { overlay.classList.toggle("active", open); });
      navButtons.forEach(function (button) {
        button.setAttribute("aria-expanded", String(open));
        button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      });
      document.documentElement.classList.toggle("hbx-nav-open", open);
    }

    navButtons.forEach(function (button) {
      button.setAttribute("aria-controls", "menu-gmb");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open navigation");
      button.addEventListener("click", function () { setNav(true); });
    });

    closeButtons.forEach(function (button) {
      button.setAttribute("aria-label", "Close navigation");
      button.addEventListener("click", function () { setNav(false); });
    });

    navOverlays.forEach(function (overlay) { overlay.addEventListener("click", function () { setNav(false); }); });
    navPanels.forEach(function (panel) {
      panel.querySelectorAll("a.xpro-elementor-nav-link").forEach(function (link) {
        link.addEventListener("click", function () { setNav(false); });
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setNav(false);
    });

    function updateHeader() {
      if (header) header.classList.toggle("hbx-header-scrolled", window.scrollY > 12);
    }
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    var revealTargets = document.querySelectorAll(".elementor-page > .e-con, .elementor-page > .elementor-element.e-con");
    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      revealTargets.forEach(function (target, index) {
        target.classList.add("hbx-reveal");
        if (index === 0) target.classList.add("is-visible");
        else observer.observe(target);
      });
    }

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      var cursor = document.createElement("div");
      cursor.className = "hbx-cursor is-hidden";
      cursor.setAttribute("aria-hidden", "true");
      document.body.appendChild(cursor);
      document.body.classList.add("hbx-custom-cursor");
      var frame;
      var pointerX = 0;
      var pointerY = 0;
      window.addEventListener("pointermove", function (event) {
        pointerX = event.clientX;
        pointerY = event.clientY;
        cursor.classList.remove("is-hidden");
        if (!frame) {
          frame = requestAnimationFrame(function () {
            cursor.style.transform = "translate3d(" + (pointerX - 6) + "px, " + (pointerY - 6) + "px, 0)";
            frame = null;
          });
        }
      }, { passive: true });
      document.addEventListener("pointerover", function (event) {
        cursor.classList.toggle("is-active", Boolean(event.target.closest("a, button, input, textarea, select")));
      });
      document.addEventListener("pointerleave", function () { cursor.classList.add("is-hidden"); });
    }

    // The exported Elementor pages contain a few legacy # CTAs. Keep their
    // labels and styling, but route prospects to an actionable destination.
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      var label = (link.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
      if (/free site survey|consultation|contact us|join our team/.test(label)) {
        link.setAttribute("href", "../contact/index.html");
      } else if (/explore all services|learn more/.test(label)) {
        link.setAttribute("href", "../services/index.html");
      }
    });
  });
})();
