document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".video-wrapper");
  console.log("Found wrappers:", wrappers.length);
  
  wrappers.forEach((wrapper, index) => {
    const videoSrc = wrapper.dataset.video;
    const coverSrc = wrapper.dataset.cover;
    
    console.log(`Wrapper ${index}:`, videoSrc, coverSrc);

    wrapper.innerHTML = `
      <div class="video-poster">
        <img src="${coverSrc}" alt="Видео">
        <div class="play-button"></div>
      </div>
    `;

    const playBtn = wrapper.querySelector(".play-button");
    playBtn.addEventListener("click", () => {
      console.log("Play clicked for:", videoSrc);
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
});