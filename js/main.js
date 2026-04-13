/**
 * Aaron Woods Portfolio — Main JavaScript
 * Features: dark/light mode, scroll reveal, navbar behavior,
 * mobile menu, active nav tracking, cursor effects, counters
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   DARK / LIGHT MODE
   ═══════════════════════════════════════════════════════════ */
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  if (theme === 'dark') {
    html.classList.add('dark');
    themeIcon.className = 'fas fa-sun text-yellow-400';
  } else {
    html.classList.remove('dark');
    themeIcon.className = 'fas fa-moon text-gray-500';
  }
  localStorage.setItem('theme', theme);
}

// Init theme
applyTheme(getPreferredTheme());

// Toggle
themeToggle.addEventListener('click', () => {
  const isDark = html.classList.contains('dark');
  applyTheme(isDark ? 'light' : 'dark');

  // Ripple animation on toggle button
  themeToggle.style.transform = 'scale(0.85)';
  setTimeout(() => { themeToggle.style.transform = ''; }, 150);
});

/* ═══════════════════════════════════════════════════════════
   NAVBAR SCROLL BEHAVIOR
   ═══════════════════════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

function handleNavbar() {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Hide on scroll down, show on scroll up (only past the fold)
  if (currentScrollY > 300) {
    if (currentScrollY > lastScrollY + 5) {
      navbar.style.transform = 'translateY(-100%)';
    } else if (lastScrollY > currentScrollY + 2) {
      navbar.style.transform = 'translateY(0)';
    }
  } else {
    navbar.style.transform = 'translateY(0)';
  }

  lastScrollY = currentScrollY;
}

window.addEventListener('scroll', handleNavbar, { passive: true });

/* ═══════════════════════════════════════════════════════════
   ACTIVE NAV SECTION TRACKING
   ═══════════════════════════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ═══════════════════════════════════════════════════════════
   MOBILE MENU
   ═══════════════════════════════════════════════════════════ */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileMenuBtn.addEventListener('click', () => {
  const isHidden = mobileMenu.classList.contains('hidden');
  if (isHidden) {
    mobileMenu.classList.remove('hidden');
    mobileMenu.style.maxHeight = '0';
    mobileMenu.style.overflow = 'hidden';
    mobileMenu.style.transition = 'max-height 0.3s ease';
    setTimeout(() => { mobileMenu.style.maxHeight = '400px'; }, 10);
    mobileMenuBtn.innerHTML = '<i class="fas fa-times text-sm dark:text-gray-300 text-gray-700"></i>';
  } else {
    mobileMenu.style.maxHeight = '0';
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
      mobileMenu.style.maxHeight = '';
    }, 300);
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-sm dark:text-gray-300 text-gray-700"></i>';
  }
});

// Close mobile menu on link click
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.style.maxHeight = '0';
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
      mobileMenu.style.maxHeight = '';
    }, 300);
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-sm dark:text-gray-300 text-gray-700"></i>';
  });
});

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════════════════════ */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger delay based on sibling index
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const siblingIndex = siblings.indexOf(entry.target);
      const delay = Math.min(siblingIndex * 80, 400);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ═══════════════════════════════════════════════════════════
   ANIMATED STAT COUNTERS
   ═══════════════════════════════════════════════════════════ */
function animateCounter(element, target, suffix = '', duration = 1800) {
  const isFloat = target % 1 !== 0;
  let startTime = null;
  const startValue = 0;

  function update(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = startValue + (target - startValue) * eased;

    if (isFloat) {
      element.textContent = current.toFixed(1) + suffix;
    } else {
      element.textContent = Math.floor(current).toLocaleString() + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString() + suffix;
    }
  }

  requestAnimationFrame(update);
}

// Set up counter elements
const statData = [
  { selector: '.stat-card:nth-child(1) .text-3xl', value: 74, suffix: '%' },
  { selector: '.stat-card:nth-child(2) .text-3xl', value: 1500, suffix: '+' },
  { selector: '.stat-card:nth-child(3) .text-3xl', value: 80, suffix: '%' },
  { selector: '.stat-card:nth-child(4) .text-3xl', value: 5, suffix: '+' },
];

let countersTriggered = false;

const statsSection = document.querySelector('.stat-card');
if (statsSection) {
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersTriggered) {
      countersTriggered = true;
      statData.forEach(({ selector, value, suffix }) => {
        const el = document.querySelector(selector);
        if (el) {
          setTimeout(() => animateCounter(el, value, suffix), 200);
        }
      });
      counterObserver.disconnect();
    }
  }, { threshold: 0.3 });

  counterObserver.observe(statsSection.closest('section') || statsSection.parentElement);
}

/* ═══════════════════════════════════════════════════════════
   SMOOTH SCROLL FOR NAV LINKS
   ═══════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

/* ═══════════════════════════════════════════════════════════
   CURSOR GLOW EFFECT (desktop only)
   ═══════════════════════════════════════════════════════════ */
