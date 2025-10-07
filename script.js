// Единая логика старта видео со звуком по клику для MP4 и Boomstream.
// Требования к разметке карточки:
// <div class="video-card" data-type="mp4" data-src="...mp4" data-poster="./photo/cover1.jpg"> или
// <div class="video-card" data-type="boom" data-boom="jaSBpguo" data-poster="./photo/cover2.jpg">
// Внутри должны быть .video-poster (img) и .video-play (кнопка).

(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Инициализация всех карточек один раз
  const cards = $$('.video-card');
  if (!cards.length) return;

  // Хелперы
  function mountMp4(card, src, poster) {
    // Создаем видео-элемент БЕЗ muted и БЕЗ предварительного autoplay
    const video = document.createElement('video');
    video.className = 'video-element';
    video.src = src;
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    if (poster) video.poster = poster;

    // Вставляем поверх карточки
    card.appendChild(video);

    // Так как есть пользовательский клик — сразу играем СО ЗВУКОМ
    video.play().catch(() => {
      // Если вдруг браузер попросил явного взаимодействия (редко):
      // оставляем controls — юзер нажмёт Play вручную
      video.setAttribute('controls', 'controls');
    });
  }

  function mountBoomstream(card, code) {
    // Встраиваем iframe без программного mute.
    // Поскольку вызов идёт из обработчика клика, звук разрешён политиками браузера.
    // Добавляем autoplay=1, чтобы старт произошёл сразу после клика и загрузки iframe.
    const url = `https://play.boomstream.com/${code}?autoplay=1`;
    const iframe = document.createElement('iframe');
    iframe.className = 'video-iframe';
    iframe.src = url;
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.loading = 'eager';
    card.appendChild(iframe);
  }

  function startPlayback(card) {
    if (card.classList.contains('is-playing')) return; // защита от дубля
    const type   = (card.dataset.type || '').trim();     // "mp4" | "boom"
    const src    = (card.dataset.src || '').trim();      // mp4 url
    const boom   = (card.dataset.boom || '').trim();     // boom code
    const poster = (card.dataset.poster || '').trim();   // poster url

    // Скрываем постер и оверлейную кнопку (если есть)
    const btn = $('.video-play', card);
    if (btn) btn.remove();
    const img = $('.video-poster', card);
    if (img) img.remove();

    card.classList.add('is-playing');

    if (type === 'mp4' && src) {
      mountMp4(card, src, poster);
      return;
    }
    if (type === 'boom' && boom) {
      mountBoomstream(card, boom);
      return;
    }

    // Если конфигурация невалидна — откатим состояние
    card.classList.remove('is-playing');
    console.warn('[video-card] Missing data attributes:', { type, src, boom });
  }

  function bindCard(card) {
    // Клик по кнопке Play
    const btn = $('.video-play', card);
    if (btn) btn.addEventListener('click', (e) => { e.preventDefault(); startPlayback(card); }, { once: true });

    // Клик по постеру тоже запускает
    const img = $('.video-poster', card);
    if (img) img.addEventListener('click', (e) => { e.preventDefault(); startPlayback(card); }, { once: true });
  }

  cards.forEach(bindCard);
})();