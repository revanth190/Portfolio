/* ── LOADING SCREEN ─────────────────────────────── */
(function() {
  const loader   = document.getElementById('loader');
  const bar      = document.getElementById('loader-bar');
  const txt      = document.getElementById('loader-text');
  if (!loader) return;

  const steps = [
    { pct: 20,  label: 'Loading assets...'   },
    { pct: 45,  label: 'Building UI...'       },
    { pct: 70,  label: 'Almost ready...'      },
    { pct: 90,  label: 'Final touches...'     },
    { pct: 100, label: 'Welcome!'             },
  ];

  let i = 0;
  // Prevent body scroll while loading
  document.body.style.overflow = 'hidden';

  function step() {
    if (i >= steps.length) return;
    const s = steps[i++];
    bar.style.width = s.pct + '%';
    txt.textContent  = s.label;
    if (i < steps.length) {
      setTimeout(step, i === 1 ? 280 : 320);
    } else {
      // Done — wait a beat then fade out
      setTimeout(() => {
        loader.classList.add('done');
        document.body.style.overflow = '';
        // Remove from DOM after transition
        loader.addEventListener('transitionend', () => loader.remove(), { once: true });
      }, 400);
    }
  }

  // Kick off after a tiny delay so paint happens first
  setTimeout(step, 120);
})();

/* Portfolio Interactions */

// Custom cursor
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
if (cursor && follower) {
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx-4}px,${my-4}px)`;
  });
  (function af() {
    fx += (mx - fx) * .12; fy += (my - fy) * .12;
    follower.style.transform = `translate(${fx-14}px,${fy-14}px)`;
    requestAnimationFrame(af);
  })();
  document.querySelectorAll('a,button,.pcard,.channel,.skill-card,.ach-card').forEach(el => {
    el.addEventListener('mouseenter', () => { follower.style.width = '48px'; follower.style.height = '48px'; follower.style.borderColor = 'rgba(79,70,229,.6)'; });
    el.addEventListener('mouseleave', () => { follower.style.width = '28px'; follower.style.height = '28px'; follower.style.borderColor = 'rgba(79,70,229,.3)'; });
  });
}

// Navbar on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile menu
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}));

// Scroll reveal with stagger
const ro = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    setTimeout(() => entry.target.classList.add('visible'), +(entry.target.dataset.delay||0));
    ro.unobserve(entry.target);
  });
}, { rootMargin: '0px 0px -70px 0px', threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  const siblings = [...(el.parentElement?.querySelectorAll('.reveal') || [])];
  const idx = siblings.indexOf(el);
  el.dataset.delay = idx * 90;
  ro.observe(el);
});

// Form
const form = document.getElementById('cform');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.cform-btn');
    const orig = btn.innerHTML;
    btn.innerHTML = 'Message Sent ✓';
    btn.style.background = '#10b981';
    form.reset();
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; }, 3000);
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});
