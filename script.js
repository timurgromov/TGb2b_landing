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

// ===== Настройки Метрики =====
const COUNTER_ID = 104468814;

// ===== Логирование CTA кликов =====
(function(){
  window.dataLayer = window.dataLayer || [];

  const log = (label) => {
    const event = { event: 'cta_click', label, ts: Date.now() };
    window.dataLayer.push(event);
    console.log(event);

    if (typeof ym === 'function') {
      ym(COUNTER_ID, 'reachGoal', 'cta_click_' + label);
    } else {
      console.warn('Метрика недоступна, событие не отправлено:', label);
    }
  };

  document.querySelectorAll('[data-cta]').forEach(el => {
    el.addEventListener('click', () => {
      const label = el.getAttribute('data-cta') || 'cta';
      log(label);
    });
  });
})();

// === Инициализация слайдера писем (стрелки, клавиатура, drag/swipe) ===
(function initLettersSlider(){
  const root = document.querySelector('.letters-slider');
  if (!root) return;

  const track = root.querySelector('.letters-track');
  const prev  = root.querySelector('.letters-btn.prev');
  const next  = root.querySelector('.letters-btn.next');

  const cardWidth = () => {
    const card = track.querySelector('.letter-card');
    return card ? card.getBoundingClientRect().width : 320;
  };

  const scrollByCard = (dir) => {
    track.scrollBy({ left: dir * (cardWidth() + 12), behavior: 'smooth' });
  };

  prev?.addEventListener('click', () => scrollByCard(-1));
  next?.addEventListener('click', () => scrollByCard( 1));

  // Клавиатура
  track.addEventListener('keydown', (e)=>{
    if (e.key === 'ArrowRight') scrollByCard(1);
    if (e.key === 'ArrowLeft')  scrollByCard(-1);
  });

  // Drag / Swipe (pointer events)
  let isDown = false, startX = 0, startScroll = 0;
  track.addEventListener('pointerdown', (e)=>{
    isDown = true;
    track.setPointerCapture(e.pointerId);
    startX = e.clientX; startScroll = track.scrollLeft;
  });
  track.addEventListener('pointermove', (e)=>{
    if(!isDown) return;
    const dx = e.clientX - startX;
    track.scrollLeft = startScroll - dx;
  });
  ['pointerup','pointercancel','mouseleave'].forEach(ev=>{
    track.addEventListener(ev, ()=>{ isDown=false; });
  });
})();

// === ЛАЙТБОКС ДЛЯ ПИСЕМ И ФОТО ===
(function initImageLightbox(){
  const modal     = document.getElementById('letter-modal');           // используем существующую модалку
  const modalImg  = modal?.querySelector('.letter-modal-img');
  const closeBtn  = modal?.querySelector('.modal__close');
  const overlay   = modal?.querySelector('.modal__overlay');
  if (!modal || !modalImg) return;

  // Собираем источники кликов из двух секций
  const letterNodes = Array.from(document.querySelectorAll('[data-letter-modal]'));
  const photoNodes  = Array.from(document.querySelectorAll('[data-image-modal]'));

  // Список "групп" для навигации (по секциям)
  const groups = [
    { name: 'letters', nodes: letterNodes, selector: 'img', src: (el)=>el.querySelector('img')?.src, alt: (el)=>el.querySelector('img')?.alt },
    { name: 'photos',  nodes: photoNodes,  selector: 'img', src: (el)=>el.getAttribute('data-full') || el.querySelector('img')?.src, alt: (el)=>el.querySelector('img')?.alt }
  ];

  let activeGroup = null;  // { name, nodes, index }
  let index = -1;

  function openModal(src, alt, groupName, idx){
    modalImg.src = src;
    modalImg.alt = alt || '';
    modal.classList.add('active');           // <-- фикc: используем 'active' как и в других модалках
    document.body.style.overflow = 'hidden';

    // Метрика
    if (typeof ym === 'function') {
      ym(COUNTER_ID, 'reachGoal', 'lightbox_open_' + groupName);
    }
    activeGroup = groups.find(g => g.name === groupName) || null;
    index = typeof idx === 'number' ? idx : -1;
  }

  function closeModal(){
    modal.classList.remove('active');        // <-- фикc
    document.body.style.overflow = '';
    modalImg.src = '';
    activeGroup = null;
    index = -1;
  }

  function navigate(dir){
    if (!activeGroup || !activeGroup.nodes || index < 0) return;
    const total = activeGroup.nodes.length;
    index = (index + dir + total) % total;
    const el  = activeGroup.nodes[index];
    const src = activeGroup.src(el);
    const alt = activeGroup.alt(el);
    if (src){
      modalImg.src = src;
      modalImg.alt = alt || '';
    }
  }

  // Делегируем клики для каждой группы
  groups.forEach(group => {
    group.nodes.forEach((card, i)=>{
      card.addEventListener('click', ()=>{
        const src = group.src(card);
        const alt = group.alt(card);
        if (src) openModal(src, alt, group.name, i);
      });
    });
  });

  // Закрытие
  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);
  modalImg?.addEventListener('click', closeModal); // тап по картинке тоже закрывает

  // Клавиатура
  document.addEventListener('keydown', (e)=>{
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') navigate(+1);
    if (e.key === 'ArrowLeft')  navigate(-1);
  });
})();

