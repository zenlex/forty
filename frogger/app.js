const COLS = 15;
const ROWS = 15;
let logs = [];
let cars = [];
let logSize = 5;
let logGap = 2;
let carSize = 1;
let carGap = 3;
let logInterval = 1000;
let carInterval = 700;
let logTimer;
let carTimer;
let gameTimer;
let time = 30;
let timeLeft = time;
let currIndex = 0;
let direction = 0;

let root = document.documentElement;
root.style.setProperty("--cols", COLS);

document.addEventListener("DOMContentLoaded", () => {
  //// SELECTORS ////

  const grid = document.querySelector(".grid");
  const result = document.querySelector("#result");
  const timeDisplay = document.querySelector("#time-left");
  const startBtn = document.querySelector("#start-btn");

  //// INITIALIZATION ////

  //draw and store grid squares and update CSS variables

  for (let i = 0; i < COLS * ROWS; i++) {
    let square = document.createElement("div");
    square.classList = "gridspace";
    grid.append(square);
  }

  const squares = document.querySelectorAll(".gridspace");

  //draw start and end blocks centered on grid
  const startblock = COLS * ROWS - Math.round(COLS / 2);
  const endblock = Math.floor(COLS / 2);

  squares[startblock].classList.add("startblock");
  squares[endblock].classList.add("endblock");

  //// FUNCTIONS ////
  function drawObsAreas() {
    //clear existing leftovers
    for (let i = 0; i < squares.length; i++) {
      squares[i].classList.remove("log", "car", "frog");
    }
    let rowsEven = ROWS % 2 == 0;

    const obsHeight = rowsEven
      ? Math.floor(ROWS / 4)
      : Math.floor((ROWS + 1) / 4);

    const riverStart =
      ROWS % 4 > 2 ? obsHeight * COLS - COLS : obsHeight * COLS;
    const riverEnd = riverStart + obsHeight * COLS - 1;

    const bridgeStart = riverEnd + 1;
    const bridgeEnd = rowsEven
      ? bridgeStart + 2 * COLS - 1
      : bridgeStart + COLS - 1;

    const roadStart = bridgeEnd + 1;
    const roadEnd = roadStart + obsHeight * COLS - 1;

    for (let i = riverStart; i <= riverEnd; i++) {
      squares[i].classList.add("river");
    }

    for (let i = bridgeStart; i <= bridgeEnd; i++) {
      squares[i].classList.add("bridge");
    }

    for (let i = roadStart; i <= roadEnd; i++) {
      squares[i].classList.add("road");
    }

    let riverRows = [];
    for (let i = riverStart, row; i < riverEnd; i += COLS) {
      row = [i, i + COLS - 1];
      riverRows.push(row);
    }

    let roadRows = [];
    for (let i = roadStart, row; i < roadEnd; i += COLS) {
      row = [i, i + COLS - 1];
      roadRows.push(row);
    }
    console.log(...riverRows);
    return {
      riverStart: riverStart,
      riverEnd: riverEnd,
      riverRows: riverRows,
      roadStart: roadStart,
      roadEnd: roadEnd,
      roadRows: roadRows,
    };
  }

  function control(e) {
    switch (e.key) {
      case "ArrowLeft":
        if (currIndex % COLS === 0) return;
        direction = -1;
        moveFrog();
        break;
      case "ArrowRight":
        if (currIndex % COLS === COLS - 1) return;
        direction = 1;
        moveFrog();
        break;
      case "ArrowUp":
        if (currIndex < COLS) return;
        direction = -COLS;
        moveFrog();
        break;
      case "ArrowDown":
        if (currIndex > ROWS * COLS - COLS) return;
        direction = COLS;
        moveFrog();
        break;
    }
  }

  function makeLogs() {
    //generate logs
    //loop through a row at a time alternating direction
    for (let i = 0; i < obsAreas.riverRows.length; i++) {
      let startGap = i > 0 && i % 2 != 0; //start odd rows with a gap
      makeLogRow(obsAreas.riverRows[i][0], startGap);
    }

    //draw logs of logsize length with gaps until hit edge of grid
    function makeLogRow(start, isGap = false) {
      for (let i = start, counter = 0; i < start + COLS; i++) {
        if (isGap) {
          //skip gap
          i += logGap;
          if (i >= start + COLS) return;
          isGap = false;
        }
        squares[i].classList.add("log");
        ++counter;
        if (counter === logSize) {
          isGap = true;
          counter = 0;
        }
      }
    }
  }

  function makeCars() {
    //generate cars
    //loop through a row at a time alternating direction
    for (let i = 0; i < obsAreas.roadRows.length; i++) {
      let startGap = i > 0 && i % 2 != 0; //start odd rows with a gap
      makeCarRow(obsAreas.roadRows[i][0], startGap);
    }

    //draw logs of logsize length with gaps until hit edge of grid
    function makeCarRow(start, isGap = false) {
      for (let i = start, counter = 0; i < start + COLS; i++) {
        if (isGap) {
          //skip gap
          i += carGap;
          if (i >= start + COLS) return;
          isGap = false;
        }
        squares[i].classList.add("car");
        counter++;
        if (counter === carSize) {
          isGap = true;
          counter = 0;
        }
      }
    }
  }

  function drawFrog() {
    squares[currIndex].classList.add("frog");
  }

  function moveLogs() {
    for (let i = 0; i < obsAreas.riverRows.length; i++) {
      //if even row (incl 0) move all car divs right
      let evenRow = i == 0 || i % 2 == 0 ? true : false;
      if (evenRow) {
        moveLogsLeft(i);
      } else {
        moveLogsRight(i);
      }
    }

    function moveLogsLeft(rowIndex) {
      let row = obsAreas.riverRows[rowIndex];
      let wrapClass = squares[row[0]].classList;
      for (let i = row[0]; i <= row[1] - 1; i++) {
        squares[i].classList = squares[i + 1].classList;
        if (i != currIndex) {
          squares[i].classList.remove("frog");
          drawFrog();
        }
      }
      squares[row[1]].classList = wrapClass;
      if (row[1] != currIndex) squares[row[1]].classList.remove("frog");
      drawFrog();
      checkState();
    }
    function moveLogsRight(rowIndex) {
      let row = obsAreas.riverRows[rowIndex];
      let wrapClass = squares[row[1]].classList;
      for (let i = row[1]; i > row[0]; i--) {
        squares[i].classList = squares[i - 1].classList;
        if (i != currIndex) {
          squares[i].classList.remove("frog");
        }
      }
      squares[row[0]].classList = wrapClass;
      if (currIndex != row[0]) {
        squares[row[0]].classList.remove("frog");
      }
      checkState();
    }
  }
  function moveCars() {
    for (let i = 0; i < obsAreas.roadRows.length; i++) {
      //move first half of rows left, bottom half right
      if (i < obsAreas.roadRows.length / 2) {
        moveCarsLeft(i);
      } else {
        moveCarsRight(i);
      }
    }

    function moveCarsLeft(rowIndex) {
      let row = obsAreas.roadRows[rowIndex];
      let wrapClass = squares[row[0]].classList;
      for (let i = row[0]; i < row[1]; i++) {
        squares[i].classList = squares[i + 1].classList;
        if (i != currIndex) squares[i].classList.remove("frog");
        drawFrog();
      }
      squares[row[1]].classList = wrapClass;
      if (row[1] != currIndex) squares[row[1]].classList.remove("frog");
      drawFrog();
      checkState();
    }
    function moveCarsRight(rowIndex) {
      let row = obsAreas.roadRows[rowIndex];
      let wrapClass = squares[row[1]].classList;
      for (let i = row[1]; i > row[0]; i--) {
        squares[i].classList = squares[i - 1].classList;
        if (i != currIndex) squares[i].classList.remove("frog");
        drawFrog();
      }
      squares[row[0]].classList = wrapClass;
      if (row[1] != currIndex) squares[row[1]].classList.remove("frog");
      drawFrog();
      checkState();
    }
  }

  function moveFrog() {
    squares[currIndex].classList.remove("frog");
    currIndex += direction;
    drawFrog();
    checkState();
  }

  function checkState() {
    //check for time left
    if (timeLeft == 0) gameOver();
    //check if on end tile
    if (currIndex == endblock) winGame();
    //check if in road
    if (currIndex >= obsAreas.roadStart && currIndex <= obsAreas.roadEnd) {
      if (squares[currIndex].classList.contains("car")) gameOver();
    }
    //check if in river
    if (currIndex >= obsAreas.riverStart && currIndex <= obsAreas.riverEnd) {
      console.log("in river");
      if (!squares[currIndex].classList.contains("log")) gameOver();
    }
  }

  function clearAllTimers() {
    clearInterval(logTimer);
    clearInterval(carTimer);
    clearInterval(gameTimer);
  }

  function countDown() {
    gameTimer = setInterval(() => {
      timeLeft--;
      timeDisplay.textContent = timeLeft;
    }, 1000);
  }

  //// EVENT LISTENERS ////
  startBtn.addEventListener("pointerup", startGame);

  //// RUN GAME ////
  function startGame() {
    //clear old frog if existing
    squares[currIndex].classList.remove("frog");
    startBtn.style.visibility = "hidden";

    //draw river, road, bridge
    obsAreas = drawObsAreas();

    makeLogs();
    makeCars();

    logTimer = setInterval(moveLogs, logInterval);
    carTimer = setInterval(moveCars, carInterval);

    //initialize frog
    currIndex = startblock;
    direction = 0;
    drawFrog();

    document.addEventListener("keydown", control);

    countDown();
  }

  //// END GAME ////
  function gameOver() {
    clearAllTimers();
    document.removeEventListener("keydown", control);
    result.textContent = "Game Over";
    timeDisplay.textContent = "00";
    startBtn.style.visibility = "visible";
  }

  function winGame() {
    clearInterval(gameTimer);
    document.removeEventListener("keydown", control);
    result.textContent = "You Win!";
    startBtn.style.visibility = "visible";
  }
}); //end DOM Content Loaded
