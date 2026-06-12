/* ============================================================
   PRATANI CREATIVE — Global JavaScript
   PT Pratani Kreatif Group
   Version: 2.0

   TABLE OF CONTENTS:
   01. DOM Ready
   02. Navbar Injection (Single Source of Truth)
   03. Navigation (Scroll + Hamburger + Active Link)
   04. Intersection Observer (Reveal Animations)
   05. Counter Animation (Stats)
   06. Smooth Scroll
   07. Portfolio Filter
   08. Utilities
   ============================================================ */


/* ============================================================
   01. DOM READY
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();        // inject navbar dulu sebelum yang lain
  initNavScroll();
  initHamburger();
  initReveal();
  initCounters();
  initSmoothScroll();
  initPortfolioFilter();
});


/* ============================================================
   02. NAVBAR INJECTION — SINGLE SOURCE OF TRUTH
   ============================================================
   Cara pakai di setiap halaman HTML:
   Ganti seluruh blok <div class="topbar">...</div> dan
   <nav class="navbar">...</nav> + mobile menu dengan:

   <div id="nav-placeholder"></div>

   Untuk nambah/hapus link navbar, cukup edit array
   NAV_LINKS atau BRAND_LINKS di bawah ini. Semua halaman
   langsung ikut update otomatis.
   ============================================================ */

const NAV_LINKS = [
  { href: '/index.html',         label: 'Home' },
  { href: '/tentang.html',       label: 'Tentang' },
  { href: '/portfolio.html',     label: 'Portfolio' },
  { href: '/artikel/index.html', label: 'Artikel' },
  { href: '/link.html',          label: 'Link' },
];

const BRAND_LINKS = [
  { href: '/brand/kolektiva.html', label: 'Kolektiva', brand: 'kolektiva' },
  { href: '/brand/dikopi.html',    label: 'Dikopi',    brand: 'dikopi' },
  { href: '/brand/imagineer.html', label: 'Imagineer', brand: 'imagineer' },
];

const CONTACT = {
  wa:        'https://wa.me/6285172107815',
  waDisplay: '0851-7210-7815',
  ig:        'https://instagram.com/pt.pratani_creative',
  igHandle:  '@pt.pratani_creative',
  legal:     'AHU-053343.AH.01.30.Tahun 2025',
};

function initNavbar() {
  const placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  // --- Active link detection ---
  const currentPath = window.location.pathname;
  const norm = (p) =>
    p.replace(/\/$/, '')
     .toLowerCase()
     .replace(/\/index\.html$/, '/')
     || '/';
  const current = norm(currentPath);

  const isActive = (href) => {
    const normalized = norm(href);
    // root match
    if ((current === '/' || current === '') && (normalized === '/' || normalized === '')) return true;
    return current === normalized;
  };

  // --- Build desktop nav links ---
  const desktopLinksHTML = NAV_LINKS.map(l => `
    <li>
      <a href="${l.href}" class="navbar__link ${isActive(l.href) ? 'active' : ''}">
        ${l.label}
      </a>
    </li>
  `).join('');

  // --- Build brand dropdown ---
  const dropdownItemsHTML = BRAND_LINKS.map(l => `
    <a href="${l.href}" class="navbar__dropdown-item" role="menuitem">
      <span class="navbar__dropdown-dot" style="background: var(--${l.brand});" aria-hidden="true"></span>
      ${l.label}
    </a>
  `).join('');

  const isBrandActive = BRAND_LINKS.some(l => isActive(l.href));

  // --- Build mobile nav links ---
  const mobileLinksHTML = [
    ...NAV_LINKS,
    { href: '/brand/index.html', label: 'Brand' },
  ].map(l => `
    <a href="${l.href}" class="navbar__mobile-link ${isActive(l.href) ? 'active' : ''}">
      ${l.label}
    </a>
  `).join('');

  // --- Full HTML ---
  placeholder.innerHTML = `
    <!-- TOPBAR -->
    <div class="topbar" role="banner">
      <div class="topbar__inner">
        <div class="topbar__left">
          <span class="topbar__tag">PT Pratani Kreatif Group</span>
          <span class="topbar__dot" aria-hidden="true"></span>
          <span class="topbar__tag">${CONTACT.legal}</span>
        </div>
        <div class="topbar__right">
          <a href="${CONTACT.wa}" class="topbar__link" target="_blank" rel="noopener">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.42 2 2 0 0 1 3.55 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6 6l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/>
            </svg>
            ${CONTACT.waDisplay}
          </a>
          <span class="topbar__dot" aria-hidden="true"></span>
          <a href="${CONTACT.ig}" class="topbar__link" target="_blank" rel="noopener">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            ${CONTACT.igHandle}
          </a>
        </div>
      </div>
    </div>

    <!-- NAVBAR -->
    <nav class="navbar" aria-label="Navigasi utama">
      <div class="navbar__inner">

        <a href="/index.html" class="navbar__logo" aria-label="Pratani Creative — Beranda">
          <div class="navbar__logo-mark" aria-hidden="true">P</div>
          <div class="navbar__logo-text">
            <span class="navbar__logo-name">Pratani</span>
            <span class="navbar__logo-sub">Creative</span>
          </div>
        </a>

        <ul class="navbar__nav" role="list">
          ${desktopLinksHTML}
          <li class="navbar__dropdown">
            <a href="/brand/index.html" class="navbar__link navbar__dropdown-toggle ${isBrandActive ? 'active' : ''}">
              Brand
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </a>
            <div class="navbar__dropdown-menu" role="menu">
              ${dropdownItemsHTML}
            </div>
          </li>
        </ul>

        <a href="/kontak.html" class="btn btn-primary btn-sm navbar__cta">
          Hubungi Kami
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>

        <button class="navbar__hamburger" aria-label="Buka menu" aria-expanded="false" aria-controls="mobile-menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>

    <!-- MOBILE MENU -->
    <nav class="navbar__mobile-menu" id="mobile-menu" aria-label="Menu mobile">
      ${mobileLinksHTML}
      <div style="margin-top: 2rem;">
        <a href="/kontak.html" class="btn btn-primary btn-lg" style="width: 100%; justify-content: center;">
          Hubungi Kami →
        </a>
      </div>
      <div style="margin-top: auto; padding-top: 2rem; display: flex; flex-direction: column; gap: 0.5rem;">
        <a href="${CONTACT.wa}" class="topbar__link" style="font-size: 0.8rem;">
          📱 ${CONTACT.waDisplay}
        </a>
        <a href="${CONTACT.ig}" class="topbar__link" style="font-size: 0.8rem;">
          ${CONTACT.igHandle}
        </a>
      </div>
    </nav>
  `;
}


