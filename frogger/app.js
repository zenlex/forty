const COLS = 15;
const ROWS = 15;
let logs = [];
let cars = [];
let logSize = 5;
let logGap = 2;
let carSize = 1;
let carGap = 2;

let root = document.documentElement;
root.style.setProperty("--cols", COLS);

document.addEventListener("DOMContentLoaded", () => {
  //// SELECTORS ////

  const grid = document.querySelector(".grid");
  const result = document.querySelector("#result");
  const timeLeft = document.querySelector("#time-left");
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

  //draw river, road, bridge

  const obsAreas = drawObsAreas();

  //initialize frog
  let currIndex = startblock;
  let direction = 0;

  drawFrog();

  //// FUNCTIONS ////
  function drawObsAreas() {
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

    return {
      riverStart: riverStart,
      riverEnd: riverEnd,
      roadStart: roadStart,
      roadEnd: roadEnd,
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
    let numRows = Math.round((obsAreas.riverEnd - obsAreas.riverStart) / COLS);
    //loop through a row at a time alternating direction
    for (
      let i = 0, rowStart = obsAreas.riverStart;
      i < numRows;
      i++, rowStart += COLS
    ) {
      let startGap = i > 0 && i % 2 != 0; //start odd rows with a gap
      makeLogRow(rowStart, startGap);
    }

    //draw logs of logsize length with gaps until hit edge of grid
    function makeLogRow(start, isGap = false) {
      let currLog = [];

      for (let i = start; i < start + COLS; i++) {
        if (isGap) {
          //skip gap
          i += logGap;
          if (i >= start + COLS) return;
          isGap = false;
        }
        currLog.push(i);
        if (currLog.length === logSize) {
          logs.push(currLog);
          currLog = [];
          isGap = true;
          counter = 0;
        }
      }
    }

    drawLogs();
    console.log(`logs = ${logs}`);
  }

  function makeCars() {
    //generate cars
    let numRows = Math.round((obsAreas.roadEnd - obsAreas.roadStart) / COLS);
    //loop through a row at a time alternating direction
    for (
      let i = 0, rowStart = obsAreas.roadStart;
      i < numRows;
      i++, rowStart += COLS
    ) {
      let startGap = i > 0 && i % 2 != 0; //start odd rows with a gap
      makeCarRow(rowStart, startGap);
    }

    //draw logs of logsize length with gaps until hit edge of grid
    function makeCarRow(start, isGap = false) {
      let currCar = [];

      for (let i = start; i < start + COLS; i++) {
        if (isGap) {
          //skip gap
          i += carGap;
          if (i >= start + COLS) return;
          isGap = false;
        }
        currCar.push(i);
        if (currCar.length === carSize) {
          cars.push(currCar);
          currCar = [];
          isGap = true;
          counter = 0;
        }
      }
    }
    drawCars();
  }

  function drawLogs() {
    for (let i = obsAreas.riverStart; i <= obsAreas.riverEnd; i++) {
      squares[i].classList.remove("log");
    }
    for (let log of logs) {
      for (let index of log) {
        squares[index].classList.add("log");
      }
    }
  }

  function drawCars() {
    for (let car of cars) {
      for (let index of car) {
        squares[index].classList.add("car");
      }
    }
  }

  function drawFrog() {
    squares[currIndex].classList.add("frog");
  }

  function moveLogs() {
    let currIndex = obsAreas.riverStart;
    let currRow = 0;
    let evenRow = true;
    for (let i = currIndex; i <= obsAreas.riverEnd; ) {
      //if even row (incl 0) move all car divs right
      if (evenRow) {
        moveLogsLeft(currIndex);
        currIndex += COLS;
        currRow = Math.floor(currIndex / COLS);
        evenRow = currRow == 0 || currRow % 2 == 0 ? true : false;
      } else {
        moveLogsRight(currIndex);
        currIndex += COLS;
        if (currIndex > obsAreas.riverEnd) return;
        evenRow = currRow == 0 || currRow % 2 == 0 ? true : false;
      }
    }

    drawLogs();

    function moveLogsLeft(rowStart) {
      let logRow = logs.filter((log) => log[log.length - 1] <= rowStart + COLS);
      for (let log of logRow) {
        for (let i = 0; i < log.length; i++) {
          log[i]--;
          if (log[i] < rowStart) {
            log.splice(i, 1);
            if (logRow[logRow.length - 1].length < logSize) {
              logRow[logRow.length - 1].push(rowStart + COLS - 1);
            } else {
              logRow.push([rowStart + COLS - 1]);
            }
          }
        }
      }
    }
    function moveLogsRight(rowStart) {
      let logRow = logs.filter((log) => log[log.length - 1] <= rowStart + COLS);
      for (let log of logRow) {
        for (let i = 0; i < log.length; i++) {
          log[i]++;
          if (log[i] > rowStart + COLS - 1) {
            log.splice(i, 1);
            if (logRow[0].length < logSize) {
              logRow[0].unshift(rowStart);
            } else {
              logRow.unshift([rowStart]);
            }
          }
        }
      }
    }

    //if odd row move all car divs left
  }

  function moveFrog() {
    squares[currIndex].classList.remove("frog");
    currIndex += direction;
    drawFrog();
  }
  //// EVENT LISTENERS ////
  document.addEventListener("keydown", control);

  //// RUN GAME ////
  makeLogs();
  makeCars();

  //let logTimer = setInterval(moveLogs, 500);
  //// END GAME ////
}); //end DOM Content Loaded