// === Фото-слайдер: расчёт ширины карточки по натуральному аспекту изображения ===
(function initPhotosSlider(){
  const root = document.querySelector('.photos-slider');
  if (!root) return;

  const track = root.querySelector('.photos-track');
  const cards = Array.from(track.querySelectorAll('.photo-card'));
  const prev  = root.querySelector('.photos-btn.prev');
  const next  = root.querySelector('.photos-btn.next');

  // Вычисляем ширину карточки: width = height * (naturalWidth / naturalHeight)
  function fitCardWidth(card, img){
    const h = card.getBoundingClientRect().height;          // текущая фактическая высота (учитывает медиа-правила)
    const w = img.naturalWidth || img.width;
    const nh = img.naturalHeight || img.height;
    if (!w || !nh || !h) return;

    const ratio = w / nh;                                   // аспект изображения
    const target = Math.max(180, Math.min(h * ratio, 1000)); // защита от экстремумов
    card.style.width = `${Math.round(target)}px`;
  }

  function layout(){
    cards.forEach(card=>{
      const img = card.querySelector('img');
      if (!img) return;
      if (img.complete) fitCardWidth(card, img);
      else img.addEventListener('load', ()=>fitCardWidth(card, img), { once:true });
    });
  }

  // Навигация (стрелки листают ~на ширину видимой области)
  const scrollStep = () => track.clientWidth * 0.9;
  const scrollByX  = dir => track.scrollBy({ left: dir * scrollStep(), behavior:'smooth' });
  prev?.addEventListener('click', ()=>scrollByX(-1));
  next?.addEventListener('click', ()=>scrollByX( 1));

  // Клавиатура
  track.addEventListener('keydown', (e)=>{
    if (e.key === 'ArrowRight') scrollByX(1);
    if (e.key === 'ArrowLeft')  scrollByX(-1);
  });

  // Drag / Swipe
  let isDown = false, startX = 0, startScroll = 0;
  track.addEventListener('pointerdown', (e)=>{
    isDown = true; track.setPointerCapture(e.pointerId);
    startX = e.clientX; startScroll = track.scrollLeft;
  });
  track.addEventListener('pointermove', (e)=>{
    if(!isDown) return;
    const dx = e.clientX - startX;
    track.scrollLeft = startScroll - dx;
  });
  ['pointerup','pointercancel','mouseleave'].forEach(ev=>{
    track.addEventListener(ev, ()=>{ isDown=false; });
  });

  // Первичная раскладка + пересчёт на ресайз (debounce)
  layout();
  let t=null;
  window.addEventListener('resize', ()=>{
    clearTimeout(t);
    t=setTimeout(layout, 120);
  });
})();
