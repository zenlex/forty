// ***********set date **************
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// *********** close links **************
const navToggle = document.querySelector(".nav-toggle");
const linksCont = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  const contHeight = linksCont.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;

  linksCont.style.height = contHeight == 0 ? linksHeight + "px" : 0;
});
// *********** fixed nav **************
const nav = document.getElementById("nav");
const topLink = document.querySelector(".top-link");
const navHeight = nav.getBoundingClientRect().height;

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    nav.classList.add("fixed-nav");
  } else {
    nav.classList.remove("fixed-nav");
  }

  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
    topLink.addEventListener("click", scrollHome);
  } else {
    topLink.classList.remove("show-link");
    topLink.removeEventListener("click", scrollHome);
  }

  function scrollHome() {
    window.scroll(0, 0);
  }
});
// *********** precise smooth scroll **************
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const dest = document.querySelector(
      event.currentTarget.getAttribute("href")
    );
    // calculate the heights
    const navHeight = nav.getBoundingClientRect().height;
    const containerHeight = linksCont.getBoundingClientRect().height;
    const fixedNav = nav.classList.contains("fixed-nav");
    let position = dest.offsetTop - navHeight;

    if (!fixedNav) {
      //check if scroll already past initial nav height
      position = position - navHeight;
    }

    if (navHeight > 82) {
      //compensate for nav menu on mobile
      position = position + containerHeight;
    }

    window.scrollTo({ left: 0, top: position });
    linksCont.style.height = 0;
  });
});
// *********** close links **************
