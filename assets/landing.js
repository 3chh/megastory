// progress bar
const bar = document.querySelector('.progress');
const onScroll = () => {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// active nav link via section observer
const navLinks = [...document.querySelectorAll('.nav a[data-sec]')];
const secMap = {};
navLinks.forEach((a) => { const t = document.getElementById(a.dataset.sec); if (t) secMap[a.dataset.sec] = a; });
const secIo = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      navLinks.forEach((a) => a.classList.remove('active'));
      const a = secMap[e.target.id]; if (a) a.classList.add('active');
    }
  });
}, { threshold: 0.4, rootMargin: '-30% 0px -55% 0px' });
Object.keys(secMap).forEach((id) => { const t = document.getElementById(id); if (t) secIo.observe(t); });
