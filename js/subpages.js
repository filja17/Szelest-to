/* ══════════════════════════════════════
   subpages.js — overlay routing +
   HTML renderers for each subpage.
   Add new pages by:
     1. Adding a nav link in index.html
     2. Adding a case to buildPage()
══════════════════════════════════════ */

'use strict';

const subpagesEl = document.getElementById('subpages');
const spContent  = document.getElementById('sp-content');

function openSub(page) {
  subpagesEl.classList.add('open');
  subpagesEl.scrollTop = 0;
  document.body.classList.add('no-scroll');
  spContent.innerHTML = buildPage(page);
}

function closeSub() {
  subpagesEl.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

// Keyboard: Escape closes overlay
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSub();
});

/* ════════════════════════════════════
   PAGE BUILDERS
════════════════════════════════════ */
function buildPage(page) {
  switch (page) {
    case 'projects': return buildProjects();
    case 'products': return buildProducts();
    case 'about':    return buildAbout();
    case 'gallery':  return buildGallery();
    case 'contact':  return buildContact();
    default:         return '<p>Strona nie znaleziona.</p>';
  }
}

/* ── Projects ── */
function buildProjects() {
  const rows = PROJECTS.map(p => `
    <div class="pj-row" onclick="window.open('${p.link}')">
      <span class="pj-n">${p.num}</span>
      <span class="pj-name">${p.name}</span>
      <span class="pj-sub">${p.sub}</span>
    </div>`).join('');

  return `
    <span class="sp-label">00 — projekty</span>
    <h1 class="sp-h">Projekty</h1>
    <div class="pj-list">${rows}</div>`;
}

/* ── Products ── */
function buildProducts() {
  const cards = PRODUCTS.map((p, i) => `
    <div class="pr-card">
      <div class="pr-art">${coverSVG(p.album, i + 20)}</div>
      <div class="pr-title">${p.album.title}</div>
      <div class="pr-fmt">${p.format}</div>
      <div class="pr-price">${p.price} PLN</div>
    </div>`).join('');

  return `
    <span class="sp-label">01 — sklep</span>
    <h1 class="sp-h">Produkty</h1>
    <div class="pr-grid">${cards}</div>`;
}

/* ── About ── */
function buildAbout() {
  const portrait = ABOUT.portraitSrc
    ? `<img src="${ABOUT.portraitSrc}" alt="Portret artysty" class="ab-portrait" style="object-fit:cover;">`
    : `<div class="ab-portrait">portret</div>`;

  const paragraphs = ABOUT.paragraphs.map(p => `<p>${p}</p>`).join('');

  const stats = ABOUT.stats.map(s => `
    <div>
      <span class="ab-stat-num">${s.num}</span>
      <span class="ab-stat-label">${s.label}</span>
    </div>`).join('');

  return `
    <span class="sp-label">02 — artysta</span>
    <h1 class="sp-h">O mnie</h1>
    <div class="ab-grid">
      ${portrait}
      <div class="ab-text">
        ${paragraphs}
        <div class="ab-stats">${stats}</div>
      </div>
    </div>`;
}

/* ── Gallery ──
   Seeds 30–41 for placeholder SVGs.
   Replace photoSVG() calls with
   <img src="assets/images/photo-N.jpg"> when ready.
*/
function buildGallery() {
  // Alternating aspect ratios for masonry feel
  const aspects = ['4/3','3/4','1/1','16/9','3/4','4/3','1/1','16/9','3/4','4/3','1/1','3/4'];

  const items = aspects.map((ar, i) => `
    <div class="gl-item">
      <div class="gl-in" style="aspect-ratio:${ar}">
        ${photoSVG(i + 30)}
      </div>
    </div>`).join('');

  return `
    <span class="sp-label">03 — fotografia</span>
    <h1 class="sp-h">Galeria</h1>
    <div class="gl-cols">${items}</div>`;
}

/* ── Contact ── */
function buildContact() {
  const links = CONTACT.links.map(l => `
    <a class="ct-row" href="${l.href}" target="_blank" rel="noopener">
      <span class="ct-lbl">${l.label}</span>
      <span class="ct-val">${l.val}</span>
    </a>`).join('');

  return `
    <span class="sp-label">04 — kontakt</span>
    <h1 class="sp-h">Kontakt</h1>
    <div class="ct-body">
      <p class="ct-intro">${CONTACT.intro}</p>
      ${links}
    </div>`;
}
