// ===== ВИДЕО ФУНКЦИОНАЛЬНОСТЬ (НЕ МЕНЯТЬ) =====
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".video-wrapper").forEach(wrapper => {
    const videoSrc = wrapper.dataset.video;
    const coverSrc = wrapper.dataset.cover;
    const videoTitle = wrapper.dataset.videoTitle || 'Видео с мероприятия';
    wrapper.innerHTML = `
      <div class="video-poster"><img src="${coverSrc}" alt="${videoTitle}" width="1280" height="720" loading="lazy" decoding="async"></div>
      <button class="play-button" type="button" aria-label="Воспроизвести: ${videoTitle}"></button>`;
    const playBtn = wrapper.querySelector(".play-button");
    playBtn.addEventListener("click", () => {
      wrapper.innerHTML = `<video controls autoplay><source src="${videoSrc}" type="video/mp4"></video>`;
      const video = wrapper.querySelector("video");
      video.muted = false;
      video.volume = 1.0;
      video.play();
    });
  });

  document.querySelectorAll("[data-music-showreel]").forEach(wrapper => {
    const videoSrc = wrapper.dataset.musicShowreel;
    const videoTitle = wrapper.dataset.musicShowreelTitle || 'Шоу-рил музыкального состава';
    const playButton = wrapper.querySelector(".music-program__play");
    const showreelOverlay = wrapper.querySelector(".music-program__showreel-overlay");
    const media = wrapper.querySelector(".music-program__media");

    if (!videoSrc || !playButton || !showreelOverlay || !media) return;

    const posterMarkup = media.innerHTML;

    playButton.addEventListener("click", () => {
      media.innerHTML = `<video controls autoplay playsinline preload="metadata" aria-label="${videoTitle}"><source src="${videoSrc}" type="video/mp4"></video>`;
      showreelOverlay.hidden = true;
      const video = media.querySelector("video");
      video.muted = false;
      video.volume = 1.0;
      video.play().catch(() => {});

      video.addEventListener("ended", () => {
        media.innerHTML = posterMarkup;
        showreelOverlay.hidden = false;
      }, { once: true });
    });
  });
});

// ===== Scroll-Reveal для .sr =====
(function(){
  document.documentElement.classList.add('js');
  const els = Array.from(document.querySelectorAll('.sr'));
  if (!els.length) return;

  // ПРИНУДИТЕЛЬНО ВКЛЮЧАЕМ АНИМАЦИИ НА ВСЕХ УСТРОЙСТВАХ
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    });
  },{threshold:0.05, rootMargin:'0px 0px -5% 0px'});

  els.forEach(el => io.observe(el));
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

// Утилита: дебаунс
function debounce(fn, t=120){ let id=null; return (...a)=>{ clearTimeout(id); id=setTimeout(()=>fn(...a), t);} }

