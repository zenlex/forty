let score = 0;
let time = 30;
let speed = 1.3;
let moleTimer;
let gameTimer;
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");

updateDisplay();

//initialize grid
const numSquares = 9;
const gridContainer = document.querySelector(".grid");
for (let i = 1; i <= 9; i++) {
  let elem = document.createElement("div");
  elem.classList = "square";
  elem.id = i;
  gridContainer.append(elem);
}

const squares = document.querySelectorAll(".square");

function clearMoles() {
  squares.forEach((elem) => elem.classList.remove("mole", "whacked"));
}

function randomMole() {
  clearMoles();
  if (time == 0) {
    gameOver();
  } else {
    let elem = squares[Math.floor(Math.random() * squares.length)];
    elem.classList.add("mole");
  }
  time--;
  updateDisplay();
}

function whackMole(e) {
  e.preventDefault();
  let target = e.target.closest("div");
  if (!target) return;
  if (target.classList.contains("mole")) {
    console.log("mole whacked");
    target.classList.add("whacked");
    score++;
    updateDisplay();
  }
}

function gameOver() {
  squares.forEach((elem) => elem.classList.add("over", "mole"));
  clearInterval(moleTimer);
}

function checkTime() {
  if (time <= 0) {
    time = 0;
    gameOver();
    updateDisplay();
  }
}

function updateDisplay() {
  scoreDisplay.innerHTML = score;
  timeDisplay.innerHTML = time;
}

function runGame() {
  gridContainer.addEventListener("click", whackMole);
  moleTimer = setInterval(randomMole, 1000 / speed);
  gameTimer = setInterval(checkTime, 1000);
}

document.addEventListener("DOMContentLoaded", runGame);
