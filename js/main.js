/* ══════════════════════════════════════
   main.js — application entry point
   Runs after all other scripts are loaded.
══════════════════════════════════════ */

'use strict';

(function init() {
  // Trigger initial scroll update so elements are correctly
  // positioned if the user reloads mid-page
  update();

  // Log structure for debugging
  console.group('%c∿ ambient portfolio', 'color:#c8a040;font-size:1.2rem;font-family:serif;font-style:italic;');
  console.log(`%c${ALBUMS.length} albums · ${WORLD_ELEMS.length} world elements`, 'color:rgba(237,232,223,.5);font-family:monospace;font-size:.8rem;');
  console.log('%cEdit js/data.js to change content', 'color:rgba(237,232,223,.3);font-family:monospace;font-size:.75rem;');
  console.log('%cAdd real images by replacing photoSVG() / coverSVG() calls in js/svg.js', 'color:rgba(237,232,223,.3);font-family:monospace;font-size:.75rem;');
  console.groupEnd();
})();
