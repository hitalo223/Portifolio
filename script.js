/* ============================================
   PORTFÓLIO - SCRIPT.JS
   Animações de scroll, navbar ativa e barras de progresso
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Reveal on scroll ---------- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Pequeno delay escalonado para elementos irmãos
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---------- Barras de progresso animadas ---------- */
  const progressBars = document.querySelectorAll('.progress-fill');

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => progressObserver.observe(bar));

  /* ---------- Navbar link ativo no scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const activateNav = () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', activateNav);
  activateNav();

  /* ---------- Fechar menu mobile ao clicar ---------- */
  const navCollapse = document.getElementById('navMenu');
  const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        bsCollapse.hide();
      }
    });
  });

});
