/* ====== Sticky header ====== */
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 12);
});

/* ====== Reveal on scroll (with stagger) ====== */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const el = e.target;
        const delay = parseInt(el.dataset.delay || '0', 10);
        setTimeout(() => el.classList.add('show'), delay);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-zoom')
    .forEach(el => io.observe(el));
}

/* ====== Video modal ====== */
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

/* ====== Programs modal ====== */
const programsModal = document.getElementById('programsModal');
function openPrograms(){ if (programsModal){ programsModal.classList.add('show'); document.body.style.overflow='hidden'; } }
function closePrograms(){ if (programsModal){ programsModal.classList.remove('show'); document.body.style.overflow=''; } }
document.getElementById('openPrograms')?.addEventListener('click', openPrograms);
document.querySelectorAll('[data-close="programs"]').forEach(el=> el.addEventListener('click', closePrograms));

/* ====== CTA logging ====== */
const log = (label)=>console.log({event:'cta_click', label, ts:Date.now()});
document.querySelectorAll('[data-cta]').forEach(el=>{
  el.addEventListener('click', ()=> log(el.getAttribute('data-cta') || 'cta'));
});