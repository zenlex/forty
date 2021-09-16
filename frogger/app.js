document.addEventListener("DOMContentLoaded", () => {
  //// SELECTORS ////
  const grid = document.querySelector(".grid");
  const result = document.querySelector("#result");
  const timeLeft = document.querySelector("#time-left");
  const startBtn = document.querySelector("#start-btn");
  //// INITIALIZATION ////

  //draw and store grid squares and update CSS variables
  const COLS = 22;
  const ROWS = 14;

  let root = document.documentElement;
  root.style.setProperty("--cols", COLS);

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

  const obsAreas = drawObsAreas();

  function movecLogs(obsAreas) {
    //generate logs
    /**
     * create array of starting logs based on obj areas then use the 4 class loop method she uses in tutorial
     */
  }

  function moveCars(obsAreas) {
    //generate cars
    /**
     * create array of starting cars based on obj areas then use the 4 class loop method she uses in tutorial
     */
  }

  //initialize frog
  let currIndex = startblock;
  let direction = 0;

  drawFrog();

  //// FUNCTIONS ////
  function drawFrog() {
    squares[currIndex].classList.add("frog");
  }

  function moveFrog() {
    squares[currIndex].classList.remove("frog");
    currIndex += direction;
    squares[currIndex].classList.add("frog");
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

  //// EVENT LISTENERS ////
  document.addEventListener("keydown", control);
}); //end DOM Content Loaded
