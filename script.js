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
        video.className = 'video-element';
        video.src = src;
        video.controls = true;
        video.playsInline = true;
        video.preload = 'metadata';
        video.autoplay = false;
        video.muted = false;

        card.appendChild(video);
        video.play().catch(err => console.log('Autoplay blocked:', err));
      }

      if (type === 'boom') {
        const code = card.dataset.boom;
        // Используем MP4 напрямую вместо iframe для одинакового поведения
        const video = document.createElement('video');
        video.className = 'video-element';
        video.src = `https://cdnv.boomstream.com/balancer/${code}.mp4`;
        video.controls = true;
        video.playsInline = true;
        video.preload = 'metadata';
        video.autoplay = false;
        video.muted = false;

        card.appendChild(video);
        video.play().catch(err => console.log('Autoplay blocked:', err));
      }
    };

    // Клик по кнопке или по постеру
    if (playBtn) playBtn.addEventListener('click', startPlayback, { once: true });
    if (poster) poster.addEventListener('click', startPlayback, { once: true });
  });
});