// Блокировка прокрутки body без «скачка» страницы
let __scrollY = 0;
function lockPageScroll() {
  __scrollY = window.scrollY || document.documentElement.scrollTop || 0;
  document.documentElement.classList.add('is-modal-open');
  document.body.classList.add('is-modal-open');
  // фиксация позиции без сдвига макета
  document.body.style.position = 'fixed';
  document.body.style.top = `-${__scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
}
function unlockPageScroll() {
  document.documentElement.classList.remove('is-modal-open');
  document.body.classList.remove('is-modal-open');
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  window.scrollTo(0, __scrollY);
}

// === Letters slider: arrows visibility + optional ping-pong ===
(function lettersPatched(){
  const root  = document.querySelector('.letters-slider');
  if (!root) return;
  const track = root.querySelector('.letters-track');
  const cards = Array.from(track.querySelectorAll('.letter-card'));
  const btnPrev = root.querySelector('.letters-btn.prev');
  const btnNext = root.querySelector('.letters-btn.next');
  if (cards.length < 2) return;

  // --- геометрия/утилиты ---
  const centerLeft = (el)=> el.offsetLeft - (track.clientWidth - el.offsetWidth)/2;
  function nearestIndex(){
    const center = track.scrollLeft + track.clientWidth/2;
    let best=0, dmin=Infinity;
    for(let i=0;i<cards.length;i++){
      const mid = cards[i].offsetLeft + cards[i].offsetWidth/2;
      const d = Math.abs(mid - center);
      if (d<dmin){ dmin=d; best=i; }
    }
    return best;
  }
  function scrollToIndex(i, behavior = 'smooth') {
    i = Math.max(0, Math.min(cards.length - 1, i));
    const target = Math.round(centerLeft(cards[i]));

    // анти-липкость: если целевое ≈ текущее, толкнём на 1px, затем в цель
    if (Math.abs(track.scrollLeft - target) < 1) {
      track.scrollBy({ left: 1, behavior: 'auto' });
    }
    requestAnimationFrame(() => {
      track.scrollTo({ left: target, behavior });
    });
    // ВАЖНО: current НЕ трогаем здесь — обновится в scroll-хендлере
  }

  let current = 0;

  function updateArrowsByScroll() {
    current = nearestIndex();
    const leftEdge  = track.scrollLeft;
    const rightEdge = track.scrollWidth - track.clientWidth - track.scrollLeft;
    const EPS = 4; // порог, компенсирующий дробные значения scrollLeft
    btnPrev?.classList.toggle('is-hidden', leftEdge <= EPS);
    btnNext?.classList.toggle('is-hidden', rightEdge <= EPS);
  }

  // стрелки
  btnPrev?.addEventListener('click', () => scrollToIndex(current - 1, 'smooth'));
  btnNext?.addEventListener('click', () => scrollToIndex(current + 1, 'smooth'));

  // drag/swipe (без pointer-capture)
  let down=false, sx=0, ss=0, moved=0; const TH=5;
  track.addEventListener('pointerdown', e=>{down=true; sx=e.clientX; ss=track.scrollLeft; moved=0;});
  track.addEventListener('pointermove', e=>{ if(!down) return; const dx=e.clientX-sx; moved=Math.max(moved,Math.abs(dx)); track.scrollLeft=ss-dx; });
  ['pointerup','pointercancel','mouseleave'].forEach(ev=> track.addEventListener(ev, ()=>{ down=false; }));
  track.addEventListener('click', e=>{ if(moved>TH){ e.preventDefault(); e.stopPropagation(); } });

  // синхронизация по фактической прокрутке
  const deb = (fn, t = 60) => { let id = null; return (...a) => { clearTimeout(id); id = setTimeout(() => fn(...a), t); }; };
  track.addEventListener('scroll', deb(updateArrowsByScroll, 40));
  window.addEventListener('resize', deb(() => { scrollToIndex(current, 'auto'); updateArrowsByScroll(); }, 120));

  // старт
  requestAnimationFrame(() => { scrollToIndex(0, 'auto'); updateArrowsByScroll(); });

  // --- 3) ПИНГ-ПОНГ (опционально): включается только если data-pp="on" на .letters-slider ---
  if (root.getAttribute('data-pp') === 'on'){
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!reduced.matches){
      const attrSpeed = Number(root.getAttribute('data-pp-speed'));
      const SPEED_DESK = isNaN(attrSpeed) ? 40 : attrSpeed;
      const SPEED_MOB  = isNaN(attrSpeed) ? 26 : attrSpeed;
      const SPEED = window.matchMedia('(max-width: 860px)').matches ? SPEED_MOB : SPEED_DESK;

      let rafId=0, playing=false, userHold=false, lastTs=0, dir=+1;
      let prevSnap=''; const snapOff=()=>{ prevSnap=track.style.scrollSnapType; track.style.scrollSnapType='none'; };
      const snapOn =()=>{ track.style.scrollSnapType=prevSnap||'x mandatory'; };

      function bounds(){
        const left  = Math.max(0, Math.round(centerLeft(cards[0])));
        const right = Math.max(0, Math.round(centerLeft(cards[cards.length-1])));
        return {left,right,span:Math.max(1,right-left)};
      }
      const speedFactor = (p)=> 0.6 + 0.4*Math.sin(Math.PI * Math.max(0,Math.min(1,p))); // быстрее в середине

      function step(ts){
        if(!lastTs) lastTs=ts;
        const dt=(ts-lastTs)/1000; lastTs=ts;
        const {left,right,span}=bounds();
        const prog=(track.scrollLeft-left)/span;
        const v=SPEED*speedFactor(prog);
        let next=track.scrollLeft + dir*v*dt;
        if (next<=left){ next=left; dir=+1; }
        if (next>=right){ next=right; dir=-1; }
        track.scrollLeft=next;
        rafId=requestAnimationFrame(step);
      }
      function start(){ if(playing||userHold) return; playing=true; lastTs=0; snapOff(); rafId=requestAnimationFrame(step); }
      function stop(){ if(!playing) return; playing=false; cancelAnimationFrame(rafId); rafId=0; snapOn(); }

      const io=new IntersectionObserver((en)=>{ const vis=en[0]?.isIntersecting; if (vis && !userHold) start(); else stop(); }, {threshold:0.2});
      io.observe(root);

      ['pointerdown','mouseenter','focusin','touchstart'].forEach(ev=> root.addEventListener(ev, ()=>{userHold=true; stop();},{passive:true}));
      ['pointerup','mouseleave','focusout','touchend','touchcancel'].forEach(ev=> root.addEventListener(ev, ()=>{userHold=false; setTimeout(start,800);},{passive:true}));

      // инициализация пинг-понга
      const {left}=bounds(); track.scrollLeft=left; dir=+1; start();
    }
  }
})();

// === Общий лайтбокс (письма + фото) с делегированным кликом + свайп + прелоад ===
(function initImageLightbox(){
  const modal    = document.getElementById('letter-modal');
  const modalImg = modal?.querySelector('.letter-modal-img');
  const closeBtn = modal?.querySelector('.modal__close');
  const overlay  = modal?.querySelector('.modal__overlay');
  if (!modal || !modalImg) return;

  // Безопасные отступы от краёв окна (чтобы не прилипало)
  const PADDING = 64; // px (32 с каждой стороны)

  function fitToViewport(imgEl){
    if (!modal.classList.contains('active')) return;
    // Натуральные размеры файла
    const natW = imgEl.naturalWidth  || imgEl.width  || 1000;
    const natH = imgEl.naturalHeight || imgEl.height || 1400;

    // Доступная область экрана (минус безопасные поля)
    const vw = Math.max(0, window.innerWidth  - PADDING);
    const vh = Math.max(0, window.innerHeight - PADDING);

    // Масштаб без обрезки
    const scale = Math.min(vw / natW, vh / natH, 1); // не увеличиваем сверх 100% качества
    const w = Math.floor(natW * scale);
    const h = Math.floor(natH * scale);

    imgEl.style.width  = w + 'px';
    imgEl.style.height = h + 'px';
  }

  // Публичный хук: вызывать после установки src
  function applySizingWhenReady(){
    if (modalImg.complete) fitToViewport(modalImg);
    else modalImg.addEventListener('load', ()=>fitToViewport(modalImg), { once:true });
  }

  // Пересчёт на ресайз (debounce)
  window.addEventListener('resize', debounce(()=>{
    if (modal.classList.contains('active')) fitToViewport(modalImg);
  }, 100));

  function srcFromCard(card){
    const img = card.querySelector('img');
    return card.getAttribute('data-full') || img?.src || '';
  }
  function altFromCard(card){
    const img = card.querySelector('img');
    return card.getAttribute('data-alt') || img?.alt || '';
  }

  // Прелоад изображения для соседней карточки
  const preload = (i)=>{
    const el = currentList[i]; if (!el) return;
    const src = srcFromCard(el);
    if (!src) return;
    const im = new Image(); im.src = src;
  };

  let currentList = []; // массив элементов внутри активной секции
  let index = -1;
  let groupName = '';

  function openFromCard(card){
    const container = card.closest('.letters-slider, .photos-slider, [data-proof-cases-grid]');
    if (!container) return;

    // Собираем список внутри текущей секции, чтобы работала навигация ← →
    const selector = card.hasAttribute('data-letter-modal') ? '[data-letter-modal]' : '[data-image-modal]';
    currentList = Array.from(container.querySelectorAll(selector));
    index = currentList.indexOf(card);
    groupName = card.hasAttribute('data-letter-modal') ? 'letters' : 'photos';

    const src = srcFromCard(card);
    const alt = altFromCard(card);
    if (!src) return;

    modalImg.src = src;
    modalImg.alt = alt || '';
    
    // Подготовка и запуск въезда справа
    modalImg.classList.remove('fade-in-left','fade-in-right','fade-out-left','fade-out-right','enter-from-left','enter-from-right');
    modalImg.classList.add('enter-from-right');
    void modalImg.offsetWidth;              // форс перерисовку
    modalImg.classList.remove('enter-from-right');
    modalImg.classList.add('fade-in-right');
    
    // Переключаем белый фон в зависимости от источника (письма/фото)
    if (groupName === 'photos') modal.classList.add('modal--photo');
    else modal.classList.remove('modal--photo');
    modal.classList.add('active');
    lockPageScroll(); // блокируем прокрутку страницы

    if (typeof ym === 'function') ym(COUNTER_ID, 'reachGoal', 'lightbox_open_' + groupName);
    
    // Применяем адаптивный размер
    applySizingWhenReady();
    updateNavButtons();
    
    // Прелоад соседей
    preload(index + 1);
    preload(index - 1);
  }

  // Делегированный клик по документу — сработает и при сложной вложенности
  document.addEventListener('click', (e)=>{
    const card = e.target.closest?.('[data-letter-modal], [data-image-modal]');
    if (!card) return;
    
    // На мобилке отключаем модальное окно ТОЛЬКО ДЛЯ ФОТОГАЛЕРЕИ (письма открываются!)
    if (window.innerWidth <= 768 && card.hasAttribute('data-image-modal')) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    
    openFromCard(card);
  });

  function closeModal(){
    modal.classList.remove('active');
    unlockPageScroll(); // восстанавливаем прокрутку страницы
    modalImg.src = '';
    index = -1; currentList = []; groupName = '';
    updateNavButtons();
  }

  function navigate(dir){
    if (!currentList.length || index < 0) return;
    const next = index + dir;
    if (next < 0 || next >= currentList.length) return;

    const outClass = dir === 1 ? 'fade-out-left'  : 'fade-out-right';
    const prepIn   = dir === 1 ? 'enter-from-right' : 'enter-from-left';
    const inClass  = dir === 1 ? 'fade-in-right'    : 'fade-in-left';

    // уводим текущее
    modalImg.classList.remove('fade-in-left','fade-in-right','enter-from-left','enter-from-right');
    modalImg.classList.add(outClass);

    setTimeout(() => {
      const card = currentList[next];
      modalImg.src = srcFromCard(card);
      modalImg.alt = altFromCard(card);

      // готовим новое с правильной стороны -> запускаем въезд
      modalImg.classList.remove(outClass);
      modalImg.classList.add(prepIn);
      void modalImg.offsetWidth;            // тик
      modalImg.classList.remove(prepIn);
      modalImg.classList.add(inClass);

      index = next;
      applySizingWhenReady();
      updateNavButtons();
      preload(index + dir);
    }, 180); // короче .45s, чтобы ощущалось быстрее
  }

  // Навигационные стрелки
  const prevBtn = modal?.querySelector('.modal-prev');
  const nextBtn = modal?.querySelector('.modal-next');

  function updateNavButtons(){
    const total = currentList.length;
    const hidePrev = !total || index <= 0;
    const hideNext = !total || index >= total - 1;
    prevBtn?.classList.toggle('is-hidden', hidePrev);
    nextBtn?.classList.toggle('is-hidden', hideNext);
  }
  
  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);
  modalImg?.addEventListener('click', closeModal);
  prevBtn?.addEventListener('click', ()=> navigate(-1));
  nextBtn?.addEventListener('click', ()=> navigate(+1));

  document.addEventListener('keydown', (e)=>{
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape')     closeModal();
    if (e.key === 'ArrowRight') navigate(+1);
    if (e.key === 'ArrowLeft')  navigate(-1);
  });

  // Свайп внутри модалки
  let down=false, sx=0;
  modal.addEventListener('pointerdown', e=>{ down=true; sx=e.clientX; });
  modal.addEventListener('pointerup', e=>{
    if(!down) return; down=false;
    const dx=e.clientX-sx;
    if (Math.abs(dx)>40) navigate(dx<0?+1:-1);
  });
})();

// === Инициализация фото-слайдера (без pointer-capture; авто-ширина по аспекту) ===
(function initPhotosSlider(){
  const root = document.querySelector('.photos-slider');
  if (!root) return;

  const track = root.querySelector('.photos-track');
  const cards = Array.from(track.querySelectorAll('.photo-card'));
  const prev  = root.querySelector('.photos-btn.prev');
  const next  = root.querySelector('.photos-btn.next');
  if (!track) return;

  function fitCardWidth(card, img){
    // На мобилке отключаем динамическую ширину - используем CSS aspect-ratio 4:3
    if (window.innerWidth <= 768) {
      card.style.width = ''; // сбрасываем любые inline-стили
      card.style.height = '';
      return;
    }
    
    const h  = card.getBoundingClientRect().height;
    const w  = img.naturalWidth  || img.width;
    const nh = img.naturalHeight || img.height;
    if (!w || !nh || !h) return;
    const ratio = w / nh;
    const target = Math.max(160, Math.min(h * ratio, 1000));
    card.style.width = `${Math.round(target)}px`;
  }
  function layout(){
    cards.forEach(card=>{
      const img = card.querySelector('img'); if (!img) return;
      // Мгновенно применяем размеры без анимации
      card.style.transition = 'none';
      if (img.complete) {
        fitCardWidth(card, img);
      } else {
        img.addEventListener('load', ()=> {
          fitCardWidth(card, img);
          // Включаем анимацию обратно после загрузки
          setTimeout(() => card.style.transition = '', 100);
        }, { once:true });
      }
    });
  }

  // КОПИРУЕМ ЛОГИКУ ПИСЕМ: точное позиционирование вместо scrollBy
  function centerLeft(card) {
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    return track.scrollLeft + (cardRect.left - trackRect.left) - (trackRect.width - cardRect.width) / 2;
  }
  
  function nearestIndex() {
    const mid = track.scrollLeft + track.clientWidth / 2;
    let dmin = Infinity, best = 0;
    for (let i = 0; i < cards.length; i++) {
      const center = centerLeft(cards[i]);
      const d = Math.abs(mid - center);
      if (d < dmin) { dmin = d; best = i; }
    }
    return best;
  }
  
  function scrollToIndex(i, behavior = 'smooth') {
    i = Math.max(0, Math.min(cards.length - 1, i));
    const target = Math.round(centerLeft(cards[i]));

    // анти-липкость: если целевое ≈ текущее, толкнём на 1px, затем в цель
    if (Math.abs(track.scrollLeft - target) < 1) {
      track.scrollBy({ left: 1, behavior: 'auto' });
    }
    requestAnimationFrame(() => {
      track.scrollTo({ left: target, behavior });
    });
  }
  const scrollByX  = dir => {
    const step = scrollStep();
    track.scrollBy({ left: dir * step, behavior:'smooth' });
    
    // iOS-фикс: принудительная проверка позиции
    setTimeout(() => {
      const expectedPos = track.scrollLeft + (dir * step);
      const actualPos = track.scrollLeft;
      const diff = Math.abs(expectedPos - actualPos);
      if (diff > 20) { // если не доехало, принудительно доезжаем
        track.scrollBy({ left: dir * step, behavior: 'auto' });
      }
    }, 150);
  };
  let current = 0;
  
  // ПРЕЗАГРУЗКА ДЛЯ МОБИЛЬНОЙ ВЕРСИИ
  function preloadAdjacentImages() {
    if (window.innerWidth > 768) return; // ТОЛЬКО НА МОБИЛКЕ
    
    // Предзагружаем предыдущее изображение
    if (current > 0) {
      const prevImg = new Image();
      prevImg.src = cards[current - 1].querySelector('img').src;
    }
    
    // Предзагружаем следующее изображение
    if (current < cards.length - 1) {
      const nextImg = new Image();
      nextImg.src = cards[current + 1].querySelector('img').src;
    }
  }
  
  prev?.addEventListener('click', () => {
    current = Math.max(0, current - 1);
    scrollToIndex(current, 'smooth');
    preloadAdjacentImages(); // ПРЕЗАГРУЖАЕМ ПОСЛЕ ПЕРЕКЛЮЧЕНИЯ
  });
  next?.addEventListener('click', () => {
    current = Math.min(cards.length - 1, current + 1);
    scrollToIndex(current, 'smooth');
    preloadAdjacentImages(); // ПРЕЗАГРУЖАЕМ ПОСЛЕ ПЕРЕКЛЮЧЕНИЯ
  });
  
  // ПРЕЗАГРУЗКА ПРИ ЗАГРУЗКЕ СТРАНИЦЫ (МОБИЛКА)
  if (window.innerWidth <= 768) {
    preloadAdjacentImages();
  }

  function updateArrows() {
    const leftEdge  = track.scrollLeft;
    const rightEdge = track.scrollWidth - track.clientWidth - track.scrollLeft;
    const EPS = 4;
    prev?.classList.toggle('is-hidden', leftEdge <= EPS);
    next?.classList.toggle('is-hidden', rightEdge <= EPS);
  }

  track.addEventListener('keydown', (e)=>{
    if (e.key === 'ArrowRight') scrollByX(1);
    if (e.key === 'ArrowLeft')  scrollByX(-1);
  });

  // Drag / Swipe без pointer-capture
  let isDown = false, startX = 0, startScroll = 0, moved = 0;
  const dragThreshold = 5;

  track.addEventListener('pointerdown', (e)=>{
    isDown = true; moved = 0;
    startX = e.clientX; startScroll = track.scrollLeft;
  });
  track.addEventListener('pointermove', (e)=>{
    if(!isDown) return;
    const dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    track.scrollLeft = startScroll - dx;
  });
  ['pointerup','pointercancel','mouseleave'].forEach(ev=>{
    track.addEventListener(ev, ()=>{ isDown=false; });
  });
  track.addEventListener('click', (e)=>{ if (moved > dragThreshold) { e.stopPropagation(); e.preventDefault(); } });

  track.addEventListener('scroll', debounce(updateArrows, 40));
  
  // Инициализация с повторными попытками для медленных соединений
  layout();
  setTimeout(layout, 500);   // повтор через 0.5с
  setTimeout(layout, 1500);  // повтор через 1.5с
  
  let t=null; window.addEventListener('resize', ()=>{ clearTimeout(t); t=setTimeout(()=>{ layout(); updateArrows(); }, 120); });
  requestAnimationFrame(updateArrows);
})();

// PATCH BEGIN: CONFIRMED_CORPORATE_LEAD_HELPER
const CORPORATE_LEAD_ENDPOINT = 'https://calcul.timurgromov.ru/api/v1/site/consultation-request';
const CORPORATE_TRACKING_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'yclid',
  'direct_campaign_id',
  'direct_source_type',
  'direct_region_id',
  'creative_id'
];

function collectCorporateTracking() {
  const params = new URLSearchParams(window.location.search);
  const campaignParams = {};
  CORPORATE_TRACKING_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) campaignParams[key] = value.slice(0, 500);
  });

  let referrerHost = '';
  try {
    referrerHost = document.referrer ? new URL(document.referrer).hostname.toLowerCase() : '';
  } catch (_) {}

  const medium = (params.get('utm_medium') || '').toLowerCase();
  const source = (params.get('utm_source') || '').toLowerCase();
  const channel = params.get('yclid') || params.get('direct_campaign_id') || /cpc|paid|ppc/.test(medium)
    ? 'paid'
    : /yandex\.|google\./.test(referrerHost)
      ? 'organic'
      : referrerHost && referrerHost !== window.location.hostname
        ? 'referral'
        : 'direct';
  const engine = source.includes('yandex') || referrerHost.includes('yandex.')
    ? 'yandex'
    : source.includes('google') || referrerHost.includes('google.')
      ? 'google'
      : '';

  const current = {
    campaignParams,
    yclid: (params.get('yclid') || '').slice(0, 255),
    attributionContext: {
      channel,
      engine,
      referrer_host: referrerHost,
      landing_path: window.location.pathname
    }
  };

  try {
    const storageKey = 'corp_seasonal_tracking_v1';
    const saved = JSON.parse(window.sessionStorage.getItem(storageKey) || 'null');
    if (saved && typeof saved === 'object') return saved;
    window.sessionStorage.setItem(storageKey, JSON.stringify(current));
  } catch (_) {}

  return current;
}

function normalizeCorporatePhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('8')) return `+7${digits.slice(1)}`;
  if (digits.length === 10) return `+7${digits}`;
  return digits ? `+${digits}` : '';
}

function normalizeCtaToken(value, fallback) {
  const normalized = String(value || '').trim().toLowerCase();
  return /^[a-z0-9][a-z0-9_-]{0,63}$/.test(normalized) ? normalized : fallback;
}

function corporateCtaContext(source, supplied = {}) {
  const seasonalPage = window.location.pathname.includes('novogodniy-korporativ') ? 'new_year' : 'corporate';
  const sourceText = String(source || '').toLowerCase();
  const inferredIntent = sourceText.includes('materials') ? 'materials'
    : sourceText.includes('video') || sourceText.includes('meeting') ? 'meeting'
      : 'consultation';
  const inferredPlacement = sourceText.includes('materials') ? 'materials'
    : sourceText.includes('hero') ? 'hero'
      : sourceText.includes('workflow') ? 'workflow'
        : sourceText.includes('cta') ? 'final_cta'
          : 'contact_popup';
  const context = {
    site: supplied.site || supplied.ctaSite || 'corporate',
    page: supplied.page || supplied.ctaPage || seasonalPage,
    intent: supplied.intent || supplied.ctaIntent || inferredIntent,
    placement: supplied.placement || supplied.ctaPlacement || inferredPlacement
  };
  return window.tgCtaAnalytics?.normalize(context) || {
    site: normalizeCtaToken(context.site, 'corporate'),
    page: normalizeCtaToken(context.page, seasonalPage),
    intent: normalizeCtaToken(context.intent, inferredIntent),
    placement: normalizeCtaToken(context.placement, inferredPlacement)
  };
}

function trackCorporateCtaGoal(goal, context) {
  window.tgCtaAnalytics?.track(goal, context);
}

async function sendCorporateLead(name, phone, source = 'popup', suppliedContext = {}) {
  const previewState = new URLSearchParams(window.location.search).get('preview_lead_state');
  const isLocalPreview = ['127.0.0.1', 'localhost'].includes(window.location.hostname);
  if (isLocalPreview && previewState === 'success') return true;
  if (isLocalPreview && previewState === 'error') return false;

  const tracking = collectCorporateTracking();
  const context = corporateCtaContext(source, suppliedContext);
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 12000);
  const selectionSummary = String(suppliedContext.selectionSummary || '').trim();
  const payload = {
    name: String(name || '').trim(),
    phone: normalizeCorporatePhone(phone),
    comment: [
      'Запрос с корпоративного сайта',
      selectionSummary,
      `Форма: ${String(source).slice(0, 120)}`
    ].filter(Boolean).join('\n'),
    form_source: `site_meeting_corporate__${context.page}__${context.intent}__${context.placement}`,
    page_url: `${window.location.origin}${window.location.pathname}`.slice(0, 500),
    yclid: tracking.yclid || null,
    campaign_params: Object.keys(tracking.campaignParams).length ? tracking.campaignParams : null,
    attribution_context: tracking.attributionContext,
    cta_site: context.site,
    cta_page: context.page,
    cta_intent: context.intent,
    cta_placement: context.placement
  };

  try {
    const response = await fetch(CORPORATE_LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'omit',
      signal: controller.signal,
      body: JSON.stringify(payload)
    });
    return response.status === 201;
  } catch (_) {
    return false;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
window.sendCorporateLead = sendCorporateLead;
// PATCH END: CONFIRMED_CORPORATE_LEAD_HELPER

// ===== HEADER: HIDE ON SCROLL DOWN, SHOW ON SCROLL UP =====
(function initHeaderScroll() {
  const header = document.querySelector('.site-header.glass.fixed');
  if (!header) return;

  const DELTA = 8;
  let lastScroll = window.scrollY || window.pageYOffset;
  let pinnedUntil = 0;
  let ticking = false;

  header.querySelectorAll('[data-section-nav] a').forEach((link) => {
    link.addEventListener('click', () => {
      pinnedUntil = Date.now() + 900;
      header.classList.remove('header-hidden');
    });
  });

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY || window.pageYOffset;

        if (currentScroll <= 16 || Date.now() < pinnedUntil) {
          header.classList.remove('header-hidden');
        } else if (currentScroll > lastScroll + DELTA && currentScroll > header.offsetHeight) {
          header.classList.add('header-hidden');
        } else if (currentScroll < lastScroll - DELTA) {
          header.classList.remove('header-hidden');
        }

        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // применить состояние при загрузке
})();

// Анимации отключены - фото всегда видны

// ===== МОБИЛЬНАЯ ГАЛЕРЕЯ: ОПРЕДЕЛЕНИЕ ПОРТРЕТНЫХ ФОТО =====
(function () {
  const BP = 860;

  function markPortraits() {
    const scope = document; // можно сузить до корня галереи
    const imgs = scope.querySelectorAll(
      '.photo-card img'
    );

    imgs.forEach(img => {
      const apply = () => {
        // Снимаем инлайны, которые ломают адаптив
        if (window.innerWidth <= BP) {
          img.style.width = '';
          img.style.height = '';
          img.parentElement && (img.parentElement.style.height = '');
        }
        // Проставляем класс ориентации
        if (img.naturalHeight > img.naturalWidth) {
          img.classList.add('is-portrait');
        } else {
          img.classList.remove('is-portrait');
        }
      };

      if (img.complete && img.naturalWidth) {
        apply();
      } else {
        img.addEventListener('load', apply, { once: true });
        img.addEventListener('error', () => img.classList.remove('is-portrait'), { once: true });
      }
    });
  }

  // debounced resize для безопасной перекалибровки
  let t;
  function onResize() {
    clearTimeout(t);
    t = setTimeout(() => {
      if (window.innerWidth <= BP) markPortraits();
    }, 120);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= BP) markPortraits();
  });
  window.addEventListener('resize', onResize);
})();

// ===== WORKFLOW: анимация линии при входе в viewport (только мобила) =====
(function () {
  if (!window.matchMedia('(max-width: 768px)').matches) return;

  const el = document.querySelector('#workflow .container');
  if (!el) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        el.classList.add('wf-line-play');
        io.disconnect();
      }
    });
  }, { rootMargin: '0px 0px -20% 0px', threshold: 0.2 });

  io.observe(el);
})();

// =======================
//  METRIKA GOALS — bundle
// =======================
const METRIKA_ID = 104468814;

// Безопасная отправка: не упадёт, если ym() нет
function sendGoal(name){
  try{ if(typeof ym==='function' && METRIKA_ID){ ym(METRIKA_ID,'reachGoal',name); } }catch(e){}
}

// 0) Вовлечённость: 30 секунд на странице
setTimeout(()=>sendGoal('engaged_30s'), 30000);

// 1) Конверсии: WhatsApp И телефон — чётко и раздельно
(function trackContacts(){
  const YM_ID = 104468814;
  const send = name => { 
    try{ 
      if (typeof ym==='function') ym(YM_ID,'reachGoal',name); 
    } catch(e){} 
  };

  // WhatsApp (любой wa.me / api.whatsapp / data-cta начинается с whatsapp)
  document.querySelectorAll(
    'a[href*="wa.me/"],a[href*="api.whatsapp.com"],.whatsapp-button,[data-cta^="whatsapp"]'
  ).forEach(a=>{
    a.addEventListener('click', ()=> send('whatsapp_click'), { once:true });
    a.addEventListener('pointerdown', ()=> send('whatsapp_click'), { once:true, passive:true });
  });

  // Телефон (любой tel:) — общая цель tel_click
  document.querySelectorAll('a[href^="tel:"]').forEach(a=>{
    a.addEventListener('click', ()=> send('tel_click'), { once:true });
    a.addEventListener('pointerdown', ()=> send('tel_click'), { once:true, passive:true });
  });

  // Плавающая FAB на мобиле (отдельная цель для неё)
  const fab = document.querySelector('.wa-fab');
  if (fab) {
    fab.addEventListener('click', ()=> {
      if (fab.getAttribute('data-cta') === 'tel_fab') {
        send('tel_fab');
      }
    }, { once:true });
    fab.addEventListener('pointerdown', ()=> {
      if (fab.getAttribute('data-cta') === 'tel_fab') {
        send('tel_fab');
      }
    }, { once:true, passive:true });
  }
})();

// 2) Соцсети (VK / YouTube / Instagram / Threads / Telegram)
(function bindSocial(){
  const domains = ['vk.com','youtube.com','youtu.be','instagram.com','threads.net','t.me','telegram.me'];
  document.querySelectorAll('a[href]').forEach(a=>{
    const href = a.getAttribute('href') || '';
    if (domains.some(d=>href.includes(d))){
      a.addEventListener('click', ()=> sendGoal('click_social'), { once:true });
    }
  });
})();

// 3) HTML5-видео: video_play (старт) + video_50 (50%)
// страховка: если play отработал до подписки (динамическая вставка), фиксим на первом признаке воспроизведения
(function bindHTML5Video(){
  function attach(v){
    if(!v || v.__ymTracked) return;
    v.__ymTracked = true;

    let startedSent = false;
    let halfSent    = false;

    v.addEventListener('play', () => {
      if (!startedSent) {
        startedSent = true;
        sendGoal('video_play');
      }
    }, { once:true });

    const fireProgress = ()=>{
      const dur = v.duration || 0;
      const cur = v.currentTime || 0;

      if (!startedSent && cur > 0){
        startedSent = true;
        sendGoal('video_play');
      }

      if (!halfSent && dur > 0 && cur / dur >= 0.5){
        halfSent = true;
        sendGoal('video_50');
      }
    };

    v.addEventListener('timeupdate', fireProgress);
    v.addEventListener('loadedmetadata', fireProgress, { once:true });

    if (!v.paused) setTimeout(fireProgress, 0);
  }

  document.querySelectorAll('video').forEach(attach);

  const mo = new MutationObserver(ms=>{
    ms.forEach(m=> m.addedNodes.forEach(n=>{
      if(n.tagName==='VIDEO') attach(n);
      else if(n.querySelectorAll) n.querySelectorAll('video').forEach(attach);
    }));
  });
  mo.observe(document.documentElement, { childList:true, subtree:true });
})();

// 4) (опционально) Формы — на будущее
(function bindForms(){
  document.querySelectorAll('form').forEach(f=>{
    f.addEventListener('submit', ()=> sendGoal('form_submit'), { once:true });
  });
})();

// ===== ПОП-АП "Обсудить корпоратив" =====
(function initContactPopup() {
  function init() {
    const modal = document.getElementById('contact-popup-modal');
    const form = document.getElementById('contact-popup-form');
    const successMsg = document.getElementById('contact-popup-success');
    const nameInput = document.getElementById('contact-name');
    const phoneInput = document.getElementById('contact-phone');
    const status = form?.querySelector('[data-lead-status]');
    const submit = form?.querySelector('button[type="submit"]');
    const closeBtn = modal?.querySelector('.modal__close');
    const overlay = modal?.querySelector('.modal__overlay');
    const triggers = document.querySelectorAll('[data-modal="contact-popup"]');
    let currentContactSource = 'contact_popup';
    let currentContactContext = corporateCtaContext(currentContactSource);
    let currentContactSelectionSummary = '';
    let contactFormStarted = false;

    if (!modal || !form || !triggers.length) return;

  function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.startsWith('8')) value = '7' + value.slice(1);
    if (!value.startsWith('7')) value = '7' + value;
    value = value.slice(0, 11);
    
    let formatted = '+7';
    if (value.length > 1) formatted += ' (' + value.slice(1, 4);
    if (value.length > 4) formatted += ') ' + value.slice(4, 7);
    if (value.length > 7) formatted += '-' + value.slice(7, 9);
    if (value.length > 9) formatted += '-' + value.slice(9, 11);
    
    input.value = formatted;
    return value;
  }

  phoneInput?.addEventListener('input', () => formatPhone(phoneInput));
  phoneInput?.addEventListener('focus', () => {
    if (!phoneInput.value) phoneInput.value = '+7 (';
  });
  form.addEventListener('input', () => {
    if (contactFormStarted) return;
    contactFormStarted = true;
    trackCorporateCtaGoal('form_start', currentContactContext);
  });

  function openModal() {
    form.hidden = false;
    successMsg.hidden = true;
    if (submit) {
      submit.disabled = false;
      submit.textContent = 'Отправить';
    }
    if (status) {
      status.textContent = '';
      delete status.dataset.state;
    }
    modal.classList.add('active');
    lockPageScroll();
  }

  function closeModal() {
    modal.classList.remove('active');
    unlockPageScroll();
    form.hidden = false;
    successMsg.hidden = true;
    form.reset();
    if (submit) {
      submit.disabled = false;
      submit.textContent = 'Отправить';
    }
    if (status) {
      status.textContent = '';
      delete status.dataset.state;
    }
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      currentContactSource = btn.dataset.formSource || 'contact_popup';
      currentContactContext = corporateCtaContext(currentContactSource, btn.dataset);
      currentContactSelectionSummary = btn.dataset.contactSelectionSummary || '';
      contactFormStarted = false;
      openModal();
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const phoneDigits = phoneInput.value.replace(/\D/g, '');
      const displayPhone = phoneInput.value.trim() || `+${phoneDigits}`;

      if (!name || phoneDigits.length < 11) {
        if (status) {
          status.textContent = 'Проверьте имя и номер телефона.';
          status.dataset.state = 'error';
        }
        if (!name) nameInput.focus();
        else phoneInput.focus();
        return;
      }

      if (submit) {
        submit.disabled = true;
        submit.textContent = 'Отправляем…';
      }
      if (status) {
        status.textContent = 'Передаём заявку в рабочий контур.';
        status.dataset.state = 'sending';
      }

      const created = await sendCorporateLead(name, displayPhone, currentContactSource, {
        ...currentContactContext,
        selectionSummary: currentContactSelectionSummary
      });
      if (!created) {
        if (status) {
          status.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь со мной по телефону.';
          status.dataset.state = 'error';
        }
        if (submit) {
          submit.disabled = false;
          submit.textContent = 'Повторить отправку';
        }
        trackCorporateCtaGoal('lead_submit_error', currentContactContext);
        return;
      }

      form.hidden = true;
      successMsg.hidden = false;
      if (status) status.textContent = '';

      if (typeof ym === 'function') {
        ym(104468814, 'reachGoal', 'contact_popup_submit');
      }
      trackCorporateCtaGoal('lead_submit_success', currentContactContext);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ===== Модалка "Видеоконсультация" =====
(function(){
  // PATCH BEGIN: VIDEO_MODAL_SOURCES
  const SOURCE_DEFAULT = 'hero_video';
  let currentVideoSource = SOURCE_DEFAULT;
  let currentVideoContext = corporateCtaContext(`video_consult:${SOURCE_DEFAULT}`);
  let videoFormStarted = false;
  // PATCH END: VIDEO_MODAL_SOURCES
  const modal = document.getElementById('video-consult-modal');
  const form = document.getElementById('video-consult-form');
  const successMsg = document.getElementById('video-consult-success');
  const nameInput = document.getElementById('video-consult-name');
  const phoneInput = document.getElementById('video-consult-phone');
  const status = form?.querySelector('[data-lead-status]');
  const submit = form?.querySelector('button[type="submit"]');
  const openBtns = document.querySelectorAll('[data-modal="video-consult-modal"]');
  const closeBtn = modal?.querySelector('.modal__close');
  const overlay = modal?.querySelector('.modal__overlay');

  if (!modal || !openBtns.length) return;

  // Маска для телефона
  function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.startsWith('8')) value = '7' + value.slice(1);
    if (!value.startsWith('7')) value = '7' + value;
    value = value.slice(0, 11);
    
    let formatted = '+7';
    if (value.length > 1) formatted += ' (' + value.slice(1, 4);
    if (value.length > 4) formatted += ') ' + value.slice(4, 7);
    if (value.length > 7) formatted += '-' + value.slice(7, 9);
    if (value.length > 9) formatted += '-' + value.slice(9, 11);
    
    input.value = formatted;
    return value;
  }

  phoneInput?.addEventListener('input', () => formatPhone(phoneInput));
  phoneInput?.addEventListener('focus', () => {
    if (!phoneInput.value) phoneInput.value = '+7 (';
  });
  form?.addEventListener('input', () => {
    if (videoFormStarted) return;
    videoFormStarted = true;
    trackCorporateCtaGoal('form_start', currentVideoContext);
  });

  // PATCH BEGIN: VIDEO_MODAL_SOURCES
  function openModal(source = SOURCE_DEFAULT, suppliedContext = {}) {
    currentVideoSource = source;
    currentVideoContext = corporateCtaContext(`video_consult:${source}`, suppliedContext);
    videoFormStarted = false;
    if (form) form.hidden = false;
    if (successMsg) successMsg.hidden = true;
    if (submit) {
      submit.disabled = false;
      submit.textContent = 'Назначить встречу';
    }
    if (status) {
      status.textContent = '';
      delete status.dataset.state;
    }
    modal.classList.add('active');
    lockPageScroll();
  }

  function closeModal() {
    modal.classList.remove('active');
    unlockPageScroll();
    currentVideoSource = SOURCE_DEFAULT;
    if (form) {
      form.hidden = false;
      form.reset();
    }
    if (successMsg) successMsg.hidden = true;
    if (submit) {
      submit.disabled = false;
      submit.textContent = 'Назначить встречу';
    }
    if (status) {
      status.textContent = '';
      delete status.dataset.state;
    }
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const source = btn.dataset.formSource || SOURCE_DEFAULT;
      openModal(source, btn.dataset);
    });
  });
  // PATCH END: VIDEO_MODAL_SOURCES
  
  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Обработка формы
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const phoneDigits = phoneInput.value.replace(/\D/g, '');
      const displayPhone = phoneInput.value.trim() || `+${phoneDigits}`;

      if (!name || phoneDigits.length < 11) {
        if (status) {
          status.textContent = 'Проверьте имя и номер телефона.';
          status.dataset.state = 'error';
        }
        if (!name) nameInput.focus();
        else phoneInput.focus();
        return;
      }

      if (submit) {
        submit.disabled = true;
        submit.textContent = 'Отправляем…';
      }
      if (status) {
        status.textContent = 'Передаём заявку в рабочий контур.';
        status.dataset.state = 'sending';
      }

      const created = await sendCorporateLead(name, displayPhone, `video_consult:${currentVideoSource}`, currentVideoContext);
      if (!created) {
        if (status) {
          status.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь со мной по телефону.';
          status.dataset.state = 'error';
        }
        if (submit) {
          submit.disabled = false;
          submit.textContent = 'Повторить отправку';
        }
        trackCorporateCtaGoal('lead_submit_error', currentVideoContext);
        return;
      }

      form.hidden = true;
      if (successMsg) successMsg.hidden = false;
      if (status) status.textContent = '';

      // PATCH BEGIN: VIDEO_MODAL_SOURCES
      if (typeof ym === 'function') {
        ym(104468814, 'reachGoal', 'video_consult_submit');
        if (currentVideoSource === 'workflow_popup') {
          ym(104468814, 'reachGoal', 'workflow_popup_submit');
        }
        if (currentVideoSource === 'cta_popup') {
          ym(104468814, 'reachGoal', 'cta_popup_submit');
        }
      }
      trackCorporateCtaGoal('lead_submit_success', currentVideoContext);
      // PATCH END: VIDEO_MODAL_SOURCES
    });
  }
})();
