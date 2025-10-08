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

// === Инициализация слайдера писем с бесконечной прокруткой (с клонами) ===
(function initLettersSliderLoop(){
  const root  = document.querySelector('.letters-slider');
  if (!root) return;
  const track = root.querySelector('.letters-track');
  const prev  = root.querySelector('.letters-btn.prev');
  const next  = root.querySelector('.letters-btn.next');
  const dots  = document.getElementById('letters-dots');
  if (!track) return;

  const GAP = 12;
  const raf = window.requestAnimationFrame;

  // 1) Собираем исходные карточки и делаем клоны по краям
  let originals = Array.from(track.querySelectorAll('.letter-card:not(.is-clone)'));
  if (originals.length < 2) return;

  // Если клоны уже есть — не дублируем снова
  if (!track.__loopReady){
    const firstClone = originals[0].cloneNode(true);
    const lastClone  = originals[originals.length - 1].cloneNode(true);
    firstClone.classList.add('is-clone');
    lastClone.classList.add('is-clone');
    track.insertBefore(lastClone, originals[0]);
    track.appendChild(firstClone);
    track.__loopReady = true;
  }

  // После вставки клонов пересобираем список (включая клоны)
  const allCards = Array.from(track.querySelectorAll('.letter-card'));
  const firstIndex = 1;                       // индекс оригинального "0" в ленте с клонами
  const lastIndex  = allCards.length - 2;     // индекс оригинального "N-1"

  // Создаём индикатор точек (только для оригиналов)
  if (dots){
    dots.innerHTML = originals.map(()=>'<span class="slider-dot"></span>').join('');
  }

  // Хелперы размеров
  const cardWidth = () => allCards[firstIndex]?.getBoundingClientRect().width || 320;
  const step = () => cardWidth() + GAP;

  // Получаем текущий индекс
  function currentIndex(){
    const idx = Math.round(track.scrollLeft / step());
    return Math.max(0, Math.min(idx, allCards.length - 1));
  }

  // Прокручиваем к индексу
  function snapTo(index, behavior='auto'){
    track.scrollTo({ left: index * step(), behavior });
    updateDots();
  }

  // Стартовая позиция — на первом оригинале
  raf(()=> snapTo(firstIndex, 'auto'));

  // Навигация по кнопкам
  function move(dir){
    const from = currentIndex();
    
    console.log('🔄 MOVE DEBUG:', {
      direction: dir > 0 ? '→' : '←',
      from: from,
      firstIndex: firstIndex,
      lastIndex: lastIndex,
      totalCards: allCards.length,
      'from === lastIndex': from === lastIndex,
      'from === firstIndex': from === firstIndex
    });

    // Мы стоим на последнем ОРИГИНАЛЕ и жмём "вперёд" — упор в maxScroll.
    // Сразу прыгаем на первый ОРИГИНАЛ (без анимации), иначе браузер не дотянет до правого клона.
    if (dir > 0 && from === lastIndex){
      console.log('✅ ПРЫГАЕМ на первую! snapTo(', firstIndex, ')');
      snapTo(firstIndex, 'auto');   // мгновенно
      return;
    }

    // Мы стоим на первом ОРИГИНАЛЕ и жмём "назад" — симметрично.
    if (dir < 0 && from === firstIndex){
      console.log('✅ ПРЫГАЕМ на последнюю! snapTo(', lastIndex, ')');
      snapTo(lastIndex, 'auto');    // мгновенно
      return;
    }

    // Обычный шаг внутри диапазона оригиналов — плавно
    const to = from + dir;
    console.log('➡️ Обычная прокрутка к', to);
    track.scrollTo({ left: to * step(), behavior: 'smooth' });
  }

  prev?.addEventListener('click', ()=> move(-1));
  next?.addEventListener('click', ()=> move(1));

  track.addEventListener('keydown', (e)=>{
    if (e.key === 'ArrowRight') move(1);
    if (e.key === 'ArrowLeft')  move(-1);
  });

  // Drag/swipe
  let isDown=false, startX=0, startScroll=0, moved=0;
  const dragThreshold=5;
  track.addEventListener('pointerdown', e=>{ isDown=true; moved=0; startX=e.clientX; startScroll=track.scrollLeft; });
  track.addEventListener('pointermove', e=>{
    if (!isDown) return;
    const dx=e.clientX-startX; moved=Math.max(moved, Math.abs(dx));
    track.scrollLeft = startScroll - dx;
  });
  ['pointerup','pointercancel','mouseleave'].forEach(ev=>track.addEventListener(ev, ()=>{ isDown=false; }));
  track.addEventListener('click', e=>{ if (moved>dragThreshold){ e.preventDefault(); e.stopPropagation(); } });

  // Телепорт при ручной прокрутке на клоны
  const normalizeOnScroll = debounce(()=>{
    const idx = currentIndex();
    if (idx === 0) snapTo(lastIndex, 'auto');
    else if (idx === allCards.length - 1) snapTo(firstIndex, 'auto');
    else updateDots();
  }, 50);
  track.addEventListener('scroll', normalizeOnScroll);

  // Обновление точек
  function updateDots(){
    if (!dots) return;
    const idxAll = currentIndex();
    let logical = idxAll - 1;
    if (logical < 0) logical = originals.length - 1;
    if (logical >= originals.length) logical = 0;
    dots.querySelectorAll('.slider-dot').forEach((d,i)=> d.classList.toggle('is-active', i===logical));
  }

  // При ресайзе
  window.addEventListener('resize', debounce(()=>{
    const logical = Math.max(0, Math.min(originals.length-1, currentIndex()-1));
    snapTo(logical+1, 'auto');
  }, 150));
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
    // Переключаем белый фон в зависимости от источника (письма/фото)
    if (groupName === 'photos') modal.classList.add('modal--photo');
    else modal.classList.remove('modal--photo');
    modal.classList.add('active');
    lockPageScroll(); // блокируем прокрутку страницы

    if (typeof ym === 'function') ym(COUNTER_ID, 'reachGoal', 'lightbox_open_' + groupName);
    
    // Применяем адаптивный размер
    applySizingWhenReady();
    
    // Прелоад соседей
    preload((index+1)%currentList.length);
    preload((index-1+currentList.length)%currentList.length);
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
  }

  function navigate(dir){
    if (!currentList.length || index < 0) return;
    index = (index + dir + currentList.length) % currentList.length;
    const card = currentList[index];
    modalImg.src = srcFromCard(card);
    modalImg.alt = altFromCard(card);
    // Применяем адаптивный размер при навигации
    applySizingWhenReady();
    // Прелоад следующего в направлении навигации
    preload((index+dir+currentList.length)%currentList.length);
  }

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);
  modalImg?.addEventListener('click', closeModal);

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

  layout();
  let t=null; window.addEventListener('resize', ()=>{ clearTimeout(t); t=setTimeout(layout, 120); });
})();
