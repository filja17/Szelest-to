/* ══════════════════════════════════════
   svg.js — procedural SVG generators
   for album covers and photo placeholders.
   Replace with real <img> tags when you
   have actual artwork / photos.
══════════════════════════════════════ */

'use strict';

/**
 * Generate an abstract album cover SVG string.
 * @param {object} album  - album object from data.js
 * @param {number} seed   - integer seed for design variant
 * @returns {string} SVG markup
 */
function coverSVG(album, seed) {
  const { color: ac, bg1: c1, bg2: c2 } = album;
  const id = 'cg' + seed;

  const designs = [

    // 0 — concentric rings
    `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="${id}">
          <stop offset="0%" stop-color="${c2}"/>
          <stop offset="100%" stop-color="${c1}"/>
        </radialGradient>
      </defs>
      <rect width="300" height="300" fill="url(#${id})"/>
      ${[130,100,72,48,28,12].map((r,i)=>`
        <circle cx="150" cy="150" r="${r}"
          fill="none" stroke="${ac}"
          stroke-width=".7"
          opacity="${(.07+i*.05).toFixed(2)}"/>`).join('')}
      <circle cx="150" cy="150" r="4" fill="${ac}" opacity=".75"/>
    </svg>`,

    // 1 — wave interference
    `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${c1}"/>
          <stop offset="100%" stop-color="${c2}"/>
        </linearGradient>
      </defs>
      <rect width="300" height="300" fill="url(#${id})"/>
      ${Array.from({length:14},(_,i)=>{
        const y=75+i*13, a=8+i*3;
        return `<path d="M0,${y} Q75,${y-a} 150,${y} T300,${y}"
          fill="none" stroke="${ac}"
          stroke-width=".8"
          opacity="${(.03+i*.018).toFixed(3)}"/>`;
      }).join('')}
    </svg>`,

    // 2 — diagonal grid + inner square
    `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="300" fill="${c1}"/>
      ${Array.from({length:9},(_,i)=>`
        <line x1="${i*38}" y1="0" x2="${i*38+240}" y2="300"
          stroke="${ac}" stroke-width=".6"
          opacity="${(.05+i*.018).toFixed(3)}"/>`).join('')}
      ${Array.from({length:5},(_,i)=>`
        <line x1="${i*80}" y1="300" x2="${i*80+200}" y2="0"
          stroke="${ac}" stroke-width=".4" opacity=".04"/>`).join('')}
      <rect x="100" y="100" width="100" height="100"
        fill="none" stroke="${ac}" stroke-width=".8" opacity=".22"/>
    </svg>`,

    // 3 — scatter field
    `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="300" fill="${c1}"/>
      ${Array.from({length:48},()=>{
        const x=(Math.random()*280+10).toFixed(1);
        const y=(Math.random()*280+10).toFixed(1);
        const r=(Math.random()*4+.6).toFixed(1);
        const o=(Math.random()*.28+.04).toFixed(2);
        return `<circle cx="${x}" cy="${y}" r="${r}" fill="${ac}" opacity="${o}"/>`;
      }).join('')}
      <circle cx="150" cy="150" r="55"
        fill="none" stroke="${ac}" stroke-width=".5" opacity=".18"/>
    </svg>`,

    // 4 — nested triangles
    `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="300" fill="${c1}"/>
      ${[
        ['150,42 262,238 38,238',  .9, .26],
        ['150,74 240,222 60,222',  .72,.21],
        ['150,106 218,206 82,206', .54,.16],
        ['150,133 196,190 104,190',.36,.11],
      ].map(([pts,sw,op])=>`
        <polygon points="${pts}"
          fill="none" stroke="${ac}"
          stroke-width="${sw.toFixed(2)}"
          opacity="${op.toFixed(2)}"/>`).join('')}
    </svg>`,

    // 5 — crosshatch + circle
    `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="${id}" cx="40%" cy="60%">
          <stop offset="0%" stop-color="${c2}"/>
          <stop offset="100%" stop-color="${c1}"/>
        </radialGradient>
      </defs>
      <rect width="300" height="300" fill="url(#${id})"/>
      ${Array.from({length:10},(_,i)=>`
        <line x1="0" y1="${i*33}" x2="300" y2="${i*33}"
          stroke="${ac}" stroke-width=".4" opacity=".07"/>
        <line x1="${i*33}" y1="0" x2="${i*33}" y2="300"
          stroke="${ac}" stroke-width=".4" opacity=".07"/>`).join('')}
      <circle cx="150" cy="150" r="80"
        fill="none" stroke="${ac}" stroke-width="1" opacity=".2"/>
      <circle cx="150" cy="150" r="5" fill="${ac}" opacity=".6"/>
    </svg>`,
  ];

  return designs[seed % designs.length];
}

/**
 * Generate an abstract photo-placeholder SVG.
 * Replace with real <img> elements when you have photographs.
 * @param {number} seed - integer seed for variant
 * @returns {string} SVG markup
 */
function photoSVG(seed) {
  const palettes = [
    ['#0d1520','#1a2535'], ['#150d08','#2a1a10'],
    ['#08100a','#10180e'], ['#12080e','#201018'], ['#0a0c14','#101422'],
  ];
  const [c1, c2] = palettes[seed % palettes.length];
  const id = 'ph' + seed;

  const types = [
    // horizontal landscape
    `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${c1}"/>
          <stop offset="100%" stop-color="${c2}"/>
        </linearGradient>
      </defs>
      <rect width="400" height="280" fill="url(#${id})"/>
      <ellipse cx="${140+(seed%5)*14}" cy="160"
        rx="${68+(seed%4)*9}" ry="${50+(seed%3)*6}"
        fill="none" stroke="rgba(237,232,223,.06)" stroke-width="35"/>
      <rect x="0" y="224" width="400" height="56" fill="rgba(0,0,0,.42)"/>
    </svg>`,

    // vertical portrait
    `<svg viewBox="0 0 280 370" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="370" fill="${c1}"/>
      ${Array.from({length:7},(_,i)=>`
        <rect x="0" y="${i*54}" width="280" height="27"
          fill="rgba(237,232,223,${(.012+i*.004).toFixed(3)})"/>`).join('')}
      <rect x="55" y="75" width="170" height="220"
        fill="rgba(237,232,223,.04)"
        stroke="rgba(237,232,223,.07)" stroke-width=".5"/>
    </svg>`,

    // wide panorama with horizon
    `<svg viewBox="0 0 460 320" xmlns="http://www.w3.org/2000/svg">
      <rect width="460" height="320" fill="${c2}"/>
      <path d="M0,200 Q115,118 230,200 T460,200 L460,320 L0,320Z"
        fill="rgba(0,0,0,.42)"/>
      <circle cx="230" cy="128" r="72"
        fill="none" stroke="rgba(237,232,223,.06)" stroke-width="1"/>
      <line x1="0" y1="165" x2="460" y2="165"
        stroke="rgba(237,232,223,.04)" stroke-width=".5"/>
    </svg>`,

    // square abstract
    `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="320" fill="${c1}"/>
      ${Array.from({length:5},(_,i)=>{
        const r=28+i*36;
        return `<circle cx="160" cy="160" r="${r}"
          fill="none"
          stroke="rgba(237,232,223,${(.04+i*.016).toFixed(3)})"
          stroke-width=".6"/>`;
      }).join('')}
      <rect x="98" y="98" width="124" height="124"
        fill="rgba(237,232,223,.03)"
        stroke="rgba(237,232,223,.06)" stroke-width=".5"/>
    </svg>`,
  ];

  return types[seed % types.length];
}
