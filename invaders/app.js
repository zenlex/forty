document.addEventListener("DOMContentLoaded", () => {
  //// SELECTORS ////
  const scoreDisplay = document.getElementById("score");
  const grid = document.querySelector(".game-container");
  let squares = [];
  //// INITIALIZE ////
  let score = 0;
  const ROWS = 15;
  const COLS = 15;
  let currShooter = Math.floor(ROWS * COLS - COLS / 2);
  let currInvaderIndex = 0;
  let invaders = [];
  let shotInvaders = [];
  let direction = 1;
  let invaderId;

  //// FUNCTIONS ////
  function initGame() {
    //create div grid
    for (let i = 0; i < ROWS * COLS; i++) {
      let space = document.createElement("div");
      space.classList = "gridspace";
      grid.append(space);
      squares.push(space);
    }
    //populate invaders array
    initInvaders(21);

    drawInvaders();

    drawShooter();

    invaderId = setInterval(moveInvaders, 500);
  }

  //draw the shooter
  function drawShooter() {
    squares[currShooter].classList.add("shooter");
  }

  //draw the invaders
  function drawInvaders() {
    invaders.forEach((val, index) => {
      if (!shotInvaders.includes(index)) {
        squares[val + currInvaderIndex].classList.add("invader");
      }
    });
  }

  function initInvaders(count = 1, spacing = 1, width = 7) {
    invaders = [];
    let index = 0;
    let rowCount = 0;
    const max = squares.length;
    for (let i = 0; i < count; i++) {
      if (index < max) {
        invaders.push(index);
        rowCount++;
        if (rowCount == width) {
          index += COLS - (width - 1);
          rowCount = 0;
        } else index += spacing;
      }
    }
  }

  function moveShooter(e) {
    let oldShooter = currShooter;
    switch (e.key) {
      case "ArrowLeft":
        if (currShooter % COLS !== 0) currShooter--;
        break;
      case "ArrowRight":
        if (currShooter % COLS < COLS - 1) currShooter++;
        break;
      case "ArrowUp":
        shoot();
        break;
      default:
        return;
    }
    squares[oldShooter].classList.remove("shooter");
    drawShooter();
  }

  function moveInvaders() {
    const leftEdge = invaders[0] % COLS === 0;
    const rightEdge = invaders[invaders.length - 1] % COLS === COLS - 1;

    if ((leftEdge && direction == -1) || (rightEdge && direction == 1)) {
      direction = COLS;
    } else if (direction == COLS) {
      direction = leftEdge ? 1 : -1;
    }

    invaders.forEach((invader, index) => {
      squares[invader].classList.remove("invader");
      invaders[index] += direction;
    });

    drawInvaders();
    //check for game over

    function gameOver() {
      squares[currShooter].classList.add("boom");
      scoreDisplay.textContent = `Game Over! Final Score: ${score}`;
      clearInterval(invaderId);
      clearInterval(laserId);
    }

    if (squares[currShooter].classList.contains("invader", "shooter")) {
      gameOver();
    }

    invaders.every((index) => {
      if (index > squares.length - (COLS - 1)) {
        gameOver();
        return false;
      }
      return true;
    });
  }

  function shoot(e) {
    let laserId;
    let currLaser = currShooter;

    function moveLaser() {
      if (currLaser < COLS) {
        clearInterval(laserId);
        setTimeout(squares[currLaser].classList.remove("laser"), 100);
      } else {
        squares[currLaser].classList.remove("laser");
        currLaser -= COLS;
        squares[currLaser].classList.add("laser");
      }

      if (squares[currLaser].classList.contains("invader")) {
        squares[currLaser].classList.remove("laser", "invader");
        squares[currLaser].classList.add("boom");

        setTimeout(() => squares[currLaser].classList.remove("boom"));
        clearInterval(laserId);

        const invaderShot = invaders.indexOf(currLaser);
        shotInvaders.push(invaderShot);
        score++;
        scoreDisplay.textContent = score;
        if (shotInvaders.length === invaders.length) winGame();
      }
    }
    laserId = setInterval(moveLaser, 100);
  }

  function winGame() {
    clearInterval(invaderId);
    scoreDisplay.textContent = `You Win! Final Score: ${score}`;
  }

  //// RUN GAME ////
  initGame();
  document.addEventListener("keydown", moveShooter);
}); //end DOM ContentLoaded
