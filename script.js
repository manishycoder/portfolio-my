const navbar = document.querySelector('.navbar');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const typedRole = document.getElementById('typedRole');
const yearEl = document.getElementById('year');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');

const roles = ['MERN Stack Developer', 'Frontend Developer', 'Full Stack Web Developer'];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const current = roles[roleIndex];

  if (!deleting && charIndex < current.length) {
    charIndex += 1;
    typedRole.textContent = current.slice(0, charIndex);
    setTimeout(typeEffect, 80);
    return;
  }

  if (!deleting && charIndex === current.length) {
    deleting = true;
    setTimeout(typeEffect, 2000);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    typedRole.textContent = current.slice(0, charIndex);
    setTimeout(typeEffect, 40);
    return;
  }

  deleting = false;
  roleIndex = (roleIndex + 1) % roles.length;
  setTimeout(typeEffect, 120);
}

typeEffect();
yearEl.textContent = new Date().getFullYear();

function toggleMenu(forceClose = false) {
  const shouldOpen = forceClose ? false : !mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open', shouldOpen);
  menuToggle.classList.toggle('open', shouldOpen);
  menuToggle.setAttribute('aria-expanded', String(shouldOpen));
  document.body.style.overflow = shouldOpen ? 'hidden' : '';
}

menuToggle?.addEventListener('click', () => toggleMenu());
document.querySelectorAll('.mobile-menu a').forEach((link) => {
  link.addEventListener('click', () => toggleMenu(true));
});

document.querySelectorAll('.nav-links a, .mobile-menu a').forEach((anchor) => {
  anchor.addEventListener('click', () => {
    const href = anchor.getAttribute('href');
    if (!href?.startsWith('#')) return;
    const target = document.querySelector(href);
    if (!target) return;
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 10);
  });
});

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navAnchors.forEach((item) => item.classList.remove('active'));
      document.querySelector(`.nav-links a[href="#${id}"]`)?.classList.add('active');
    }
  });
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert("Thank you for your message! I'll get back to you soon.");
  contactForm.reset();
});

const revealItems = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.counter');
const skillBars = document.querySelectorAll('.skill-bar-fill');
let statsStarted = false;
let skillsStarted = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('visible');

    if (entry.target.id === 'about' && !statsStarted) {
      statsStarted = true;
      counters.forEach((counter) => animateCounter(counter));
    }

    if (entry.target.id === 'skills' && !skillsStarted) {
      skillsStarted = true;
      skillBars.forEach((bar) => {
        bar.style.width = bar.dataset.width || '0%';
      });
    }
  });
}, { threshold: 0.15 });

revealItems.forEach((item) => observer.observe(item));

function animateCounter(counter) {
  const target = Number(counter.dataset.target || 0);
  let count = 0;
  const step = Math.max(1, Math.ceil(target / 40));

  const timer = setInterval(() => {
    count += step;
    if (count >= target) {
      counter.textContent = `${target}+`;
      clearInterval(timer);
    } else {
      counter.textContent = `${count}+`;
    }
  }, 35);
}
