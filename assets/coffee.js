/* Coffee theme for Cecil — progressive enhancements (no dependency) */
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header: opaque when the page is scrolled */
  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => header.setAttribute('data-scrolled', window.scrollY > 24 ? 'true' : 'false');
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Mobile menu */
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
      header?.setAttribute('data-menu-open', String(open));
      document.body.classList.toggle('overflow-hidden', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => e.matches && setOpen(false));
  }

  /* Desktop dropdowns: toggle on click (touch devices), close on outside click / Escape */
  document.querySelectorAll('[data-dropdown]').forEach((dropdown) => {
    const button = dropdown.querySelector('button');
    const close = () => {
      dropdown.removeAttribute('data-open');
      button.setAttribute('aria-expanded', 'false');
    };
    button.addEventListener('click', () => {
      const open = !dropdown.hasAttribute('data-open');
      dropdown.toggleAttribute('data-open', open);
      button.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (e) => !dropdown.contains(e.target) && close());
    dropdown.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        close();
        button.focus();
      }
    });
  });

  /* Sliders: scroll-snap track + prev/next buttons, dots and optional autoplay */
  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const track = slider.querySelector('[data-slider-track]');
    const slides = [...track.children];
    const dots = [...slider.querySelectorAll('[data-slider-dot]')];
    const delay = parseInt(slider.dataset.autoplay || '0', 10);
    let current = 0;
    let timer = null;

    const goTo = (index) => {
      current = (index + slides.length) % slides.length;
      track.scrollTo({ left: slides[current].offsetLeft, behavior: reducedMotion ? 'auto' : 'smooth' });
    };
    const update = () => {
      current = Math.round(track.scrollLeft / track.clientWidth);
      dots.forEach((dot, i) => dot.setAttribute('aria-current', i === current ? 'true' : 'false'));
      slides.forEach((slide, i) => slide.toggleAttribute('inert', i !== current));
    };
    const stop = () => timer && clearInterval(timer);
    const start = () => {
      stop();
      if (delay > 0 && !reducedMotion && slides.length > 1) timer = setInterval(() => goTo(current + 1), delay);
    };

    slider.querySelector('[data-slider-prev]')?.addEventListener('click', () => goTo(current - 1));
    slider.querySelector('[data-slider-next]')?.addEventListener('click', () => goTo(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
    track.addEventListener('scroll', () => window.requestAnimationFrame(update), { passive: true });
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('focusin', stop);
    update();
    start();
  });

  /* Reveal elements when they enter the viewport */
  const revealed = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    revealed.forEach((el) => observer.observe(el));
  } else {
    revealed.forEach((el) => el.classList.add('is-visible'));
  }
})();
