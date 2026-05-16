/* ══════════════════════════════════════
   utils.js — shared helpers
   (loaded first, used by all other scripts)
══════════════════════════════════════ */

'use strict';

/** Random float in [a, b) */
const rnd   = (a, b) => a + Math.random() * (b - a);

/** Random item from array */
const pick  = arr => arr[Math.floor(Math.random() * arr.length)];

/** Clamp v between lo and hi */
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/** Linear interpolation */
const lerp  = (a, b, t) => a + (b - a) * t;

/** Create a DOM element with optional class and text */
function mkDiv(cls, text, color) {
  const d = document.createElement('div');
  d.className = 'el ' + cls;
  if (text)  d.textContent = text;
  if (color) d.style.color = color;
  return d;
}

/** Viewport dimensions (kept in sync) */
const VP = { w: window.innerWidth, h: window.innerHeight };
window.addEventListener('resize', () => {
  VP.w = window.innerWidth;
  VP.h = window.innerHeight;
});
