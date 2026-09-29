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
        hamburgerIcon.classList.toggle('is-hidden', isOpen);
        closeIcon.classList.toggle('is-visible', isOpen);
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
            if (delay && delay !== '0') {
              el.classList.add(`reveal-delay-${delay}`);
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

  // --- 4. Directorio de Eventos y Sistema Modal de Dos Pasos ---
  const EVENTS_DATA = {
    'design-thinking': {
      id: 'design-thinking',
      category: 'Hands-On Workshop',
      title: 'Design Thinking: From Empathy to High-Impact Solutions',
      description: 'An immersive and collaborative workshop designed for faculty, students, and researchers across the NestX network. Learn to apply the 5 phases of Design Thinking to tackle real educational and social challenges with human-centered solutions.',
      instructor: 'Prof. Allen Zapién',
      instructorRole: 'Innovation Strategist & Certified Design Thinking Facilitator',
      date: 'November 20, 2026',
      time: '4:00 PM - 6:30 PM CST',
      modality: 'Live Zoom Workshop & Practical Lab',
      spots: 'Limited to 50 participants',
      certNote: 'A digital certificate issued by the NestX Network will be awarded to all attendees.',
    },
    'research-symposium': {
      id: 'research-symposium',
      category: 'Academic Symposium',
      title: 'Research & Applied Innovation Symposium 2026',
      description: 'An international gathering of researchers sharing advances in sustainability, preventive health, digital education, and technology transfer across universities in the Americas and beyond.',
      instructor: 'NestX Research Panel',
      instructorRole: 'Graduate & Interuniversity Research Leaders',
      date: 'December 4, 2026',
      time: '10:00 AM - 1:00 PM CST',
      modality: 'Hybrid Broadcast / Global Streaming',
      spots: 'Open access for the university community',
      certNote: 'Certificate of attendance and access to recorded proceedings included.',
    },
    'venture-pitch': {
      id: 'venture-pitch',
      category: 'Demo Day & Incubation',
      title: 'NestX Demo Day: University Startup Showcase',
      description: 'Outstanding university teams will present their venture projects to a panel of mentors, acceleration directors, and seed fund advisors seeking scalable social and technological impact.',
      instructor: 'Incubator Network Mentors',
      instructorRole: 'Acceleration Directors & Seed Fund Advisors',
      date: 'December 15, 2026',
      time: '5:00 PM - 7:30 PM CST',
      modality: 'Live Online',
      spots: 'Open pitch session for selected projects & guests',
      certNote: 'Interactive pitch feedback session and post-event networking breakout rooms.',
    },
  };

  const modalBackdrop = document.getElementById('event-modal');
  const modalCloseBtns = document.querySelectorAll('[data-close-modal]');
  const modalStepper = document.getElementById('event-modal-stepper');
  const stepIndicatorDetails = document.getElementById('step-indicator-details');
  const stepIndicatorForm = document.getElementById('step-indicator-form');
  const stepConnector = document.getElementById('modal-step-connector');

  // Vistas del modal
  const modalDetailsView = document.getElementById('modal-details-view');
  const modalFormView = document.getElementById('modal-form-view');
  const modalConfirmView = document.getElementById('modal-confirm-view');
  const regForm = document.getElementById('event-reg-form');

  // Elementos Vista 1: Detalles
  const modalEventCategory = document.getElementById('modal-event-category');
  const modalEventTitle = document.getElementById('modal-event-title');
  const modalEventDesc = document.getElementById('modal-event-desc');
  const modalEventDate = document.getElementById('modal-event-date');
  const modalEventTime = document.getElementById('modal-event-time');
  const modalEventInstructor = document.getElementById('modal-event-instructor');
  const modalEventInstructorRole = document.getElementById('modal-event-instructor-role');
  const modalEventModality = document.getElementById('modal-event-modality');
  const modalEventSpots = document.getElementById('modal-event-spots');
  const modalEventCert = document.getElementById('modal-event-cert');
  const modalEventCertText = document.getElementById('modal-event-cert-text');
  const btnGotoRegister = document.getElementById('btn-goto-register');

  // Elementos Vista 2: Formulario
  const btnBackToDetails = document.getElementById('btn-back-to-details');
  const btnCancelToDetails = document.getElementById('btn-cancel-to-details');
  const modalFormEventName = document.getElementById('modal-form-event-name');
  const modalFormEventMeta = document.getElementById('modal-form-event-meta');

  // Elementos Vista 3: Confirmación
  const confirmEventTitle = document.getElementById('confirm-event-title');
  const confirmEventCategory = document.getElementById('confirm-event-category');
  const confirmEventInstructor = document.getElementById('confirm-event-instructor');
  const confirmEventDateTime = document.getElementById('confirm-event-datetime');
  const confirmUserEmail = document.getElementById('confirm-user-email');

  let activeEvent = null;

  // Cambiar entre pasos del modal (details -> form -> confirm)
  const setModalStep = (step) => {
    if (step === 'details') {
      if (modalStepper) modalStepper.classList.remove('is-hidden');
      if (stepIndicatorDetails) {
        stepIndicatorDetails.classList.add('is-active');
        stepIndicatorDetails.classList.remove('is-completed');
      }
      if (stepIndicatorForm) {
        stepIndicatorForm.classList.remove('is-active', 'is-completed');
      }
      if (stepConnector) {
        stepConnector.classList.remove('is-active');
      }

      if (modalDetailsView) modalDetailsView.classList.remove('is-hidden');
      if (modalFormView) modalFormView.classList.add('is-hidden');
      if (modalConfirmView) modalConfirmView.classList.remove('is-visible');

      if (btnGotoRegister) setTimeout(() => btnGotoRegister.focus(), 60);
    } else if (step === 'form') {
      if (modalStepper) modalStepper.classList.remove('is-hidden');
      if (stepIndicatorDetails) {
        stepIndicatorDetails.classList.remove('is-active');
        stepIndicatorDetails.classList.add('is-completed');
      }
      if (stepIndicatorForm) {
        stepIndicatorForm.classList.add('is-active');
        stepIndicatorForm.classList.remove('is-completed');
      }
      if (stepConnector) {
        stepConnector.classList.add('is-active');
      }

      if (modalDetailsView) modalDetailsView.classList.add('is-hidden');
      if (modalFormView) modalFormView.classList.remove('is-hidden');
      if (modalConfirmView) modalConfirmView.classList.remove('is-visible');

      const firstInput = regForm?.querySelector('input');
      if (firstInput) setTimeout(() => firstInput.focus(), 60);
    } else if (step === 'confirm') {
      if (modalStepper) modalStepper.classList.add('is-hidden');
      if (modalDetailsView) modalDetailsView.classList.add('is-hidden');
      if (modalFormView) modalFormView.classList.add('is-hidden');
      if (modalConfirmView) modalConfirmView.classList.add('is-visible');
    }
  };

  // Abrir modal con los datos del evento (comienza siempre en Paso 1: Detalles)
  const openEventModal = (eventId) => {
    const event = EVENTS_DATA[eventId] || EVENTS_DATA['design-thinking'];
    activeEvent = event;

    // Poblar vista de detalles (Paso 1)
    if (modalEventCategory) modalEventCategory.textContent = event.category;
    if (modalEventTitle) modalEventTitle.textContent = event.title;
    if (modalEventDesc) modalEventDesc.textContent = event.description;
    if (modalEventDate) modalEventDate.textContent = event.date;
    if (modalEventTime) modalEventTime.textContent = event.time;
    if (modalEventInstructor) modalEventInstructor.textContent = event.instructor;
    if (modalEventInstructorRole) modalEventInstructorRole.textContent = event.instructorRole;
    if (modalEventModality) modalEventModality.textContent = event.modality;
    if (modalEventSpots) modalEventSpots.textContent = event.spots;

    if (modalEventCert && modalEventCertText) {
      if (event.certNote) {
        modalEventCertText.textContent = event.certNote;
        modalEventCert.classList.remove('is-hidden');
      } else {
        modalEventCert.classList.add('is-hidden');
      }
    }

    // Poblar resumen del formulario (Paso 2)
    if (modalFormEventName) modalFormEventName.textContent = event.title;
    if (modalFormEventMeta) modalFormEventMeta.textContent = `${event.date} · ${event.modality}`;

    // Restablecer formulario y situar en Paso 1 (Detalles)
    if (regForm) regForm.reset();
    setModalStep('details');

    // Abrir backdrop y bloquear scroll
    if (modalBackdrop) {
      modalBackdrop.classList.add('is-open');
      document.body.classList.add('no-scroll');
    }
  };

  // Cerrar modal y restaurar scroll
  const closeEventModal = () => {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }
  };

  // Navegación dentro del modal
  btnGotoRegister?.addEventListener('click', () => setModalStep('form'));
  btnBackToDetails?.addEventListener('click', () => setModalStep('details'));
  btnCancelToDetails?.addEventListener('click', () => setModalStep('details'));

  // Permitir clic en el paso 1 si ya se está en el paso 2
  stepIndicatorDetails?.addEventListener('click', () => {
    if (stepIndicatorDetails.classList.contains('is-completed')) {
      setModalStep('details');
    }
  });

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

  // Procesar envío del formulario de registro (Paso 2 -> Confirmación)
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
      setModalStep('confirm');
    });
  }

  // --- 5. Modal de Join ---
  const joinModal = document.getElementById('join-modal');
  const joinCloseBtns = document.querySelectorAll('[data-close-join]');
  const joinFormView = document.getElementById('join-form-view');
  const joinConfirmView = document.getElementById('join-confirm-view');
  const joinForm = document.getElementById('join-form');

  // Abrir modal de Join y restablecer a la vista del formulario
  const openJoinModal = () => {
    if (joinFormView) joinFormView.classList.remove('is-hidden');
    if (joinConfirmView) joinConfirmView.classList.remove('is-visible');
    if (joinForm) joinForm.reset();

    if (joinModal) {
      joinModal.classList.add('is-open');
      document.body.classList.add('no-scroll');
      const firstInput = joinForm?.querySelector('input');
      if (firstInput) setTimeout(() => firstInput.focus(), 50);
    }
  };

  // Cerrar modal de Join y restaurar scroll
  const closeJoinModal = () => {
    if (joinModal) {
      joinModal.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }
  };

  // Vincular botones Join para abrir el modal
  document.querySelectorAll('[data-open-join]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openJoinModal();
    });
  });

  // Vincular botones de cierre
  joinCloseBtns.forEach((btn) => {
    btn.addEventListener('click', closeJoinModal);
  });

  // Cerrar al hacer clic en el fondo oscuro
  if (joinModal) {
    joinModal.addEventListener('click', (e) => {
      if (e.target === joinModal) {
        closeJoinModal();
      }
    });
  }

  // Cerrar al presionar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && joinModal?.classList.contains('is-open')) {
      closeJoinModal();
    }
  });

  // Procesar envío del formulario de Join
  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('join-name')?.value.trim();
      const email = document.getElementById('join-email')?.value.trim();

      if (!name || !email) return;

      // Mostrar pantalla de confirmación exitosa
      if (joinFormView) joinFormView.classList.add('is-hidden');
      if (joinConfirmView) joinConfirmView.classList.add('is-visible');
    });
  }

  // --- 6. Botón para Compartir Evento ---
  const shareBtn = document.getElementById('btn-share-event');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const shareText = "Design Thinking: From Empathy to High-Impact Solutions - Led by Prof. Allen Zapién on November 20, 2026 at NestX (#events)";
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
          const originalContent = shareBtn.innerHTML;
          shareBtn.innerHTML = `
            <span class="material-symbols-rounded share-success-icon" aria-hidden="true">check_circle</span>
            <span class="share-success-text">¡Enlace copiado al portapapeles!</span>
          `;
          setTimeout(() => {
            shareBtn.innerHTML = originalContent;
          }, 2500);
        }).catch(() => {});
      }
    });
  }

  // --- 7. Formulario de Suscripción al Newsletter ---
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');

  if (newsletterForm && newsletterSuccess) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      if (emailInput && emailInput.value) {
        newsletterForm.classList.add('is-hidden');
        newsletterSuccess.classList.add('is-visible');
      }
    });
  }
});
