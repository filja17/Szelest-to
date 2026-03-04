/* ============================================
   CUSTOM CURSOR
============================================ */
function initCursorHome() {
  const dot    = document.getElementById('cursorDot');
  const circle = document.getElementById('cursorCircle');
  if (!dot || !circle) return;
  if (window.matchMedia('(pointer: coarse)').matches) {
    dot.style.display    = 'none';
    circle.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let circleX = 0, circleY = 0;
  let raf;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
    dot.style.opacity = '1';
  });

  // Koło opóźnione — lerp
  function animateCircle() {
    circleX += (mouseX - circleX) * 0.12;
    circleY += (mouseY - circleY) * 0.12;
    circle.style.left    = circleX + 'px';
    circle.style.top     = circleY + 'px';
    circle.style.opacity = '1';
    raf = requestAnimationFrame(animateCircle);
  }
  animateCircle();

  // Hover na elementach klikalnych
  const targets = 'a, button, .mosaic__item, .float-gallery__item, .strip__img';
  document.querySelectorAll(targets).forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform    = 'translate(-50%,-50%) scale(2.5)';
      circle.style.width     = '60px';
      circle.style.height    = '60px';
      circle.style.borderColor = 'rgba(201,169,110,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform    = 'translate(-50%,-50%) scale(1)';
      circle.style.width     = '40px';
      circle.style.height    = '40px';
      circle.style.borderColor = 'rgba(201,169,110,0.5)';
    });
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity    = '0';
    circle.style.opacity = '0';
  });
}

/* ============================================
   PARALLAX — warstwy hero reagują na kursor
============================================ */
function initHeroParallax() {
  const hero   = document.getElementById('hero');
  const layers = document.querySelectorAll('[data-parallax]');
  if (!hero || !layers.length) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  hero.addEventListener('mousemove', e => {
    const rect   = hero.getBoundingClientRect();
    // Normalizuj do -1 … +1
    targetX = ((e.clientX - rect.left)  / rect.width  - 0.5) * 2;
    targetY = ((e.clientY - rect.top)   / rect.height - 0.5) * 2;
  });

  hero.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });

  function animate() {
    // Lerp
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;

    layers.forEach(layer => {
      const depth = parseFloat(layer.getAttribute('data-parallax')) || 0.05;
      const moveX = currentX * depth * 60;
      const moveY = currentY * depth * 60;
      layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    requestAnimationFrame(animate);
  }
  animate();
}

/* ============================================
   PARALLAX — zdjęcia w fluid-section
   przesuwają się przy scrollu
============================================ */
function initScrollParallax() {
  const imgs = document.querySelectorAll('[data-parallax-img]');
  if (!imgs.length) return;

  function onScroll() {
    imgs.forEach(img => {
      const depth  = parseFloat(img.getAttribute('data-parallax-img')) || 0.05;
      const rect   = img.closest('.fluid-section').getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const move   = center * depth * -1;
      img.style.transform = `translateY(${move}px)`;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================
   FLOAT GALLERY — subtelny paralax przy scrollu
============================================ */
function initFloatGallery() {
  const items = document.querySelectorAll('.float-gallery__item');
  if (!items.length) return;

  const depths = [0.04, 0.07, 0.03, 0.08, 0.05];

  function onScroll() {
    const scrollY = window.scrollY;
    items.forEach((item, i) => {
      const depth = depths[i] || 0.05;
      const base  = parseFloat(
        item.style.transform.replace(/[^-\d.]/g, '') || 0
      );
      const rect  = item.closest('.float-gallery').getBoundingClientRect();
      const rel   = (rect.top + rect.height / 2) / window.innerHeight - 0.5;
      const moveY = rel * depth * 120;

      // Zachowaj rotację
      const rotations = [-3.5, 2, -1.5, 3, -2];
      const rot = rotations[i] || 0;
      item.style.transform =
        `rotate(${rot}deg) translateY(${moveY}px)`;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ============================================
   INSTAGRAM HOVER
============================================ */
function initInstaGrid() {
  document.querySelectorAll(
    '[style*="aspect-ratio:1"] img'
  ).forEach(img => {
    img.parentElement.addEventListener('mouseenter', () => {
      img.style.filter    = 'brightness(1) saturate(1)';
      img.style.transform = 'scale(1.07)';
    });
    img.parentElement.addEventListener('mouseleave', () => {
      img.style.filter    = 'brightness(0.7) saturate(0.6)';
      img.style.transform = 'scale(1)';
    });
  });
}

/* ============================================
   MOSAIC — hover podnosi kontrast sąsiadów
============================================ */
function initMosaicInteraction() {
  const items = document.querySelectorAll('.mosaic__item');
  if (!items.length) return;

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      items.forEach(other => {
        if (other !== item) {
          other.style.filter    = 'brightness(0.5)';
          other.style.transition = 'filter 0.4s ease';
        }
      });
    });

    item.addEventListener('mouseleave', () => {
      items.forEach(other => {
        other.style.filter = '';
      });
    });

    // Klik prowadzi do products
    item.addEventListener('click', () => {
      window.location.href = 'products.html';
    });
  });
}

/* ============================================
   REVEAL ON SCROLL
============================================ */
function initRevealHome() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.filter    = 'blur(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

  els.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(50px)';
    el.style.filter     = 'blur(6px)';
    el.style.transition =
      'opacity 1.2s cubic-bezier(0.16,1,0.3,1), ' +
      'transform 1.2s cubic-bezier(0.16,1,0.3,1), ' +
      'filter 1.2s ease';
    observer.observe(el);
  });
}

/* ============================================
   TICKER — pauza przy hoverze
============================================ */
function initTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;

  track.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  track.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
}

/* ============================================
   STRIP — pauza przy hoverze
============================================ */
function initStrips() {
  document.querySelectorAll('.strip__track').forEach(track => {
    track.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    track.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  });
}

/* ============================================
   INIT
============================================ */
document.addEventListener('DOMContentLoaded', () => {
  initCursorHome();
  initHeroParallax();
  initScrollParallax();
  initFloatGallery();
  initInstaGrid();
  initMosaicInteraction();
  initRevealHome();
  initTicker();
  initStrips();
});
