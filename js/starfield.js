/* ══════════════════════════════════════
   starfield.js — animated background stars
══════════════════════════════════════ */

'use strict';

(function initStarfield() {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Build star pool
  const STAR_COUNT = 240;
  const stars = Array.from({ length: STAR_COUNT }, () => ({
    x:   Math.random(),
    y:   Math.random(),
    r:   Math.random() * 1.3 + 0.15,
    a:   Math.random() * 0.44 + 0.04,
    ph:  Math.random() * Math.PI * 2,
    spd: Math.random() * 0.0007 + 0.0002,
  }));

  let t = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    stars.forEach(s => {
      // Gentle flicker
      const alpha = s.a * (0.6 + 0.4 * Math.sin(t * s.spd * 60 + s.ph));
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(237,232,223,${alpha.toFixed(3)})`;
      ctx.fill();
    });

    t++;
    requestAnimationFrame(draw);
  }

  draw();
})();
