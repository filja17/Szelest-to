/* ══════════════════════════════════════
   world.js — builds the scroll world:
   places every element (text, covers,
   photos, shapes) at absolute positions
   in #world based on data.js content.
══════════════════════════════════════ */

'use strict';

/* ── World dimensions ── */
const BANDS_PER_ALBUM = 2.8;  // viewport-heights per album band
const WORLD_VH = ALBUMS.length * BANDS_PER_ALBUM + 2; // +2 top/bottom padding

function worldPX()  { return WORLD_VH * VP.h; }
function scrollPX() { return worldPX() - VP.h; }

/* Resize scene height when viewport changes */
const sceneEl = document.getElementById('scene');
function setSceneHeight() {
  sceneEl.style.height = (worldPX() + VP.h) + 'px';
}
setSceneHeight();
window.addEventListener('resize', setSceneHeight);

/* ── Element registry ──
   Each entry: { node, worldY, parallax, baseOp, rot,
                 driftAmpX, driftAmpY, driftPhase, driftSpeed }
*/
const WORLD_ELEMS = [];

const worldEl = document.getElementById('world');

/**
 * Place an element in the world.
 * @param {HTMLElement} node
 * @param {number} worldY       - top in world-px
 * @param {number} parallax     - scroll multiplier (1 = normal, <1 = slower/deeper, >1 = faster/closer)
 * @param {number} baseOp       - max opacity
 * @param {number} rot          - base rotation in degrees
 * @param {number} [driftAX]    - drift amplitude X
 * @param {number} [driftAY]    - drift amplitude Y
 */
function placeEl(node, worldY, parallax, baseOp, rot, driftAX, driftAY) {
  node.style.position = 'absolute';
  node.style.top      = worldY + 'px';
  node.style.opacity  = '0';
  worldEl.appendChild(node);

  WORLD_ELEMS.push({
    node,
    worldY,
    parallax,
    baseOp,
    rot,
    driftAmpX: driftAX !== undefined ? driftAX : rnd(3, 9),
    driftAmpY: driftAY !== undefined ? driftAY : rnd(2, 6),
    driftPhase: Math.random() * Math.PI * 2,
    driftSpeed: rnd(0.0003, 0.0009),
  });
}

/* ════════════════════════════════════
   AMBIENT GHOST WORDS
   Scattered at random across the full world.
════════════════════════════════════ */
function buildGhostWords() {
  for (let i = 0; i < 80; i++) {
    const yFrac = rnd(0.005, 0.995);
    const n = mkDiv('t-mono', pick(GHOST_WORDS), 'rgba(237,232,223,.09)');
    n.style.left = rnd(2, 87) + 'vw';
    placeEl(n, yFrac * worldPX(), rnd(.5, 1.35), rnd(.04, .14), rnd(-30, 30));
  }
}

/* ════════════════════════════════════
   FLOATING PHRASES
   Evenly distributed between albums.
════════════════════════════════════ */
function buildPhrases() {
  PHRASES.forEach((f, fi) => {
    const yFrac = (fi + 0.5) / PHRASES.length;
    const n = document.createElement('div');
    n.className   = 'el ' + f.cls;
    n.textContent = f.text;
    n.style.color = f.col;
    n.style.left  = rnd(3, 52) + 'vw';
    placeEl(
      n,
      yFrac * worldPX() + rnd(-VP.h * .4, VP.h * .4),
      rnd(.7, 1.05),
      f.cls === 't-large' ? rnd(.35, .72) : rnd(.4, .75),
      rnd(-5, 5)
    );
  });
}