/* ============================================================
   03. NAVIGATION — SCROLL + HAMBURGER
   ============================================================ */

function initNavScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const threshold = 20;

  const onScroll = () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > threshold);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initHamburger() {
  const hamburger  = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');
  if (!hamburger || !mobileMenu) return;

  const toggle = (forceClose = false) => {
    const isOpen = hamburger.classList.contains('open');

    if (forceClose || isOpen) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    } else {
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
    }
  };

  hamburger.addEventListener('click', () => toggle());

  mobileMenu.querySelectorAll('.navbar__mobile-link').forEach(link => {
    link.addEventListener('click', () => toggle(true));
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      toggle(true);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggle(true);
  });
}


/* ============================================================
   04. INTERSECTION OBSERVER — REVEAL
   ============================================================ */

function initReveal() {
  const revealEls  = document.querySelectorAll('[data-reveal]');
  const staggerEls = document.querySelectorAll('[data-reveal-stagger]');

  if (!revealEls.length && !staggerEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
  });

  revealEls.forEach(el  => observer.observe(el));
  staggerEls.forEach(el => observer.observe(el));
}


/* ============================================================
   05. COUNTER ANIMATION
   ============================================================ */

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const animateCounter = (el) => {
    const target   = parseFloat(el.dataset.count);
    const duration = parseInt(el.dataset.countDuration || '1800');
    const suffix   = el.dataset.countSuffix || '';
    const prefix   = el.dataset.countPrefix || '';
    const decimals = (target % 1 !== 0) ? 1 : 0;

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current  = easeOut(progress) * target;

      el.textContent = prefix + current.toFixed(decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toFixed(decimals) + suffix;
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}


/* ============================================================
   06. SMOOTH SCROLL
   ============================================================ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      e.preventDefault();

      const navTotal = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-total') || '100'
      );

      const targetY = target.getBoundingClientRect().top + window.scrollY - navTotal - 16;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });
}


/* ============================================================
   07. PORTFOLIO FILTER
   ============================================================ */

function initPortfolioFilter() {
  const filterBtns  = document.querySelectorAll('[data-filter]');
  const filterItems = document.querySelectorAll('[data-brand-filter]');

  if (!filterBtns.length || !filterItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      filterItems.forEach(item => {
        const brand = item.dataset.brandFilter;
        const show  = filter === 'all' || brand === filter;

        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        if (show) {
          item.style.opacity   = '1';
          item.style.transform = 'scale(1)';
          item.style.display   = '';
        } else {
          item.style.opacity   = '0';
          item.style.transform = 'scale(0.96)';
          setTimeout(() => {
            if (item.dataset.brandFilter !== filter && filter !== 'all') {
              item.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
}


/* ============================================================
   08. UTILITIES
   ============================================================ */

function debounce(fn, delay = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function formatNumber(n) {
  return n.toLocaleString('id-ID');
}

function copyToClipboard(text, feedbackEl) {
  navigator.clipboard.writeText(text).then(() => {
    if (!feedbackEl) return;
    const original = feedbackEl.textContent;
    feedbackEl.textContent = 'Tersalin!';
    setTimeout(() => { feedbackEl.textContent = original; }, 2000);
  });
}

window.PrataniUtils = { debounce, formatNumber, copyToClipboard };
