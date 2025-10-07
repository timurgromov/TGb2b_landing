// ===== ВИДЕО ФУНКЦИОНАЛЬНОСТЬ (НЕ МЕНЯТЬ) =====
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".video-wrapper").forEach(wrapper => {
    const videoSrc = wrapper.dataset.video;
    const coverSrc = wrapper.dataset.cover;
    wrapper.innerHTML = `
      <div class="video-poster"><img src="${coverSrc}" alt=""></div>
      <div class="play-button"></div>`;
    const playBtn = wrapper.querySelector(".play-button");
    playBtn.addEventListener("click", () => {
      wrapper.innerHTML = `<video controls autoplay><source src="${videoSrc}" type="video/mp4"></video>`;
      const video = wrapper.querySelector("video");
      video.muted = false;
      video.volume = 1.0;
      video.play();
    });
  });
});

// ===== Scroll-Reveal для .sr =====
(function(){
  document.documentElement.classList.add('js');
  const els = Array.from(document.querySelectorAll('.sr'));
  if (!els.length) return;

  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || typeof IntersectionObserver === 'undefined'){
    els.forEach(el => el.classList.add('show'));
    return;
  }

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    });
  },{threshold:0.12, rootMargin:'0px 0px -10% 0px'});

  els.forEach(el=>io.observe(el));
})();

// ===== Переключение темы =====
(function(){
  const KEY = 'site-theme';
  const root = document.documentElement;
  const btns = document.querySelectorAll('.theme-btn');

  // restore theme
  const saved = localStorage.getItem(KEY);
  if (saved) root.setAttribute('data-theme', saved);
  else if (!root.hasAttribute('data-theme')) root.setAttribute('data-theme','modern');

  function setActive(theme){
    root.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
    btns.forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
  }

  // sync active state on load
  const current = root.getAttribute('data-theme') || 'modern';
  btns.forEach(b => b.classList.toggle('active', b.dataset.theme === current));

  // wire clicks
  btns.forEach(b => b.addEventListener('click', e => {
    e.preventDefault();
    const t = b.dataset.theme;
    if (!t) return;
    setActive(t);
  }));
})();

// ===== Модалка "2 варианта программы" =====
(function(){
  const modal = document.getElementById('programs-modal');
  const openBtn = document.querySelector('[data-cta="programs_modal"]');
  const closeBtn = modal?.querySelector('.modal__close');
  const overlay = modal?.querySelector('.modal__overlay');

  if (!modal || !openBtn) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
})();

// ===== Логирование CTA кликов =====
(function(){
  const log = (label) => console.log({event: 'cta_click', label, ts: Date.now()});
  
  document.querySelectorAll('[data-cta]').forEach(el => {
    el.addEventListener('click', () => {
      const label = el.getAttribute('data-cta') || 'cta';
      log(label);
    });
  });
})();
