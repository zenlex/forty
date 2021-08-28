//select elements
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

//set mode to loop or bounce
const LOOP = true;

//initialize slide positions
slides.forEach((slide, index) => slide.style.left = `${index * 100}%`)

//track current position
let currSlide = 0;

if (LOOP) {
    //control handlers - loop version
    nextBtn.addEventListener('click', function () {
        currSlide = (currSlide < slides.length - 1) ? ++currSlide : 0
        changeSlide();
    });
    prevBtn.addEventListener('click', function () {
        currSlide = (currSlide > 0) ? --currSlide : slides.length - 1;
        changeSlide();
    });
}

if (!LOOP) {
    showBtns();
    //control handlers - bounce version
    nextBtn.addEventListener('click', function () {
        currSlide++;
        changeSlide();
        showBtns();
    });
    prevBtn.addEventListener('click', function () {
        currSlide--;
        changeSlide();
        showBtns();
    });
}

//update positions
function changeSlide() {
    slides.forEach((slide, index) => slide.style.left = `${index * 100 - currSlide * 100}%`)
}

function showBtns() {
    const lastSlide = slides.length - 1;
    if (currSlide == lastSlide) {
        nextBtn.style.display = 'none'
    } else if (currSlide == 0) {
        prevBtn.style.display = 'none'
    } else {
        nextBtn.style.display = 'inline-block'
        prevBtn.style.display = 'inline-block'
    }
}

