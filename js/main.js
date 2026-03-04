/* ============================================
   CART STATE (localStorage)
============================================ */
let cart = JSON.parse(localStorage.getItem('ebruCart')) || [];

function saveCart() {
  localStorage.setItem('ebruCart', JSON.stringify(cart));
}

function updateCartUI() {
  const count     = cart.reduce((sum, i) => sum + i.qty, 0);
  const total     = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const countEl   = document.getElementById('cartCount');
  const totalEl   = document.getElementById('cartTotal');
  const footerEl  = document.getElementById('cartFooter');
  const emptyEl   = document.getElementById('cartEmpty');
  const itemsEl   = document.getElementById('cartItems');

  //
  // Licznik w navie
  if (countEl) {
    countEl.textContent = count;
    countEl.classList.toggle('visible', count > 0);
  }

  // Total
  if (totalEl) {
    totalEl.textContent = total.toLocaleString('pl-PL') + ' PLN';
  }

  // Footer koszyka
  if (footerEl) {
    footerEl.style.display = cart.length > 0 ? 'block' : 'none';
  }

  // Empty state vs items
  if (!itemsEl) return;

  if (cart.length === 0) {
    if (emptyEl) emptyEl.style.display = 'flex';
    // Usuń istniejące itemy
    itemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';

  // Wyczyść i przerysuj
  itemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img
        class="cart-item__img"
        src="${item.img}"
        alt="${item.name}"
        onerror="this.src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=160&q=60'"
      >
      <div class="cart-item__info">
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__price">
          ${item.price.toLocaleString('pl-PL')} PLN
          ${item.qty > 1 ? `<span style="color:var(--text-muted);font-size:0.78rem">
            × ${item.qty}</span>` : ''}
        </div>
        <div style="display:flex;align-items:center;gap:0.8rem;margin-top:0.5rem">
          <button
            class="cart-item__remove"
            onclick="changeQty(${index}, -1)"
            aria-label="Zmniejsz ilość"
            style="font-size:1rem;padding:0 4px"
          >−</button>
          <span style="font-size:0.85rem;color:var(--ink)">${item.qty}</span>
          <button
            class="cart-item__remove"
            onclick="changeQty(${index}, 1)"
            aria-label="Zwiększ ilość"
            style="font-size:1rem;padding:0 4px"
          >+</button>
          <button
            class="cart-item__remove"
            onclick="removeFromCart(${index})"
            style="margin-left:auto"
          >Usuń</button>
        </div>
      </div>
    `;
    // Wstaw przed empty state
    itemsEl.appendChild(div);
  });
}

/* ============================================
   CART ACTIONS
============================================ */
function addToCart(name, price, img) {
  const defaultImg =
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=160&q=60';
  const itemImg = img || defaultImg;

  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, img: itemImg, qty: 1 });
  }

  saveCart();
  updateCartUI();
  openCart();
  showToast(`„${name}" dodano do koszyka`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartUI();
}

/* ============================================
   TOAST NOTIFICATION
============================================ */
function showToast(message) {
  // Usuń poprzedni toast jeśli istnieje
  const existing = document.getElementById('toastNotif');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toastNotif';
  toast.textContent = message;
  Object.assign(toast.style, {
    position:       'fixed',
    bottom:         '2rem',
    left:           '50%',
    transform:      'translateX(-50%) translateY(20px)',
    background:     'var(--ink)',
    color:          'var(--cream)',
    padding:        '12px 28px',
    fontSize:       '0.8rem',
    letterSpacing:  '0.1em',
    zIndex:         '9998',
    opacity:        '0',
    transition:     'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    whiteSpace:     'nowrap',
    pointerEvents:  'none',
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 2800);
}

/* ============================================
   CART DRAWER OPEN / CLOSE
============================================ */
function openCart() {
  const overlay = document.getElementById('cartOverlay');
  const drawer  = document.getElementById('cartDrawer');
  if (!overlay || !drawer) return;

  overlay.classList.add('open');
  drawer.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const overlay = document.getElementById('cartOverlay');
  const drawer  = document.getElementById('cartDrawer');
  if (!overlay || !drawer) return;

  overlay.classList.remove('open');
  drawer.classList.remove('open');
  document.body.style.overflow = '';
}

/* ============================================
   NAVIGATION SCROLL EFFECT
============================================ */
function initNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  // Jeśli nav ma już klasę .scrolled (strony wewnętrzne) — nic nie rób
  if (nav.classList.contains('scrolled')) return;

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================
   MOBILE MENU
============================================ */
function closeMobile() {
  const menu   = document.getElementById('mobileMenu');
  const burger = document.getElementById('hamburger');
  if (menu)   menu.classList.remove('open');
  if (burger) burger.classList.remove('active');
  document.body.style.overflow = '';
}

function initMobileMenu() {
  const burger = document.getElementById('hamburger');
  const menu   = document.getElementById('mobileMenu');
  if (!burger || !menu) return;

  burger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    burger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
}

/* ============================================
   SCROLL REVEAL
============================================ */
function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  els.forEach(el => observer.observe(el));
}

/* ============================================
   EDITORIAL PARALLAX TRIGGER
============================================ */
function initEditorial() {
  const editorial = document.querySelector('.editorial');
  if (!editorial) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      editorial.classList.toggle('in-view', entry.isIntersecting);
    },
    { threshold: 0.2 }
  );

  observer.observe(editorial);
}