if (window.matchMedia('(pointer: fine)').matches) {
  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  // Smooth ring following
  function updateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    raf = requestAnimationFrame(updateRing);
  }
  updateRing();

  // Scale on hovering interactive elements
  const interactives = document.querySelectorAll('a, button, .project-card, .cert-card, .contact-card, .skill-group');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform = 'translate(-50%, -50%) scale(2)';
      ring.style.transform = 'translate(-50%, -50%) scale(1.5)';
      ring.style.borderColor = 'rgba(0, 212, 255, 0.7)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      ring.style.transform = 'translate(-50%, -50%) scale(1)';
      ring.style.borderColor = 'rgba(0, 212, 255, 0.4)';
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   TYPEWRITER EFFECT for tagline (optional enhancement)
   ═══════════════════════════════════════════════════════════ */
function typewrite(element, text, speed = 40, delay = 1200) {
  if (!element) return;
  const original = element.textContent;
  element.textContent = '';
  element.style.opacity = '1';

  let index = 0;
  setTimeout(() => {
    const interval = setInterval(() => {
      element.textContent += text[index];
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);
  }, delay);
}

/* ═══════════════════════════════════════════════════════════
   PARALLAX on hero glow (subtle)
   ═══════════════════════════════════════════════════════════ */
const heroGlow = document.querySelector('.hero-glow');
if (heroGlow) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const rate = scrolled * 0.3;
    heroGlow.style.transform = `translate(-50%, calc(-50% + ${rate}px))`;
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════
   CARD TILT EFFECT (subtle 3D on project cards)
   ═══════════════════════════════════════════════════════════ */
if (window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
      setTimeout(() => { card.style.transition = ''; }, 400);
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   GLITCH EFFECT on name (subtle, on hover)
   ═══════════════════════════════════════════════════════════ */
const heroName = document.querySelector('.hero-name');
if (heroName) {
  heroName.addEventListener('mouseenter', () => {
    heroName.style.filter = 'blur(0.5px)';
    setTimeout(() => { heroName.style.filter = ''; }, 80);
    setTimeout(() => { heroName.style.filter = 'blur(0.3px)'; }, 100);
    setTimeout(() => { heroName.style.filter = ''; }, 160);
  });
}

/* ═══════════════════════════════════════════════════════════
   TERMINAL TYPING in hero tagline
   ═══════════════════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  // Add terminal prefix to the tagline visually
  const taglineEl = document.querySelector('.hero-tagline p');
  if (taglineEl && window.innerWidth > 640) {
    const prefix = document.createElement('span');
    prefix.className = 'opacity-40 mr-1';
    prefix.style.fontFamily = 'JetBrains Mono, monospace';
    prefix.textContent = '> ';
    taglineEl.prepend(prefix);
  }

  // Animate timeline items on scroll with stagger
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 150);
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });
});

/* ═══════════════════════════════════════════════════════════
   PAGE LOADED INDICATOR
   ═══════════════════════════════════════════════════════════ */
window.addEventListener('load', () => {
  // Remove initial loading state if any
  document.body.style.opacity = '1';

  // Small progress bar at top
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px; z-index: 9999;
    background: linear-gradient(90deg, #00d4ff, #7c3aed);
    transition: width 0.4s ease, opacity 0.5s ease;
    width: 0;
  `;
  document.body.appendChild(bar);

  bar.style.width = '100%';
  setTimeout(() => {
    bar.style.opacity = '0';
    setTimeout(() => bar.remove(), 500);
  }, 600);
});

/* ═══════════════════════════════════════════════════════════
   KEYBOARD NAVIGATION SUPPORT
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('keydown', (e) => {
  // Escape closes mobile menu
  if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-sm dark:text-gray-300 text-gray-700"></i>';
  }
});

/* ═══════════════════════════════════════════════════════════
   COPY EMAIL ON CLICK
   ═══════════════════════════════════════════════════════════ */
const emailLink = document.querySelector('a[href^="mailto"]');
if (emailLink) {
  emailLink.addEventListener('click', (e) => {
    // Only copy if not a real mailto action (in case browser blocks it)
    try {
      navigator.clipboard.writeText('awoods134@gmail.com').then(() => {
        showToast('📋 Email copied to clipboard!');
      }).catch(() => {});
    } catch(err) {}
  });
}

/* ═══════════════════════════════════════════════════════════
   TOAST NOTIFICATION
   ═══════════════════════════════════════════════════════════ */
function showToast(message, duration = 2500) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: rgba(0, 212, 255, 0.15);
    color: #00d4ff;
    backdrop-filter: blur(12px);
    border: 1px solid rgba(0, 212, 255, 0.3);
    padding: 0.6rem 1.25rem;
    border-radius: 100px;
    font-size: 0.8rem;
    font-weight: 500;
    font-family: 'JetBrains Mono', monospace;
    z-index: 9999;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    white-space: nowrap;
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

console.log('%c Aaron Woods Portfolio ', 'background: #00d4ff; color: #000; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
console.log('%c Built with Genspark.ai + AWS Kiro ✨', 'color: #00d4ff; font-family: monospace;');
