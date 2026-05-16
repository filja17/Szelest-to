/* ══════════════════════════════════════
   scroll.js — scroll engine
   Moves #world, fades elements in/out
   based on scroll position, applies
   parallax offsets and drift animation.
══════════════════════════════════════ */

'use strict';

let driftT = 0;

/**
 * Main update — called on scroll and on drift tick.
 */
function update() {
  const scrollY   = window.scrollY;
  const maxScroll = scrollPX();
  const progress  = clamp(scrollY / maxScroll, 0, 1);
  const baseWorldY = -progress * worldPX();

  // Translate the whole world
  worldEl.style.transform = `translateY(${baseWorldY}px)`;

  const vpCtr = VP.h * 0.5; // screen-space vertical center

  WORLD_ELEMS.forEach(e => {
    // Parallax shifts element relative to base position
    const pOffset = (e.parallax - 1) * scrollY * -0.28;

    // Approximate screen-space Y of element center
    const screenCtr = e.worldY + baseWorldY + pOffset + 50;
    const dist = Math.abs(screenCtr - vpCtr);

    // Fade: fully visible in a central band, fades out beyond
    const fullIn  = VP.h * 0.22;
    const fadeOut = VP.h * 1.18;
    let op = 0;
    if (dist < fullIn) {
      op = e.baseOp;
    } else if (dist < fadeOut) {
      const t = (dist - fullIn) / (fadeOut - fullIn);
      op = e.baseOp * Math.pow(1 - t, 1.7);
    }

    // Gentle organic drift
    const dx = Math.sin(driftT * e.driftSpeed + e.driftPhase)         * e.driftAmpX;
    const dy = Math.cos(driftT * e.driftSpeed * 1.4 + e.driftPhase + 1) * e.driftAmpY;

    e.node.style.opacity   = clamp(op, 0, 1).toFixed(3);
    e.node.style.transform =
      `translate(${dx.toFixed(2)}px, ${(pOffset + dy).toFixed(2)}px) rotate(${e.rot}deg)`;
  });
}

// Listen to scroll
window.addEventListener('scroll', update, { passive: true });

// Drift loop (~30 fps is smooth enough for ambient drift)
let _lastDrift = 0;
function driftLoop(ts) {
  if (ts - _lastDrift > 33) {
    driftT++;
    _lastDrift = ts;
    update();
  }
  requestAnimationFrame(driftLoop);
}
requestAnimationFrame(driftLoop);

// Initial paint
update();
