/* ══════════════════════════════════════
   nav.js — mobile hamburger + drawer
══════════════════════════════════════ */

'use strict';

(function initNav() {
  const hamburger = document.getElementById('nav-hamburger');
  if (!hamburger) return;

  // Create mobile drawer
  const drawer = document.createElement('div');
  drawer.className = 'nav-drawer';
  drawer.innerHTML = `
    <a onclick="openSub('projects'); closeDrawer()">Projekty</a>
    <a onclick="openSub('products'); closeDrawer()">Produkty</a>
    <a onclick="openSub('about');    closeDrawer()">O mnie</a>
    <a onclick="openSub('gallery');  closeDrawer()">Galeria</a>
    <a onclick="openSub('contact');  closeDrawer()">Kontakt</a>
  `;
  document.body.appendChild(drawer);

  function openDrawer() {
    drawer.classList.add('open');
    hamburger.classList.add('open');
    document.body.classList.add('no-scroll');
  }

  window.closeDrawer = function () {
    drawer.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.classList.remove('no-scroll');
  };

  hamburger.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });
})();
