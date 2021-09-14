document.addEventListener("DOMContentLoaded", () => {
  const ROWS = 10;
  const COLS = 10;
  const grid = document.querySelector(".grid");
  const startBtn = document.getElementById("start");
  const scoreDisplay = document.getElementById("score");

  //// INITIALIZE ////
  for (let i = 0; i < ROWS * COLS; i++) {
    let square = document.createElement("div");
    grid.append(square);
  }

  let squares = document.querySelectorAll(".grid div");
  let currIndex = 0;
  let appleIndex = 0;
  let currSnake = [2, 1, 0];
  let direction = 1;
  let score;
  let speed = 0.9;
  let intervalTime;
  let interval;

  //// FUNCTIONS ////
  function startGame() {
    grid.style.backgroundColor = "unset";
    currSnake.forEach((index) => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    clearInterval(interval);

    score = 0;
    direction = 1;
    scoreDisplay.textContent = score;

    intervalTime = 1000;
    currSnake = [2, 1, 0];
    currIndex = 0;
    currSnake.forEach((index) => squares[index].classList.add("snake"));

    interval = setInterval(moveOutcomes, intervalTime);
    randomApple();
  }

  function control(e) {
    squares[currIndex].classList.remove("snake");

    switch (e.key) {
      case "ArrowUp":
        direction = -COLS;
        break;
      case "ArrowLeft":
        direction = -1;
        break;
      case "ArrowRight":
        direction = 1;
        break;
      case "ArrowDown":
        direction = +COLS;
    }
  }

  function moveOutcomes() {
    //deals with border collision and self collision
    if (
      (currSnake[0] + COLS >= ROWS * COLS && direction === COLS) || //snake hits bottom
      (currSnake[0] % COLS === COLS - 1 && direction === 1) || //snake hits right edge
      (currSnake[0] % COLS === 0 && direction === -1) || //snake hits left wall
      (currSnake[0] < COLS && direction === -COLS) || //snake hits top
      squares[currSnake[0] + direction].classList.contains("snake") // snake hits self
    ) {
      grid.style.backgroundColor = "red";
      return clearInterval(interval);
    }
    const tail = currSnake.pop();
    squares[tail].classList.remove("snake");
    currSnake.unshift(currSnake[0] + direction);

    //deal with snake getting apple
    if (squares[currSnake[0]].classList.contains("apple")) {
      squares[currSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currSnake.push(tail);
      randomApple();
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime *= speed;
      interval = setInterval(moveOutcomes, intervalTime);
    }

    squares[currSnake[0]].classList.add("snake");
  }

  function randomApple() {
    console.log("generating random apple");
    do {
      appleIndex = Math.floor(Math.random() * ROWS * COLS);
    } while (currSnake.includes(appleIndex));
    squares[appleIndex].classList.add("apple");
  }
  startBtn.addEventListener("pointerup", startGame);
  document.addEventListener("keyup", control);
}); //end DOMContent Loaded
