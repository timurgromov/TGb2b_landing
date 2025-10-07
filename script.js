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
  card.addEventListener('click', (e)=>{
    // Не обрабатываем клики по iframe
    if (e.target.closest('.video-wrap')) return;
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

// Video Cards Poster Loading & Play Button Logic
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.video-card').forEach(card => {
    const coverPath = card.dataset.cover || '';
    const img = card.querySelector('.video-cover');

    // если есть data-cover, но <img> пустой — проставим
    if (coverPath && img && !img.getAttribute('src')) {
      img.src = coverPath;
    }

    // если картинка не загрузилась — оставим градиент фоном (фолбэк)
    if (img) {
      img.addEventListener('error', () => {
        img.remove(); // не показывать «сломанный» значок
      }, { once:true });
    }

    // Обработка клика по кнопке Play
    const playBtn = card.querySelector('.play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => mountPlayer(card));
    }
  });

  function mountPlayer(card){
    const type = (card.dataset.type || '').trim();   // 'boom' | 'mp4'
    const src  = (card.dataset.src  || '').trim();

    // контейнер под плеер
    const wrap = document.createElement('div');
    wrap.className = 'player-wrap';
    card.innerHTML = '';
    card.appendChild(wrap);

    if (type === 'mp4'){
      const v = document.createElement('video');
      v.src = src;
      v.controls = true;
      v.playsInline = true;
      v.autoplay = true;
      v.muted = true; // для автоплея на мобильных
      wrap.appendChild(v);
      v.focus();
      return;
    }

    // BoomStream iframe (в src — полная ссылка https://play.boomstream.com/{код})
    const url = buildBoomUrl(src, { autoplay: 1, muted: 1 });
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.loading = 'lazy';
    wrap.appendChild(iframe);
  }

  function buildBoomUrl(raw, params = {}){
    try {
      const u = new URL(raw);
      Object.entries(params).forEach(([k,v]) => u.searchParams.set(k, String(v)));
      return u.toString();
    } catch(e){
      // если передан только код — соберём URL
      const base = 'https://play.boomstream.com/';
      const path = raw.replace(/^https?:\/\/[^/]+\//,'').replace(/^\/+/,'');
      const url  = new URL(base + path);
      Object.entries(params).forEach(([k,v]) => url.searchParams.set(k, String(v)));
      return url.toString();
    }
  }
});

// ==================== CONNECTION WARMUP ====================
// Предварительно прогревает соединение с Boomstream, чтобы видео запускалось быстрее
function warmConnection(url){
  if (!url) return;
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = url;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}
document.addEventListener('DOMContentLoaded', () => {
  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach(card => {
    // подогрев при первом наведении
    card.addEventListener('mouseenter', () => {
      warmConnection('https://play.boomstream.com');
      warmConnection('https://cdnv.boomstream.com');
    }, { once: true });
    // и на мобильных при первом касании
    card.addEventListener('touchstart', () => {
      warmConnection('https://play.boomstream.com');
      warmConnection('https://cdnv.boomstream.com');
    }, { once: true });
  });
});