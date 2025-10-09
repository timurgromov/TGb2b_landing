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
    return img?.alt || '';
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
    const container = card.closest('.letters-slider, .photos-slider');
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
      if (img.complete) fitCardWidth(card, img);
      else img.addEventListener('load', ()=>fitCardWidth(card, img), { once:true });
    });
  }

  const scrollStep = () => track.clientWidth * 0.9;
  const scrollByX  = dir => track.scrollBy({ left: dir * scrollStep(), behavior:'smooth' });
  prev?.addEventListener('click', ()=>scrollByX(-1));
  next?.addEventListener('click', ()=>scrollByX( 1));

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

// ===== УМНОЕ ПЕРЕНАПРАВЛЕНИЕ ТЕЛЕФОННЫХ ССЫЛОК =====
(function initSmartPhoneRedirect() {
  // Определяем тип устройства
  function isMobilePhone() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // Проверяем на мобильные телефоны (не планшеты)
    const isMobile = /android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTablet = /ipad|android(?=.*tablet)|kindle|silk/i.test(userAgent);
    
    // Возвращаем true только для телефонов, не для планшетов
    return isMobile && !isTablet;
  }

  // Функция для обработки клика по телефонной ссылке
  function handlePhoneClick(e) {
    const isMobile = isMobilePhone();
    
    if (isMobile) {
      // На мобильном телефоне - обычный звонок по GSM
      // Ничего не делаем, позволяем браузеру обработать tel: ссылку
      return;
    } else {
      // На планшете/компьютере - переходим в Telegram
      e.preventDefault();
      
      const phoneNumber = '+79253900772';
      const telegramUrl = `https://t.me/+${phoneNumber}`;
      
      // Открываем Telegram в новой вкладке
      window.open(telegramUrl, '_blank', 'noopener,noreferrer');
      
      // Логируем событие для аналитики
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'phone_redirect',
          device_type: 'tablet_desktop',
          redirect_to: 'telegram',
          phone_number: phoneNumber
        });
      }
    }
  }

  // Добавляем обработчики для всех телефонных ссылок и кнопок
  document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
      link.addEventListener('click', handlePhoneClick);
    });
    
    // Добавляем обработчик для кнопки "Позвонить"
    const callBtn = document.querySelector('.call-btn');
    if (callBtn) {
      callBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handlePhoneClick(e);
      });
    }
  });
})();

// ===== HEADER: HIDE ON SCROLL DOWN, SHOW ON SCROLL UP =====
(function initHeaderScroll() {
  const header = document.querySelector('.site-header.glass.fixed');
  if (!header) return;

  const HIDE_AFTER = window.innerHeight; // скрывать после первого экрана
  let lastScroll = 0;
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY || window.pageYOffset;
        
        // Скрываем header при скролле вниз ПОСЛЕ первого экрана
        if (currentScroll > HIDE_AFTER) {
          if (currentScroll > lastScroll) {
            // скролл вниз → скрыть
            header.classList.add('header-hidden');
          } else {
            // скролл вверх → показать
            header.classList.remove('header-hidden');
          }
        } else {
          // в пределах первого экрана — всегда показываем
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

// ===== УМНАЯ ПЛАВАЮЩАЯ КНОПКА WHATSAPP =====
(function initSmartWhatsAppFAB() {
  const waFab = document.querySelector('.wa-fab');
  if (!waFab) return;

  // Показываем FAB только когда пользователь прокрутил > 1 экрана
  // Это убирает дублирование с header на первом экране
  function toggleFab() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    
    // Появляется после 100vh (полный экран)
    if (scrollTop > windowHeight) {
      waFab.classList.add('show');
    } else {
      waFab.classList.remove('show');
    }
  }

  // Throttled scroll с requestAnimationFrame для производительности
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        toggleFab();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  toggleFab(); // проверка при загрузке
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
