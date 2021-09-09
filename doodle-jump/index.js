////SCRIPT VARIABLES////

document.addEventListener("DOMContentLoaded", function (e) {
  ////INITIALIZE////
  let startPoint = 150;
  let doodlerBottom = startPoint;
  let isGameOver = false;
  let platformCount = 5;
  let platforms = [];
  let jumpTimer;
  let fallTimer;
  let isJumping;
  let isGoingLeft = false;
  let isGoingRight = false;
  let leftTimerId;
  let rightTimerId;
  let score = 0;

  ////SELECTORS////

  const grid = document.querySelector(".grid");
  const doodler = document.createElement("div");

  ////FUNCTIONS////
  // create world

  class Platform {
    constructor(newPlatTop) {
      this.left = Math.random() * 315;
      this.top = newPlatTop;
      this.visual = document.createElement("div");

      const visual = this.visual;
      visual.classList.add("platform");
      visual.style.left = this.left + "px";
      visual.style.top = this.top + "px";

      grid.appendChild(visual);
    }
  }

  function createPlatforms() {
    for (let i = platformCount - 1; i >= 0; --i) {
      let platformGap = 600 / platformCount;
      let newPlatTop = i * platformGap;
      let newPlatform = new Platform(newPlatTop);
      platforms.push(newPlatform);
    }
  }

  function movePlatforms() {
    if (doodlerBottom > 200) {
      platforms.forEach((platform) => {
        platform.top += 4;
        platform.visual.style.top = platform.top + "px";

        if (platform.top > 575) {
          platform.visual.remove();
          platforms.shift();
          score++;
          platforms.push(new Platform(-15));
        }
      });
    }
  }

  //create player

  function createDoodler() {
    doodler.classList.add("doodler");
    grid.appendChild(doodler);
    doodlerLeft = platforms[0].left;
    doodlerBottom = 600 - platforms[0].top;
    doodler.style.left = doodlerLeft + "px";
    doodler.style.bottom = doodlerBottom + "px";
  }

  //// CONTROLLER ////

  function keyUp(e) {
    doodler.style.bottom = doodlerBottom + "px";
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        moveLeft();
        break;
      case "ArrowRight":
        e.preventDefault();
        moveRight();
        break;
      case "ArrowUp":
        e.preventDefault();
        straightenOut();
        break;
    }
  }

  function moveLeft() {
    console.log("going left");
    if (isGoingRight) {
      isGoingRight = false;
      clearInterval(rightTimerId);
    }

    if (!isGoingLeft) {
      leftTimerId = setInterval(() => {
        let coords = doodler.getBoundingClientRect();
        if (coords.left > 0) {
          doodler.style.left = coords.left - 5 + "px";
        } else {
          moveRight();
        }
      }, 20);
    }

    isGoingLeft = true;
  }

  function moveRight() {
    console.log("going right");
    if (isGoingLeft) {
      isGoingLeft = false;
      clearInterval(leftTimerId);
    }

    if (!isGoingRight) {
      rightTimerId = setInterval(() => {
        let coords = doodler.getBoundingClientRect();
        if (coords.right < 400) {
          doodler.style.left = coords.left + 5 + "px";
        } else {
          moveLeft();
        }
      }, 20);
    }
    isGoingRight = true;
  }

  function straightenOut() {
    isGoingRight = false;
    isGoingLeft = false;
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
  }

  function jump() {
    clearInterval(fallTimer);
    isJumping = true;

    jumpTimer = setInterval(function () {
      doodlerBottom += 20;
      doodler.style.bottom = doodlerBottom + "px";
      if (doodlerBottom > startPoint + 200) {
        fall();
        isJumping = false;
      }
    }, 30);
  }

  function fall() {
    isJumping = false;
    clearInterval(jumpTimer);

    fallTimer = setInterval(function () {
      doodlerBottom -= 5;
      doodler.style.bottom = doodlerBottom + "px";
      let doodlerBox = doodler.getBoundingClientRect();
      if (doodlerBox.bottom >= 600) {
        gameOver();
      }
      platforms.forEach((platform) => {
        let platBox = platform.visual.getBoundingClientRect();
        if (
          doodlerBox.bottom < platBox.top ||
          doodlerBox.top > platBox.bottom ||
          doodlerBox.right < platBox.left ||
          doodlerBox.left > platBox.right ||
          isJumping
        ) {
          console.log("no collision");
        } else {
          console.log("landed");
          startPoint = doodlerBox.bottom;
          jump();
          isJumping = true;
        }
      });
    }, 20);
  }

  //// RUN GAME ////

  function start() {
    if (!isGameOver) {
      createPlatforms();
      createDoodler();
      document.addEventListener("keyup", keyUp);
      let timerId = setInterval(movePlatforms, 30);
      jump(startPoint);
    }
  }

  function gameOver() {
    console.log("gameover");
    clearInterval(fallTimer);
    clearInterval(jumpTimer);
    clearInterval(rightTimerId);
    clearInterval(leftTimerId);
    document.removeEventListener("keyup", keyUp);
    grid.innerHTML = "";
    grid.innerHTML = `<div class='score'>${score}</div>`;

    isGameOver = true;
  }

  start();

  //end 'DOMContentLoaded
});
