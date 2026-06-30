// ============================================
// MSM ANODIZADOS — main.js
// ============================================

const WA_NUMBER = '522222397708';
const WA_MESSAGE = 'Hola, me interesa información sobre anodizado';

document.addEventListener('DOMContentLoaded', () => {

  // ---- Inyectar número real de WhatsApp en todos los enlaces wa.me ----
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
  document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
    if (a.id === 'waFloat' || a.textContent.includes('WhatsApp')) {
      a.href = waUrl;
    }
  });
  const phoneLink = document.querySelector('.contact-info-item a[href^="https://wa.me"]');
  if (phoneLink) phoneLink.href = `https://wa.me/${WA_NUMBER}`;

  // ---- Año dinámico en footer ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Header: ocultar al bajar, mostrar al subir ----
  const header = document.getElementById('siteHeader');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 140 && current > lastScroll) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }
    lastScroll = current;
  }, { passive: true });

  // ---- Menú móvil ----
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.textContent = isOpen ? '✕' : '☰';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navToggle.textContent = '☰';
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ---- Formulario de contacto → WhatsApp directo ----
  const form = document.getElementById('contactForm');

  const procesoLabels = {
    natural:        'Anodizado natural',
    color:          'Anodizado a color',
    electrostatico: 'Recubrimiento electrostático',
    'no-seguro':    'No estoy seguro'
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre   = form.nombre.value.trim()   || 'No especificado';
      const email    = form.email.value.trim()     || 'No especificado';
      const telefono = form.telefono.value.trim()  || 'No especificado';
      const proceso  = procesoLabels[form.proceso.value] || form.proceso.value;
      const mensaje  = form.mensaje.value.trim()   || 'No especificado';

      const text = [
        'Hola, me interesa cotizar un trabajo de anodizado.',
        '',
        `*Nombre / Empresa:* ${nombre}`,
        `*Correo:* ${email}`,
        `*Teléfono:* ${telefono}`,
        `*Proceso de interés:* ${proceso}`,
        `*Descripción de la pieza:* ${mensaje}`,
      ].join('\n');

      window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    });
  }

});
