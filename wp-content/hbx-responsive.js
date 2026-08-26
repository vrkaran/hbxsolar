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
