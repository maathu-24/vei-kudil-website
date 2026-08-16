const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');
const navbar = document.querySelector('.navbar');
const scrollProgress = document.getElementById('scrollProgress');

// Scroll progress bar + navbar shrink-on-scroll
function handleScrollEffects() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (scrollProgress) scrollProgress.style.width = progress + '%';
  if (navbar) navbar.classList.toggle('scrolled', scrollTop > 40);
}

window.addEventListener('scroll', handleScrollEffects);
handleScrollEffects();

menuBtn?.addEventListener('click', () => {
  const isOpen = nav.style.display === 'flex';

  nav.style.display = isOpen ? 'none' : 'flex';
  menuBtn.setAttribute('aria-expanded', String(!isOpen));

  if (!isOpen) {
    nav.style.position = 'absolute';
    nav.style.top = '78px';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.padding = '20px';
    nav.style.flexDirection = 'column';
    nav.style.background = '#07180c';
    nav.style.gap = '18px';
  }
});

// Close mobile menu after selecting a link
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      nav.style.display = 'none';
      menuBtn?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Scroll reveal animation
const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

revealItems.forEach(item => revealObserver.observe(item));

// Gentle 3D mouse parallax on desktop
const hero = document.querySelector('.hero');
const parallaxItems = document.querySelectorAll('.parallax-item');

hero?.addEventListener('mousemove', (event) => {
  if (window.innerWidth <= 900) return;

  const rect = hero.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  parallaxItems.forEach(item => {
    const speed = Number(item.dataset.speed || 0.05);
    item.style.transform = `translate3d(${x * speed * 220}px, ${y * speed * 220}px, 0)`;
  });
});

hero?.addEventListener('mouseleave', () => {
  parallaxItems.forEach(item => {
    item.style.transform = '';
  });
});

// Small 3D tilt effect for the About card
const tiltCard = document.querySelector('.tilt-card');

tiltCard?.addEventListener('mousemove', (event) => {
  if (window.innerWidth <= 900) return;

  const rect = tiltCard.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;

  const rotateX = (0.5 - y) * 7;
  const rotateY = (x - 0.5) * 7;

  tiltCard.style.transform =
    `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

tiltCard?.addEventListener('mouseleave', () => {
  tiltCard.style.transform = '';
});
