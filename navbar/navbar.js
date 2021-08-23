function toggleLinks(event) {
  let links = document.querySelector(".links");
  links.classList.toggle("show-links");
}

const navToggle = document.querySelector(".nav-toggle");
navToggle.addEventListener("click", toggleLinks);
