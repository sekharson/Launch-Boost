/* =============================================
   LaunchBoost — Main JavaScript
   ============================================= */

/* ── Page Loader ──────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1400);
});

/* ── Navbar: scroll detection ─────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ── Mobile Menu Toggle ───────────────────── */
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});
// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

/* ── Dark Mode ────────────────────────────── */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = themeToggle.querySelector('i');

// Respect system preference
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeIcon.classList.toggle('fa-moon', !isDark);
  themeIcon.classList.toggle('fa-sun', isDark);
});

/* ── Scroll Progress Bar ──────────────────── */
window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop;
  const height    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct       = (winScroll / height) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
});

/* ── Active Nav Link ──────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-links a[href^="#"]');

const activeLinkObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => activeLinkObserver.observe(s));

/* ── Counter Animation ────────────────────── */
function animateCounter(el) {
  const target = +el.getAttribute('data-target');
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }
  }, step);
}

// Trigger counters when visible
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

// Both stat counters and hero metrics
document.querySelectorAll('.counter, .metric-num').forEach(el => {
  counterObserver.observe(el);
});

/* ── Hero metric animation (data-target) ─── */
document.querySelectorAll('.metric-num').forEach(el => {
  if (!el.hasAttribute('data-target')) return;
  const orig = el.textContent;
  el.textContent = '0';
});

/* ── FAQ Accordion ────────────────────────── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-question.active').forEach(b => {
      b.classList.remove('active');
      b.nextElementSibling.style.maxHeight = null;
    });

    if (!isOpen) {
      btn.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

/* ── Growth Calculator ────────────────────── */
function calculateGrowth() {
  const visitors   = parseFloat(document.getElementById('visitors').value);
  const conversion = parseFloat(document.getElementById('conversion').value);
  const revenue    = parseFloat(document.getElementById('revenue').value);

  if (!visitors || !conversion || !revenue) {
    alert('Please fill in all three fields to calculate.');
    return;
  }
  if (conversion > 100 || conversion <= 0) {
    alert('Please enter a valid conversion rate between 0.1 and 100.');
    return;
  }

  const customers      = Math.round(visitors * (conversion / 100));
  const monthlyRevenue = customers * revenue;
  const annualRevenue  = monthlyRevenue * 12;
  const potentialLift  = Math.round(annualRevenue * 0.35);

  const fmt = n => '₹' + n.toLocaleString('en-IN');

  const resultEl = document.getElementById('result');
  resultEl.innerHTML = `
    <strong>📊 Your Growth Projection</strong><br/>
    <br/>
    👥 <strong>Expected Customers / Month:</strong> ${customers.toLocaleString()}<br/>
    💰 <strong>Monthly Revenue Potential:</strong> ${fmt(monthlyRevenue)}<br/>
    📅 <strong>Annual Revenue Potential:</strong> ${fmt(annualRevenue)}<br/>
    🚀 <strong>Additional Revenue with LaunchBoost (est. +35%):</strong> ${fmt(potentialLift)}/yr
  `;
  resultEl.classList.add('visible');
}

/* ── Back to Top ──────────────────────────── */
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('visible', window.scrollY > 400);
});
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Contact Form ─────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name    = document.getElementById('fname').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const startup = document.getElementById('fstartup').value.trim();
    const msgEl   = document.getElementById('form-msg');

    if (!name || !email || !startup) {
      msgEl.style.color = '#ef4444';
      msgEl.textContent = '⚠ Please fill in all required fields.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msgEl.style.color = '#ef4444';
      msgEl.textContent = '⚠ Please enter a valid email address.';
      return;
    }

    msgEl.style.color = '#10b981';
    msgEl.textContent = '✅ Thank you! We\'ll reach out within 24 hours with your custom growth plan.';
    contactForm.reset();
  });
}

/* ── Newsletter Subscribe ─────────────────── */
function subscribeNewsletter() {
  const input = document.getElementById('newsEmail');
  const email = input.value.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  alert(`🎉 You're subscribed! Growth tips are on their way to ${email}.`);
  input.value = '';
}

/* ── Scroll Reveal (Intersection Observer) ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.stage-card, .case-card, .testi-card, .team-card, .journey-step, .pain-item, .solution-item, .price-card, .stat-box'
).forEach(el => revealObserver.observe(el));
