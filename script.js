document.addEventListener("DOMContentLoaded", () => {
  // Видео функциональность
  const wrappers = document.querySelectorAll(".video-wrapper");
  wrappers.forEach((wrapper) => {
    const videoSrc = wrapper.dataset.video;
    const coverSrc = wrapper.dataset.cover;

    wrapper.innerHTML = `
      <div class="video-poster">
        <img src="${coverSrc}" alt="Видео">
        <div class="play-button"></div>
      </div>
    `;

    const playBtn = wrapper.querySelector(".play-button");
    playBtn.addEventListener("click", () => {
      wrapper.innerHTML = `
        <video controls autoplay>
          <source src="${videoSrc}" type="video/mp4">
        </video>
      `;
      const video = wrapper.querySelector("video");
      video.muted = false;
      video.volume = 1.0;
      video.play().catch(e => console.log("Play error:", e));
    });
  });

  // Анимации при скролле
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReduced) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const delay = parseInt(element.dataset.delay || '0', 10);
          const stagger = parseInt(element.dataset.stagger || '0', 10);
          
          setTimeout(() => {
            element.classList.add('show');
          }, delay + stagger);
          
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.1 });

    // Наблюдаем за элементами с классами анимации
    document.querySelectorAll('.sr').forEach(el => observer.observe(el));
  }

  // Параллакс эффект
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    document.querySelectorAll('[data-parallax]').forEach(element => {
      const rate = scrolled * -element.dataset.parallax;
      element.style.transform = `translateY(${rate}px)`;
    });
  });
});