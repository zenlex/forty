// Transcribed from Frank Poth Copyright 02/28/2018

/* Part 2 - add character to screen and give control to move/jump with some animation

/* This is the basic "skeleton" of the program. It has three main parts: 
the controller, display, and game logic. It also has an engine which combines the three logical parts which are otherwise completely separate. One of the most important aspects of programming is organization. Without an organized foundation, your code will quickly become unruly and difficult to maintain. Separating code into logical groups is also a principle of object oriented programming, which lends itself to comprehensible, maintainable code as well as modularity. */

/* Since scripts are loaded dynamically from the rabbit-trap.html, they are wrapped in a load listener. This ensures that this code will not execute until the document has finished loading and I have access to all of my classes. */

window.addEventListener("load", function (event) {
  "use strict";

  /*********FUNCTIONS **********/

  var render = function () {
    display.fill(game.world.background_color);
    let player = game.world.player;
    display.drawRectangle(
      player.x,
      player.y,
      player.width,
      player.height,
      player.color
    );
    display.render();
  };

  var update = function () {
    if (controller.left.active) {
      game.world.player.moveLeft();
    }
    if (controller.right.active) {
      game.world.player.moveRight();
    }
    if (controller.up.active) {
      game.world.player.jump();
      controller.up.active = false;
    }
    game.update();
  };

  var keyDownUp = function (event) {
    controller.keyDownUp(event.type, event.keyCode);
  };

  var resize = function (event) {
    display.resize(
      document.documentElement.clientWidth - 32,
      document.documentElement.clientHeight - 32,
      game.world.height / game.world.width
    );
    display.render();
  };
  /////////////////////
  ////// OBJECTS //////
  /////////////////////

  /* The controller handles user input. */
  var controller = new Controller();
  /* The display handles window resizing as well as the on screen canvas */
  var display = new Display(document.querySelector("canvas"));
  /* The game will eventually hold our game logic. */
  var game = new Game();
  /* The engine is hwere the above three sections can interact */
  var engine = new Engine(1000 / 30, render, update);

  ////////////////////
  //// INITIALIZE ////
  ////////////////////

  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;

  window.addEventListener("resize", resize);
  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup", keyDownUp);

  resize();

  engine.start();
});
