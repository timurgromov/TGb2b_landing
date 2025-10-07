document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.video-card');

  cards.forEach(card => {
    const playBtn = card.querySelector('.video-play');
    const poster = card.querySelector('.video-poster');

    const startPlayback = () => {
      if (card.classList.contains('is-playing')) return;
      card.classList.add('is-playing');
      if (playBtn) playBtn.style.display = 'none';
      if (poster) poster.style.display = 'none';

      const type = card.dataset.type;
      const src = card.dataset.src;

      if (type === 'mp4') {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.playsInline = true;
        video.preload = 'metadata';
        video.autoplay = false;
        video.muted = false;

        card.appendChild(video);
        video.play().catch(err => console.log('Autoplay blocked:', err));
      }

      if (type === 'boomstream') {
        const code = card.dataset.code;
        const iframe = document.createElement('iframe');
        iframe.src = `https://play.boomstream.com/${code}?autoplay=0`;
        iframe.allow = 'autoplay; fullscreen';
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.loading = 'eager';

        card.appendChild(iframe);
      }
    };

    // Клик по кнопке или по постеру
    if (playBtn) playBtn.addEventListener('click', startPlayback, { once: true });
    if (poster) poster.addEventListener('click', startPlayback, { once: true });
  });
});