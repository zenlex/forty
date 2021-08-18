/**
 * Add a modal overlay
 */

const modal = document.querySelector(".modal-overlay");
const modalBtn = document.querySelector(".modal-btn");
const closeBtn = document.querySelector(".close-btn");

modalBtn.addEventListener("click", function () {
  modal.classList.add("open-modal");
});

closeBtn.addEventListener("click", function () {
  console.log("close clicked");
  modal.classList.remove("open-modal");
});
