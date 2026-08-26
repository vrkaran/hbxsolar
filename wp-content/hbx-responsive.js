/* HBX — mobile menu + responsive helpers */
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    // Background images: mark containers as loaded
    document.querySelectorAll(".e-con").forEach(function (n) {
      n.classList.add("e-lazyloaded");
    });

    // Mobile nav fallback (works even if XPRO remote JS fails)
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

    // City rotator
    var cities = ["Varanasi", "Azamgarh", "Mau", "Prayagraj"];
    var el = document.getElementById("hbx-city-rotator");
    if (el) {
      var i = 0;
      setInterval(function () {
        el.classList.add("is-swapping");
        setTimeout(function () {
          i = (i + 1) % cities.length;
          el.textContent = cities[i];
          el.classList.remove("is-swapping");
        }, 350);
      }, 2800);
    }
  });
})();
