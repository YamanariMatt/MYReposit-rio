document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
    if (navToggle && siteNav) {
      navToggle.addEventListener('click', (ev) => {
        ev.stopPropagation();
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
  });

      // close when clicking a link
      siteNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }));

      // close when clicking outside
      document.addEventListener('click', (e) => {
        if (siteNav.classList.contains('open') && !siteNav.contains(e.target)) {
          siteNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => observer.observe(r));

  const modal = document.querySelector('#project-modal');
  const projectCards = document.querySelectorAll('#projetos .project-card');
  const closeModalButtons = document.querySelectorAll('[data-close-project-modal]');
  const modalFields = {
    badge: document.querySelector('#project-modal-badge'),
    title: document.querySelector('#project-modal-title'),
    summary: document.querySelector('#project-modal-summary'),
    details: document.querySelector('#project-modal-details'),
    role: document.querySelector('#project-modal-role'),
    stack: document.querySelector('#project-modal-stack'),
    live: document.querySelector('#project-modal-live'),
    github: document.querySelector('#project-modal-github'),
  };

  let lastFocusedProject = null;

  const openProjectModal = (card) => {
    if (!modal) return;

    lastFocusedProject = card;
    modalFields.badge.textContent = card.dataset.badge || 'Projeto';
    modalFields.title.textContent = card.dataset.title || '';
    modalFields.summary.textContent = card.dataset.summary || '';
    modalFields.details.textContent = card.dataset.details || '';
    modalFields.role.textContent = card.dataset.role || '';
    modalFields.live.href = card.dataset.live || card.dataset.github || '#';
    modalFields.github.href = card.dataset.github || card.dataset.live || '#';

    modalFields.stack.innerHTML = '';
    (card.dataset.stack || '').split(',').map(item => item.trim()).filter(Boolean).forEach((item) => {
      const tag = document.createElement('span');
      tag.className = 'stack-tag';
      tag.textContent = item;
      modalFields.stack.appendChild(tag);
    });

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modal.querySelector('.project-modal-close').focus();
  };

  const closeProjectModal = () => {
    if (!modal || !modal.classList.contains('open')) return;

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (lastFocusedProject) {
      lastFocusedProject.focus();
    }
  };

  projectCards.forEach((card) => {
    card.addEventListener('click', () => openProjectModal(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProjectModal(card);
      }
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener('click', closeProjectModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeProjectModal();
    }
  });
});
