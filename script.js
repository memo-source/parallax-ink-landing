/* ============================================================
   PARALLAX INK — Landing Page Scripts
   ============================================================ */

// ---- Navbar scroll effect ----
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.background = 'rgba(5, 45, 64, 0.97)';
    navbar.style.backdropFilter = 'blur(8px)';
  } else {
    navbar.style.background = '#052D40';
    navbar.style.backdropFilter = 'none';
  }
}, { passive: true });

// ---- Intersection Observer: fade-up animations ----
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px',
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = entry.target.dataset.delay || '0s';
      entry.target.classList.add('fade-up');
      animateOnScroll.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(
  '.pain-card, .solution-card, .testimonial-card, .stat-card, .process-step'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.dataset.delay = `${i * 0.08}s`;
  animateOnScroll.observe(el);
});

// ---- Form submission (WhatsApp redirect) ----
const form = document.getElementById('leadForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre   = document.getElementById('nombre').value.trim();
  const empresa  = document.getElementById('empresa').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const email    = document.getElementById('email').value.trim();
  const mensaje  = document.getElementById('mensaje').value.trim();

  if (!nombre || !empresa || !telefono || !email) {
    alert('Por favor completa los campos obligatorios.');
    return;
  }

  const waText = encodeURIComponent(
    `¡Hola! Me llamo *${nombre}* y represento a *${empresa}*.\n` +
    `📧 Email: ${email}\n` +
    `📱 Teléfono: ${telefono}\n` +
    (mensaje ? `\n💬 ${mensaje}\n` : '') +
    `\nMe interesa el *Marketing Growth Strategy para PyMES*. ¿Podemos agendar un diagnóstico?`
  );

  window.open(`https://wa.me/5215539814438?text=${waText}`, '_blank');
});

// ---- Timeline animation ----
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const steps = entry.target.querySelectorAll('.timeline-step');
      steps.forEach((step, i) => {
        setTimeout(() => step.classList.add('visible'), i * 300);
      });
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

const timeline = document.querySelector('.timeline__steps');
if (timeline) {
  timeline.querySelectorAll('.timeline-step').forEach(step => step.classList.add('timeline-anim'));
  timelineObserver.observe(timeline);
} else {
  document.querySelectorAll('.timeline-step').forEach(s => s.classList.add('visible'));
}

// ---- WhatsApp float pulse ----
const waFloat = document.querySelector('.whatsapp-float');
let pulseTimeout;

function startPulse() {
  pulseTimeout = setTimeout(() => {
    waFloat.style.animation = 'waPulse 0.6s ease 3';
    waFloat.addEventListener('animationend', () => {
      waFloat.style.animation = '';
      startPulse();
    }, { once: true });
  }, 8000);
}

const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
  @keyframes waPulse {
    0%,100% { transform: scale(1); box-shadow: 0 6px 28px rgba(37,211,102,0.45); }
    50%      { transform: scale(1.08); box-shadow: 0 10px 40px rgba(37,211,102,0.7); }
  }
`;
document.head.appendChild(pulseStyle);
startPulse();