/* ============================================
   FEATURED DRAG SLIDER
============================================ */
function initSlider() {
  const track = document.getElementById('featuredTrack');
  if (!track) return;

  let isDragging  = false;
  let startX      = 0;
  let scrollStart = 0;

  const wrapper = track.parentElement;

  track.addEventListener('mousedown', e => {
    isDragging  = true;
    startX      = e.pageX - track.offsetLeft;
    scrollStart = wrapper.scrollLeft;
    track.style.cursor = 'grabbing';
  });

  track.addEventListener('mouseleave', () => {
    isDragging = false;
    track.style.cursor = 'grab';
  });

  track.addEventListener('mouseup', () => {
    isDragging = false;
    track.style.cursor = 'grab';
  });

  track.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x    = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    wrapper.scrollLeft = scrollStart - walk;
  });

  // Touch support
  let touchStartX    = 0;
  let touchScrollStart = 0;

  track.addEventListener('touchstart', e => {
    touchStartX     = e.touches[0].pageX;
    touchScrollStart = wrapper.scrollLeft;
  }, { passive: true });

  track.addEventListener('touchmove', e => {
    const x    = e.touches[0].pageX;
    const walk = (x - touchStartX) * 1.2;
    wrapper.scrollLeft = touchScrollStart - walk;
  }, { passive: true });
}

/* ============================================
   INSTAGRAM GRID HOVER
============================================ */
function initInstaHover() {
  document.querySelectorAll('[data-insta-img]').forEach(a => {
    const img = a.querySelector('img');
    if (!img) return;
    a.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.08)';
    });
    a.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });
}

/* ============================================
   PAGE TRANSITION (wyjście)
============================================ */
function initPageTransitions() {
  const overlay = document.getElementById('pageTransition');
  if (!overlay) return;

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');

    // Tylko linki wewnętrzne .html
    if (!href || href.startsWith('#') ||
        href.startsWith('http') || href.startsWith('mailto')) return;

    link.addEventListener('click', e => {
      e.preventDefault();

      overlay.style.transition =
        'transform 0.55s cubic-bezier(0.76, 0, 0.24, 1)';
      overlay.style.transformOrigin = 'bottom';
      overlay.style.transform = 'scaleY(1)';

      setTimeout(() => {
        window.location.href = href;
      }, 550);
    });
  });

  // Wejście na stronę — schowanie overlay
  window.addEventListener('load', () => {
    overlay.style.transformOrigin = 'top';
    overlay.style.transition =
      'transform 0.65s cubic-bezier(0.76, 0, 0.24, 1)';
    overlay.style.transform = 'scaleY(0)';
  });
}

/* ============================================
   CURSOR CUSTOM (desktop)
============================================ */
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.id = 'customCursor';
  Object.assign(cursor.style, {
    position:     'fixed',
    width:        '8px',
    height:       '8px',
    background:   'var(--gold)',
    borderRadius: '50%',
    pointerEvents:'none',
    zIndex:       '99999',
    transform:    'translate(-50%, -50%)',
    transition:   'width 0.3s, height 0.3s, opacity 0.3s',
    opacity:      '0',
  });

  const cursorRing = document.createElement('div');
  cursorRing.id = 'customCursorRing';
  Object.assign(cursorRing.style, {
    position:     'fixed',
    width:        '32px',
    height:       '32px',
    border:       '1px solid rgba(184, 150, 90, 0.5)',
    borderRadius: '50%',
    pointerEvents:'none',
    zIndex:       '99998',
    transform:    'translate(-50%, -50%)',
    transition:   'width 0.4s, height 0.4s, left 0.12s, top 0.12s, opacity 0.3s',
    opacity:      '0',
  });

  document.body.appendChild(cursor);
  document.body.appendChild(cursorRing);

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.opacity      = '1';
    cursorRing.style.opacity  = '1';
    cursor.style.left         = mouseX + 'px';
    cursor.style.top          = mouseY + 'px';
    cursorRing.style.left     = mouseX + 'px';
    cursorRing.style.top      = mouseY + 'px';
  });

  // Powiększ kursor na klikalnych elementach
  const hoverTargets = 'a, button, .product-card, .featured__slide, .filter-btn';

  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width       = '14px';
      cursor.style.height      = '14px';
      cursorRing.style.width   = '50px';
      cursorRing.style.height  = '50px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width       = '8px';
      cursor.style.height      = '8px';
      cursorRing.style.width   = '32px';
      cursorRing.style.height  = '32px';
    });
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity     = '0';
    cursorRing.style.opacity = '0';
  });
}

/* ============================================
   SMOOTH SCROLL dla anchor linków
============================================ */
function initSmoothAnchor() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ============================================
   INIT ALL
============================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Cart
  const cartToggle = document.getElementById('cartToggle');
  const cartClose  = document.getElementById('cartClose');
  const cartOverlay = document.getElementById('cartOverlay');

  if (cartToggle)  cartToggle.addEventListener('click', openCart);
  if (cartClose)   cartClose.addEventListener('click', closeCart);
  if (cartOverlay) {
    cartOverlay.addEventListener('click', e => {
      if (e.target === cartOverlay) closeCart();
    });
  }

  // ESC zamyka wszystko
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeCart();
      closeMobile();

      // Zamknij modals (products page)
      document.querySelectorAll('.modal-overlay.open').forEach(m => {
        m.classList.remove('open');
      });
      document.body.style.overflow = '';
    }
  });

  // Inicjalizacje
  updateCartUI();
  initNav();
  initMobileMenu();
  initReveal();
  initEditorial();
  initSlider();
  initPageTransitions();
  initCursor();
  initSmoothAnchor();
  initInstaHover();
});
