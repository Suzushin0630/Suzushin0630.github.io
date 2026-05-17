/* work-detail.js — parallax, lightbox, image protection, nav, cursor, progress */
(function () {
  'use strict';

  /* ── Scroll progress ── */
  var prog = document.getElementById('progress');
  if (prog) {
    window.addEventListener('scroll', function () {
      prog.style.width = Math.min(
        window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100, 100
      ) + '%';
    }, { passive: true });
  }

  /* ── Custom cursor ── */
  var cur = document.getElementById('cursor');
  if (cur) {
    document.addEventListener('mousemove', function (e) {
      cur.style.left = e.clientX + 'px';
      cur.style.top  = e.clientY + 'px';
    });
    document.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cur.classList.add('hover'); });
      el.addEventListener('mouseleave', function () { cur.classList.remove('hover'); });
    });
  }

  /* ── Hamburger / mobile nav ── */
  var ham    = document.getElementById('hamburger');
  var mobNav = document.getElementById('mobile-nav');
  if (ham && mobNav) {
    ham.addEventListener('click', function () {
      var open = mobNav.classList.toggle('open');
      ham.classList.toggle('open', open);
      ham.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

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
    lbImg.src = src; lbImg.alt = alt || '';
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

  /* ── Image protection ── */
  document.addEventListener('contextmenu', function (e) {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });
  document.querySelectorAll('img').forEach(function (img) {
    img.setAttribute('draggable', 'false');
    img.addEventListener('dragstart', function (e) { e.preventDefault(); });
  });

})();
