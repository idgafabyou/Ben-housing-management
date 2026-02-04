// Small interactive behavior: mobile nav toggle, testimonials carousel, dynamic year
document.addEventListener('DOMContentLoaded', function() {
  // year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile nav
  const navToggle = document.getElementById('nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      primaryNav.style.display = expanded ? 'none' : 'block';
    });
  }

  // testimonials slider
  const slider = document.getElementById('test-slider');
  if (slider) {
    const items = Array.from(slider.querySelectorAll('.testimonial'));
    let idx = 0;
    const show = (i) => {
      items.forEach((it) => it.classList.remove('active'));
      const el = items[i];
      if (el) el.classList.add('active');
    };
    show(idx);

    // auto-advance
    let timer = setInterval(() => {
      idx = (idx + 1) % items.length;
      show(idx);
    }, 5000);

    // prev/next buttons
    document.querySelectorAll('[data-action="prev"], [data-action="next"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        clearInterval(timer);
        if (btn.dataset.action === 'prev') idx = (idx - 1 + items.length) % items.length;
        else idx = (idx + 1) % items.length;
        show(idx);
        // restart auto-advance
        timer = setInterval(() => {
          idx = (idx + 1) % items.length;
          show(idx);
        }, 5000);
      });
    });
  }
});
