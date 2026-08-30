const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Nav shadow on scroll
const nav = document.querySelector('.nav');
if (nav) {
  const setNavShadow = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  setNavShadow();
  window.addEventListener('scroll', setNavShadow, { passive: true });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => revealObserver.observe(el));
  }
}

// Personal facts pill stack — staggered cascade in, once
const factsStack = document.getElementById('factsStack');
if (factsStack) {
  const pills = factsStack.querySelectorAll('.fact-pill');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    pills.forEach((p) => p.classList.add('is-visible'));
  } else {
    const factsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          pills.forEach((pill, i) => {
            setTimeout(() => pill.classList.add('is-visible'), i * 90);
          });
          factsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    factsObserver.observe(factsStack);
  }
}
