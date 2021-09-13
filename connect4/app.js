//board object

let board = {
  container: null,
  spaces: [],
  cols: 7,
  rows: 6,
  currPlayer: 1,
  playerDisplay: null,
};

//// FUNCTIONS ////

//create board spaces
function createSpaces(container, cols, rows) {
  for (let i = 0; i < cols * rows; i++) {
    let space = document.createElement("div");
    space.id = i;
    space.classList = "gridspace";
    container.append(space);
    board.spaces.push(space);
  }
}

//click handler
function clickSpace(e) {
  console.log("click detected");
  let target = e.target.closest(".gridspace");
  if (!target) return;
  console.log(`target:${target}`);
  if (isValid(target.id)) {
    switch (board.currPlayer) {
      case 1:
        target.classList.add("taken", "player1");
        break;

      case 2:
        target.classList.add("taken", "player2");
    }

    //check for four in a row
    if (!isWin(target.id, board.currPlayer)) {
      togglePlayer();
    } else {
      gameOver();
    }
  }
}

//switch turns
function togglePlayer() {
  board.currPlayer = board.currPlayer == 1 ? 2 : 1;
  board.playerDisplay.textContent = `Player ${board.currPlayer}`;
}

//check to see if space is valid play
function isValid(id) {
  let index = parseInt(id);
  if (board.spaces[index].classList.contains("taken")) return false;
  if (id > board.rows * board.cols - board.cols - 1) return true;
  if (board.spaces[index + board.cols].classList.contains("taken")) return true;
}

function startGame() {
  board.container = document.querySelector("#game-container");
  createSpaces(board.container, board.cols, board.rows);
  board.container.addEventListener("pointerup", clickSpace);
  board.currPlayer = 1;
  board.playerDisplay = document.getElementById("current-player");
}

function gameOver() {
  const resultDisplay = document.getElementById("result");
  resultDisplay.innerHTML += `<h1>Player ${board.currPlayer} Wins!!!</h1>`;
  const reset = document.getElementById("reset");
  reset.style.display = "block";
  reset.addEventListener("pointerup", resetBoard);
}

function resetBoard() {
  let takenSpaces = board.container.querySelectorAll(".taken");
  takenSpaces.forEach((item) =>
    item.classList.remove("player1", "player2", "taken")
  );
  const resultDisplay = document.getElementById("result");
  resultDisplay.innerHTML = "";
  this.style.display = "none";
}
document.addEventListener("DOMContentLoaded", startGame);

function isWin(id, currPlayer) {
  id = parseInt(id);
  let currPiece = id;
  let row = Math.floor(id / board.cols);
  let col = id % board.cols;
  let pieces = 1;
  currPlayer = `player${currPlayer}`;
  let lowerBound;
  let upperBound;

  //check vertical
  lowerBound = col;
  upperBound = (board.rows - 1) * board.cols + col;

  //look up
  currPiece = id - board.cols;
  while (currPiece >= lowerBound) {
    if (board.spaces[currPiece].classList.contains(currPlayer)) {
      pieces++;
      currPiece -= board.cols;
    } else break;
  }

  if (pieces >= 4) {
    return true;
  }

  //look down
  currPiece = id + board.cols;
  while (currPiece <= upperBound) {
    if (board.spaces[currPiece].classList.contains(currPlayer)) {
      pieces++;
      currPiece += board.cols;
    } else break;
  }

  if (pieces >= 4) {
    return true;
  } else {
    pieces = 1;
  }

  //check horizontal

  lowerBound = row * board.cols;
  upperBound = Math.min(id + 3, (row + 1) * board.cols - 1);
  currPiece = id - 1;

  //check left
  while (currPiece >= lowerBound) {
    if (board.spaces[currPiece].classList.contains(currPlayer)) {
      pieces++;
      currPiece--;
    } else break;
  }
  if (pieces >= 4) {
    return true;
  }

  //check right
  currPiece = id + 1;
  while (currPiece <= upperBound) {
    if (board.spaces[currPiece].classList.contains(currPlayer)) {
      pieces++;
      currPiece++;
    } else break;
  }
  if (pieces >= 4) {
    return true;
  } else {
    pieces = 1;
  }

  //check diagonal SW-> NE
  lowerBound = (() => {
    let bound;
    let currRow = row;
    let currCol = col;
    currPiece = id;
    while (
      currPiece > 0 &&
      currRow < board.rows &&
      currCol < board.cols &&
      currRow >= 0 &&
      currCol >= 0
    ) {
      bound = currPiece;
      currRow--;
      currCol++;
      currPiece -= board.cols - 1;
    }
    return bound;
  })();

  upperBound = (() => {
    let bound;
    let currRow = row;
    let currCol = col;
    currPiece = id;
    while (
      currPiece > 0 &&
      currRow < board.rows &&
      currCol < board.cols &&
      currRow >= 0 &&
      currCol >= 0
    ) {
      bound = currPiece;
      currRow++;
      currCol--;
      currPiece += board.cols - 1;
    }
    return bound;
  })();

  currPiece = id + (board.cols - 1);
  pieces = 1;
  while (currPiece <= upperBound) {
    if (board.spaces[currPiece].classList.contains(currPlayer)) {
      pieces++;
      currPiece += board.cols - 1;
    } else break;
  }

  if (pieces >= 4) {
    return true;
  }

  currPiece = id - (board.cols - 1);
  while (currPiece >= lowerBound) {
    if (board.spaces[currPiece].classList.contains(currPlayer)) {
      pieces++;
      currPiece -= board.cols - 1;
    } else break;
  }

  if (pieces >= 4) {
    return true;
  } else {
    pieces = 1;
  }

  //check diagonal NW->SE
  lowerBound = (() => {
    let bound;
    let currRow = row;
    let currCol = col;
    currPiece = id;
    while (
      currPiece > 0 &&
      currRow < board.rows &&
      currCol < board.cols &&
      currRow >= 0 &&
      currCol >= 0
    ) {
      bound = currPiece;
      currRow--;
      currCol--;
      currPiece -= board.cols - 1;
    }
    return bound;
  })();

  upperBound = (() => {
    let bound;
    let currRow = row;
    let currCol = col;
    currPiece = id;
    while (
      currPiece > 0 &&
      currRow < board.rows &&
      currCol < board.cols &&
      currRow >= 0 &&
      currCol >= 0
    ) {
      bound = currPiece;
      currRow++;
      currCol++;
      currPiece += board.cols - 1;
    }
    return bound;
  })();

  currPiece = id + (board.cols + 1);
  pieces = 1;
  while (currPiece <= upperBound) {
    if (board.spaces[currPiece].classList.contains(currPlayer)) {
      pieces++;
      currPiece += board.cols + 1;
    } else break;
  }

  if (pieces >= 4) {
    return true;
  }

  currPiece = id - (board.cols + 1);
  while (currPiece >= lowerBound) {
    if (board.spaces[currPiece].classList.contains(currPlayer)) {
      pieces++;
      currPiece -= board.cols + 1;
    } else break;
  }
  if (pieces >= 4) {
    return true;
  } else {
    pieces = 1;
  }

  return false;
}
