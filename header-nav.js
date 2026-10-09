(() => {
  const nav = document.querySelector('[data-section-nav]');
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll('[data-nav-target]'));
  const sections = links
    .map((link) => document.getElementById(link.dataset.navTarget || ''))
    .filter(Boolean);
  if (!links.length || !sections.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.dataset.navTarget === id;
      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'location');
        link.scrollIntoView({ block: 'nearest', inline: 'center', behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  links.forEach((link) => {
    link.addEventListener('click', () => setActive(link.dataset.navTarget || ''));
  });

  let observer;
  const observeSections = () => {
    observer?.disconnect();
    const header = document.querySelector('.site-header');
    const headerHeight = Math.round(header?.getBoundingClientRect().height || 72);
    observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
      if (visible[0]) setActive(visible[0].target.id);
    }, {
      rootMargin: `-${headerHeight + 12}px 0px -62% 0px`,
      threshold: [0, 0.1, 0.35]
    });
    sections.forEach((section) => observer.observe(section));
  };

  observeSections();
  let resizeTimer;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(observeSections, 140);
  }, { passive: true });
})();
