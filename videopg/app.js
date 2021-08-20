const btn = document.querySelector(".switch-btn");
const video = document.querySelector(".video-container");

btn.addEventListener("click", function () {
  if (!btn.classList.contains("slide")) {
    btn.classList.add("slide");
    video.pause();
  } else {
    btn.classList.remove("slide");
    video.play();
  }
});

//preloader
window.addEventListener("load", function () {
  const preLoader = document.querySelector(".preloader");
  preLoader.classList.add("hide-preloader");
});
