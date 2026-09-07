/* Services heading only; independent of the home page city animation. */
(function () {
  var headings = document.querySelectorAll('[data-hbx-services-city]');
  if (!headings.length) return;
  var cities = ['Varanasi', 'Azamgarh', 'Mau', 'Prayagraj', 'Jaunpur', 'Ambedkar nagar'];
  var index = 0;
  window.setInterval(function () {
    if (document.hidden) return;
    index = (index + 1) % cities.length;
    headings.forEach(function (heading) { heading.textContent = cities[index]; });
  }, 1000);
})();
