/* Services heading only; independent of the home page city animation. */
(function () {
  var headings = document.querySelectorAll('[data-hbx-services-city]');
  if (!headings.length) return;
  var cities = ['Varanasi', 'Azamgarh', 'Mau', 'Prayagraj', 'Jaunpur', 'Ambedkar Nagar'];
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var index = 0;
  var timer;
  var animations = [];

  function cancelAnimations() {
    animations.forEach(function (animation) { animation.cancel(); });
    animations = [];
  }

  function reveal() {
    cancelAnimations();
    var city = cities[index];
    var duration = 0;
    headings.forEach(function (heading) {
      // Keep a complete accessible name; individual letters are visual only.
      heading.setAttribute('aria-label', city);
      heading.textContent = '';
      var delay = 0;
      Array.from(city).forEach(function (letter) {
        var character = document.createElement('span');
        character.textContent = letter;
        character.setAttribute('aria-hidden', 'true');
        heading.appendChild(character);
        // All letters occupy their natural space from the start, so typing
        // does not continually reflow the heading on narrow screens.
        if (!reducedMotion.matches && character.animate) {
          animations.push(character.animate(
            [{ opacity: 0 }, { opacity: 1 }],
            { duration: 180, delay: delay, fill: 'backwards', easing: 'ease-out' }
          ));
          duration = Math.max(duration, delay + 180);
          delay += letter === ' ' ? 220 : 65;
        }
      });
    });
    // Five full seconds of reading time after the last letter appears.
    timer = window.setTimeout(advance, duration + 5000);
  }

  function advance() {
    cancelAnimations();
    var fadeDuration = reducedMotion.matches ? 0 : 180;
    headings.forEach(function (heading) {
      if (fadeDuration && heading.animate) {
        animations.push(heading.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: fadeDuration, fill: 'forwards', easing: 'ease-in' }
        ));
      }
    });
    timer = window.setTimeout(function () {
      index = (index + 1) % cities.length;
      reveal();
    }, fadeDuration);
  }

  function restart() {
    window.clearTimeout(timer);
    cancelAnimations();
    if (!document.hidden) reveal();
  }

  document.addEventListener('visibilitychange', restart);
  reducedMotion.addEventListener('change', restart);
  restart();
})();
