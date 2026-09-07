/* Independent navigation: never modifies body/html styles or intercepts URLs. */
(function () {
  document.querySelectorAll('.hbx-header').forEach(function (header) {
    var button = header.querySelector('.hbx-header__toggle');
    var mobile = window.matchMedia('(max-width: 1050px)');
    function close(restoreFocus) {
      header.classList.remove('hbx-header--open');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Open navigation');
      if (restoreFocus) button.focus();
    }
    header.classList.add('hbx-header--ready');
    button.addEventListener('click', function () {
      var open = button.getAttribute('aria-expanded') !== 'true';
      header.classList.toggle('hbx-header--open', open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    header.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { close(false); });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && header.classList.contains('hbx-header--open')) close(true);
    });
    document.addEventListener('click', function (event) {
      if (!header.contains(event.target)) close(false);
    });
    mobile.addEventListener('change', function () { close(false); });
    window.addEventListener('pageshow', function (event) {
      if (event.persisted) close(false);
    });
  });
})();
