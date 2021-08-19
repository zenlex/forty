let questions = document.querySelectorAll(".question");

questions.forEach(function (question) {
  const btn = question.querySelector(".question-btn");
  btn.addEventListener("click", function () {
    questions.forEach(function (elem) {
      if (elem !== question) {
        elem.classList.remove("show-text");
      }
    });
    question.classList.toggle("show-text");
  });
});
