// Sticky header
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 12);
});

// Reveal on scroll + stagger
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
  // Авто-стэггер: для контейнеров с data-stagger проставим data-delay детям .sr
  document.querySelectorAll('[data-stagger]').forEach(group => {
    const step = parseInt(group.getAttribute('data-stagger') || '80', 10);
    let d = 0;
    [...group.querySelectorAll('.sr')].forEach(el => {
      el.dataset.delay = el.dataset.delay || String(d);
      d += step;
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(() => el.classList.add('show'), delay);
      io.unobserve(el);
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.sr').forEach(el => io.observe(el));
}

// Parallax (тонкий, без дерганий)
(function(){
  if (prefersReduced) return;
  const px = [];
  document.querySelectorAll('[data-parallax]').forEach(el=>{
    const speed = parseFloat(el.getAttribute('data-parallax') || '0.05');
    px.push({ el, speed, base: 0 });
  });
  if (!px.length) return;

  let ticking = false;
  document.documentElement.classList.add('parallax-active');

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const vh = window.innerHeight;
      px.forEach(item => {
        const rect = item.el.getBoundingClientRect();
        // Нормируем: −1 … +1 вокруг центра экрана
        const centerDist = (rect.top + rect.height/2 - vh/2) / (vh/2);
        const translate = -centerDist * 12 * item.speed; // до ~10–12px
        item.el.style.transform = `translate3d(0, ${translate}px, 0)`;
      });
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();

// Video modal
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');

function openVideoModal(src){
  if (!videoModal || !modalVideo) return;
  videoModal.classList.add('show');
  document.body.style.overflow = 'hidden';
  modalVideo.src = src || '';
  modalVideo.load();
  try { modalVideo.play(); } catch(_) {}
}
function closeVideoModal(){
  if (!videoModal || !modalVideo) return;
  videoModal.classList.remove('show');
  document.body.style.overflow = '';
  try { modalVideo.pause(); } catch(_) {}
  modalVideo.removeAttribute('src');
}
document.querySelectorAll('.video-card').forEach(card=>{
  card.addEventListener('click', ()=>{
    const src = card.getAttribute('data-video');
    if (!src) return;
    openVideoModal(src);
  });
});
document.querySelectorAll('[data-close="video"]').forEach(el=> el.addEventListener('click', closeVideoModal));

// Programs modal
const programsModal = document.getElementById('programsModal');
function openPrograms(){ if (programsModal){ programsModal.classList.add('show'); document.body.style.overflow='hidden'; } }
function closePrograms(){ if (programsModal){ programsModal.classList.remove('show'); document.body.style.overflow=''; } }
document.getElementById('openPrograms')?.addEventListener('click', openPrograms);
document.querySelectorAll('[data-close="programs"]').forEach(el=> el.addEventListener('click', closePrograms));

// CTA logging
const log = (label)=>console.log({event:'cta_click', label, ts:Date.now()});
document.querySelectorAll('[data-cta]').forEach(el=>{
  el.addEventListener('click', ()=> log(el.getAttribute('data-cta') || 'cta'));
});