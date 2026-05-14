/* Parallax effect for work detail hero images */
(function () {
  var hero = document.querySelector('.work-hero');
  var img  = hero && hero.querySelector('img');
  if (!img) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function tick() {
    if (hero.getBoundingClientRect().bottom < 0) return;
    img.style.transform = 'translateY(' + (-window.scrollY * 0.25) + 'px)';
  }

  window.addEventListener('scroll', tick, { passive: true });
  tick();
})();
