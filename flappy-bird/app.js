document.addEventListener("DOMContentLoaded", () => {
  //// GLOBAL VARIABLES ////
  const bird = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-container");
  const ground = document.querySelector(".ground");
  let isGameOver = false;
  let gap = 500;

  let birdLeft = 220;
  let birdBottom = 100;
  let gravity = 2;

  function jump() {
    if (birdBottom < 500) birdBottom += 50;
    bird.style.bottom = birdBottom + "px";
  }

  function run() {
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
    birdBottom -= gravity;
  }

  function gameOver() {
    isGameOver = true;
    document.removeEventListener("keyup", control);
    clearInterval(gameTimer);
  }

  function control(e) {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        jump();
        break;
    }
  }

  function generateObstacle() {
    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");
    if (!isGameOver) {
      obstacle.classList.add("obstacle");
      topObstacle.classList.add("topObstacle");
    }

    gameDisplay.append(obstacle, topObstacle);
    let obstacleLeft = 500;
    let randomHeight = Math.random() * 150;
    let obstacleBottom = randomHeight;
    obstacle.style.left = obstacleLeft + "px";
    topObstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    topObstacle.style.bottom = obstacleBottom + gap + "px";

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + "px";
      topObstacle.style.left = obstacleLeft + "px";
      if (obstacleLeft < -60) {
        obstacle.remove();
        topObstacle.remove();
        clearInterval(moveTimer);
      }
      if (
        (obstacleLeft > 200 &&
          obstacleLeft < 280 &&
          (birdBottom < obstacleBottom + 153 ||
            birdBottom > obstacleBottom + gap - 200)) ||
        birdBottom == 0
      ) {
        gameOver();
        clearInterval(moveTimer);
      }
    }
    let moveTimer = setInterval(moveObstacle, 20);
    if (!isGameOver) {
      setTimeout(generateObstacle, 3000);
    }
  }

  ////EVENT HANDLERS////
  document.addEventListener("keyup", control);

  //start engine
  let gameTimer = setInterval(() => {
    run();
  }, 20);
  generateObstacle();
}); //end "DOMContent Loaded"
