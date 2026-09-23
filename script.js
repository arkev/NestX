/**
 * NESTX — JAVASCRIPT VAINILLA PURO
 * Interacciones: Desplazamiento del Header, Menú Móvil, Animaciones Scroll Reveal (IntersectionObserver),
 * Modal de Registro de Eventos, Copiado al Portapapeles y Formulario de Newsletter.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Efecto de Scroll en el Header ---
  const siteHeader = document.getElementById('site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 8) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // --- 2. Menú de Navegación Móvil (Drawer) ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav-panel');
  const hamburgerIcon = document.getElementById('icon-hamburger');
  const closeIcon = document.getElementById('icon-close');

  if (mobileToggle && mobileNav) {
    const toggleMobileNav = (forceState) => {
      const isOpen = typeof forceState === 'boolean' ? forceState : !mobileNav.classList.contains('is-open');
      mobileNav.classList.toggle('is-open', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      if (hamburgerIcon && closeIcon) {
        hamburgerIcon.style.display = isOpen ? 'none' : 'block';
        closeIcon.style.display = isOpen ? 'block' : 'none';
      }
    };

    mobileToggle.addEventListener('click', () => toggleMobileNav());

    // Cerrar al hacer clic en cualquier enlace del menú móvil
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMobileNav(false));
    });

    // Cerrar al presionar la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        toggleMobileNav(false);
      }
    });
  }

  // --- 3. Animaciones de Entrada al Hacer Scroll (IntersectionObserver) ---
  const reveals = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Si el usuario prefiere movimiento reducido, mostrar inmediatamente
    reveals.forEach((el) => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.getAttribute('data-delay');
            if (delay) {
              el.style.transitionDelay = `${delay}ms`;
            }
            el.classList.add('is-visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    // Respaldo para navegadores antiguos
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // --- 4. Directorio de Eventos y Sistema Modal ---
  const EVENTS_DATA = {
    'design-thinking': {
      id: 'design-thinking',
      category: 'Hands-On Workshop',
      title: 'Design Thinking: From Empathy to High-Impact Solutions',
      instructor: 'Prof. Allen Zapién',
      instructorRole: 'Innovation Strategist & Certified Design Thinking Facilitator',
      date: 'November 20, 2026',
      time: '4:00 PM - 6:30 PM CST (Live Virtual)',
      modality: 'Live Zoom Workshop & Practical Lab',
      spots: 'Limited to 50 participants',
    },
    'research-symposium': {
      id: 'research-symposium',
      category: 'Academic Symposium',
      title: 'Research & Applied Innovation Symposium 2026',
      instructor: 'NestX Research Panel',
      instructorRole: 'Graduate & Interuniversity Research Leaders',
      date: 'December 4, 2026',
      time: '10:00 AM - 1:00 PM CST',
      modality: 'Hybrid Broadcast / Global Streaming',
      spots: 'Open access for the university community',
    },
    'venture-pitch': {
      id: 'venture-pitch',
      category: 'Demo Day & Incubation',
      title: 'NestX Demo Day: University Startup Showcase',
      instructor: 'Incubator Network Mentors',
      instructorRole: 'Acceleration Directors & Seed Fund Advisors',
      date: 'December 15, 2026',
      time: '5:00 PM - 7:30 PM CST',
      modality: 'Live Online',
      spots: 'Open pitch for selected projects',
    },
  };

  const modalBackdrop = document.getElementById('event-modal');
  const modalCloseBtns = document.querySelectorAll('[data-close-modal]');
  const modalFormView = document.getElementById('modal-form-view');
  const modalConfirmView = document.getElementById('modal-confirm-view');
  const regForm = document.getElementById('event-reg-form');

  // Elementos internos del modal
  const modalEventCategory = document.getElementById('modal-event-category');
  const modalEventTitle = document.getElementById('modal-event-title');
  const modalEventMeta = document.getElementById('modal-event-meta');
  const confirmEventTitle = document.getElementById('confirm-event-title');
  const confirmEventCategory = document.getElementById('confirm-event-category');
  const confirmEventInstructor = document.getElementById('confirm-event-instructor');
  const confirmEventDateTime = document.getElementById('confirm-event-datetime');
  const confirmUserEmail = document.getElementById('confirm-user-email');

  let activeEvent = null;

  // Abrir modal con los datos del evento
  const openEventModal = (eventId) => {
    const event = EVENTS_DATA[eventId] || EVENTS_DATA['design-thinking'];
    activeEvent = event;

    if (modalEventCategory) modalEventCategory.textContent = event.category;
    if (modalEventTitle) modalEventTitle.textContent = event.title;
    if (modalEventMeta) modalEventMeta.textContent = `${event.instructor} · ${event.date}`;

    // Restablecer a la vista del formulario
    if (modalFormView) modalFormView.style.display = 'block';
    if (modalConfirmView) modalConfirmView.style.display = 'none';
    if (regForm) regForm.reset();

    // Abrir backdrop y bloquear scroll
    if (modalBackdrop) {
      modalBackdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      const firstInput = regForm?.querySelector('input');
      if (firstInput) setTimeout(() => firstInput.focus(), 50);
    }
  };

  // Cerrar modal y restaurar scroll
  const closeEventModal = () => {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };

  // Vincular botones para abrir el modal
  document.querySelectorAll('[data-open-event]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const eventId = btn.getAttribute('data-open-event');
      openEventModal(eventId);
    });
  });

  // Vincular botones de cierre
  modalCloseBtns.forEach((btn) => {
    btn.addEventListener('click', closeEventModal);
  });

  // Cerrar al hacer clic en el fondo oscuro
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeEventModal();
      }
    });
  }

  // Cerrar al presionar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('is-open')) {
      closeEventModal();
    }
  });

  // Procesar envío del formulario de registro
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name')?.value.trim();
      const email = document.getElementById('reg-email')?.value.trim();

      if (!name || !email) return;

      if (activeEvent) {
        if (confirmEventTitle) confirmEventTitle.textContent = activeEvent.title;
        if (confirmEventCategory) confirmEventCategory.textContent = activeEvent.category;
        if (confirmEventInstructor) confirmEventInstructor.textContent = `Instructor: ${activeEvent.instructor}`;
        if (confirmEventDateTime) confirmEventDateTime.textContent = `${activeEvent.date} — ${activeEvent.time}`;
      }

      if (confirmUserEmail) confirmUserEmail.textContent = email;

      // Mostrar pantalla de confirmación exitosa
      if (modalFormView) modalFormView.style.display = 'none';
      if (modalConfirmView) modalConfirmView.style.display = 'block';
    });
  }

  // --- 5. Botón para Compartir Evento ---
  const shareBtn = document.getElementById('btn-share-event');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const shareText = "Design Thinking: From Empathy to High-Impact Solutions - Led by Prof. Allen Zapién on November 20, 2026 at NestX (#events)";
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
          const originalContent = shareBtn.innerHTML;
          shareBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #047857;"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span style="color: #047857; font-weight: 700;">¡Enlace copiado al portapapeles!</span>
          `;
          setTimeout(() => {
            shareBtn.innerHTML = originalContent;
          }, 2500);
        }).catch(() => {});
      }
    });
  }

  // --- 6. Formulario de Suscripción al Newsletter ---
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');

  if (newsletterForm && newsletterSuccess) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      if (emailInput && emailInput.value) {
        newsletterForm.style.display = 'none';
        newsletterSuccess.style.display = 'flex';
      }
    });
  }
});
