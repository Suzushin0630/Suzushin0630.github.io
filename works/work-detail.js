/* work-detail.js — parallax, lightbox, image protection */
(function () {

  /* ── Parallax on hero image ── */
  var hero    = document.querySelector('.work-hero');
  var heroImg = hero && hero.querySelector('img');
  if (heroImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    function tickParallax() {
      if (hero.getBoundingClientRect().bottom < 0) return;
      heroImg.style.transform = 'translateY(' + (-window.scrollY * 0.25) + 'px)';
    }
    window.addEventListener('scroll', tickParallax, { passive: true });
    tickParallax();
  }

  /* ── Lightbox ── */
  var lb      = document.createElement('div');
  lb.id       = 'lightbox';
  var lbClose = document.createElement('span');
  lbClose.id  = 'lightbox-close';
  lbClose.innerHTML = '&times;';
  var lbImg   = document.createElement('img');
  lbImg.setAttribute('draggable', 'false');
  lb.appendChild(lbClose);
  lb.appendChild(lbImg);
  document.body.appendChild(lb);

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lb.classList.remove('active');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery-full img, .gallery-grid img').forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () { openLightbox(img.src, img.alt); });
  });

  lbClose.addEventListener('click', closeLightbox);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });

  /* ── Image protection (right-click / drag) ── */
  document.addEventListener('contextmenu', function (e) {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });
  document.querySelectorAll('img').forEach(function (img) {
    img.setAttribute('draggable', 'false');
    img.addEventListener('dragstart', function (e) { e.preventDefault(); });
  });

})();