/* ════════════════════════════════════
   PER-ALBUM CLUSTER
════════════════════════════════════ */
function buildAlbumCluster(album, ai) {
  const bandStartPX = (1 + ai * BANDS_PER_ALBUM) * VP.h;
  const midPX       = bandStartPX + BANDS_PER_ALBUM * VP.h * 0.5;

  /* 1. Massive title */
  const titleN = mkDiv('t-massive', album.title, album.color);
  titleN.style.left = rnd(-VP.w * .06, VP.w * .04) + 'px';
  placeEl(titleN, midPX - VP.h * .55,
    rnd(.8, .9), .9, rnd(-5, 5), rnd(6, 14));

  /* 2. Year */
  const yearN = mkDiv('t-mono', album.year, 'rgba(237,232,223,.34)');
  yearN.style.left = rnd(VP.w * .1, VP.w * .68) + 'px';
  placeEl(yearN, midPX - VP.h * .38 + rnd(-28, 28),
    rnd(1.06, 1.2), .52, rnd(-2, 2));

  /* 3. Description */
  const descN = mkDiv('t-body', album.desc, 'rgba(237,232,223,.68)');
  descN.style.left = rnd(VP.w * .03, VP.w * .52) + 'px';
  placeEl(descN, midPX + rnd(-VP.h * .12, VP.h * .18),
    rnd(.9, .98), .72, rnd(-2, 2), 3, rnd(4, 8));

  /* 4. Quote */
  const quoteN = mkDiv('t-body', `„${album.quote}"`, 'rgba(237,232,223,.42)');
  quoteN.style.left = rnd(VP.w * .04, VP.w * .5) + 'px';
  placeEl(quoteN, midPX + VP.h * .28 + rnd(-20, 20),
    rnd(.88, .96), .45, rnd(-3, 3), 4, 5);

  /* 5. Tags */
  album.tags.forEach((tag, ti) => {
    const tagN = mkDiv('t-mono', '— ' + tag, album.color);
    tagN.style.left = rnd(VP.w * .04, VP.w * .74) + 'px';
    placeEl(tagN, midPX + VP.h * (.18 + ti * .14) + rnd(-24, 24),
      rnd(.85, 1.1), rnd(.28, .54), rnd(-3, 3));
  });

  /* 6. Main cover */
  const cSz  = Math.round(VP.w * rnd(.19, .3));
  const cDiv = document.createElement('div');
  cDiv.className = 'el cover';
  cDiv.style.width  = cSz + 'px';
  cDiv.style.height = cSz + 'px';
  cDiv.innerHTML    = coverSVG(album, ai);
  const cX = rnd(VP.w * .28, VP.w * .58);
  cDiv.style.left = cX + 'px';
  placeEl(cDiv, midPX - cSz * .5,
    rnd(.7, .83), .95, rnd(-9, 9), rnd(4, 10), rnd(3, 7));

  /* 7. Second cover (smaller, offset) */
  const c2Sz  = Math.round(cSz * rnd(.42, .62));
  const c2Div = document.createElement('div');
  c2Div.className = 'el cover';
  c2Div.style.width  = c2Sz + 'px';
  c2Div.style.height = c2Sz + 'px';
  c2Div.innerHTML    = coverSVG(album, ai + 10);
  c2Div.style.left   = (cX + cSz + rnd(-c2Sz * .1, c2Sz * .65)) + 'px';
  placeEl(c2Div, midPX + rnd(-VP.h * .35, VP.h * .15),
    rnd(1.05, 1.18), rnd(.38, .65), rnd(-20, 20), rnd(6, 13));

  /* 8. Ghost echo of title (very dim) */
  const echoN = mkDiv('t-massive', album.title, album.color);
  echoN.style.left = rnd(VP.w * .04, VP.w * .18) + 'px';
  placeEl(echoN, midPX + VP.h * .32,
    rnd(1.12, 1.28), rnd(.04, .1), rnd(-9, 9));

  /* 9. Photos (2–3) */
  const nPh = pick([2, 3]);
  for (let pi = 0; pi < nPh; pi++) {
    const pw    = Math.round(VP.w * rnd(.1, .26));
    const ph    = Math.round(pw * rnd(.6, 1.55));
    const phDiv = document.createElement('div');
    phDiv.className = 'el photo';
    phDiv.style.width  = pw + 'px';
    phDiv.style.height = ph + 'px';
    phDiv.innerHTML    = photoSVG(ai * 4 + pi);
    phDiv.style.left   = rnd(VP.w * .01, VP.w * .72) + 'px';
    placeEl(phDiv, midPX + rnd(-VP.h * .7, VP.h * .55),
      rnd(.65, 1.22), rnd(.38, .72), rnd(-15, 15), rnd(3, 9), rnd(2, 6));
  }

  /* 10. Lines */
  for (let li = 0; li < 4; li++) {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'el line';
    const horiz = Math.random() > .35;
    const len   = rnd(38, VP.w * .28);
    lineDiv.style.width      = horiz ? len + 'px' : '1px';
    lineDiv.style.height     = horiz ? '1px' : len + 'px';
    lineDiv.style.background = `rgba(237,232,223,${rnd(.05,.22).toFixed(2)})`;
    lineDiv.style.left       = rnd(VP.w * .02, VP.w * .88) + 'px';
    placeEl(lineDiv, midPX + rnd(-VP.h * .78, VP.h * .68),
      rnd(.72, 1.3), rnd(.08, .28), horiz ? rnd(-3, 3) : rnd(-50, 50));
  }

  /* 11. Dots */
  for (let di = 0; di < 7; di++) {
    const ds    = rnd(3, 12);
    const dotD  = document.createElement('div');
    dotD.className = 'el dot';
    dotD.style.width      = ds + 'px';
    dotD.style.height     = ds + 'px';
    dotD.style.background = Math.random() > .5 ? album.color : 'rgba(237,232,223,.52)';
    dotD.style.left       = rnd(VP.w * .02, VP.w * .94) + 'px';
    placeEl(dotD, midPX + rnd(-VP.h * .88, VP.h * .78),
      rnd(.44, 1.48), rnd(.2, .76), 0, rnd(8, 20), rnd(6, 16));
  }

  /* 12. Ghost rings */
  for (let ci = 0; ci < 3; ci++) {
    const rs    = rnd(VP.w * .12, VP.w * .5);
    const ringD = document.createElement('div');
    ringD.className = 'el ring';
    ringD.style.width       = rs + 'px';
    ringD.style.height      = rs + 'px';
    ringD.style.borderColor = album.color;
    ringD.style.left        = rnd(-rs * .3, VP.w * .75) + 'px';
    placeEl(ringD, midPX + rnd(-VP.h * .65, VP.h * .5),
      rnd(.34, .72), rnd(.04, .14), 0, rnd(12, 24), rnd(8, 18));
  }
}

/* ════════════════════════════════════
   BUILD EVERYTHING
════════════════════════════════════ */
function buildWorld() {
  buildGhostWords();
  buildPhrases();
  ALBUMS.forEach((album, ai) => buildAlbumCluster(album, ai));
}

buildWorld();
