document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".video-wrapper");
  wrappers.forEach(wrapper => {
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
      video.play();
    });
  });
});