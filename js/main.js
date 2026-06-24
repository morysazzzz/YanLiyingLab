/* YanLab — main.js */

// ── Language switching ──────────────────────────────────────────
const LANG_KEY = 'yanlab-lang';

function setLang(lang) {
  document.body.classList.remove('lang-zh', 'lang-en');
  document.body.classList.add('lang-' + lang);
  localStorage.setItem(LANG_KEY, lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // update page title
  const titles = { zh: 'YanLab · 闫丽盈实验室', en: 'YanLab · Prof. Liying Yan\'s Lab' };
  document.title = titles[lang] || document.title;
}

function initLang() {
  const saved = localStorage.getItem(LANG_KEY);
  // detect browser language, fall back to zh
  const browserLang = navigator.language.startsWith('zh') ? 'zh' : 'en';
  const lang = saved || browserLang;
  setLang(lang);
}

// ── Navigation ──────────────────────────────────────────────────
function initNav() {
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // highlight active nav link based on current page
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === 'index.html' && href === '#home')) {
      link.classList.add('active');
    }
  });

  // shrink navbar on scroll (index page only)
  if (current === 'index.html' || current === '') {
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('.navbar');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }
}

// ── Scroll reveal ───────────────────────────────────────────────
function initReveal() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Stats counter animation ─────────────────────────────────────
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initCounters() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = '1';
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.count-up').forEach(el => observer.observe(el));
}

// ── Boot ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initNav();
  initReveal();
  initCounters();

  // wire lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
});
