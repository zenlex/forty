// Transcribed from Frank Poth Copyright 02/28/2018

/* Part 2 - add character to screen and give control to move/jump with some animation

/* This is the basic "skeleton" of the program. It has three main parts: 
the controller, display, and game logic. It also has an engine which combines the three logical parts which are otherwise completely separate. One of the most important aspects of programming is organization. Without an organized foundation, your code will quickly become unruly and difficult to maintain. Separating code into logical groups is also a principle of object oriented programming, which lends itself to comprehensible, maintainable code as well as modularity. */

/* Since scripts are loaded dynamically from the rabbit-trap.html, they are wrapped in a load listener. This ensures that this code will not execute until the document has finished loading and I have access to all of my classes. */

window.addEventListener("load", function (event) {
  "use strict";

  //// CLASSES ////

  /*The assets manager will be responsible for loading and storing graphics for the game. Because it only has to load the tilesheet image right now, it's very specific */
  const AssetsManager = function () {
    this.tile_set_image = undefined;
  };

  AssetsManager.prototype = {
    constructor: Game.AssetsManager,

    loadTileSetImage: function (url, callback) {
      this.tile_set_image = new Image();

      this.tile_set_image.addEventListener(
        "load",
        function (event) {
          callback();
        },
        { once: true }
      );

      this.tile_set_image.src = url;
    },
  };

  /*********FUNCTIONS **********/
  var keyDownUp = function (event) {
    controller.keyDownUp(event.type, event.keyCode);
  };

  var resize = function (event) {
    display.resize(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight,
      game.world.height / game.world.width
    );
    display.render();
  };

  var render = function () {
    display.drawMap(
      assets_manager.tile_set_image,
      game.world.tile_set.columns,
      game.world.map,
      game.world.columns,
      game.world.tile_set.tile_size
    );

    let frame = game.world.tile_set.frames[game.world.player.frame_value];

    display.drawObject(
      assets_manager.tile_set_image,
      frame.x,
      frame.y,
      game.world.player.x +
        Math.floor(game.world.player.width * 0.5 - frame.width * 0.5) +
        frame.offset_x,
      game.world.player.y + frame.offset_y,
      frame.width,
      frame.height
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

  /////////////////////
  ////// OBJECTS //////
  /////////////////////
  var assets_manager = new AssetsManager();
  var controller = new Controller();
  var display = new Display(document.querySelector("canvas"));
  var game = new Game();
  var engine = new Engine(1000 / 30, render, update);

  ////////////////////
  //// INITIALIZE ////
  ////////////////////

  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;
  display.buffer.imageSmoothingEnabled = false;

  assets_manager.loadTileSetImage("rabbit-trap.png", () => {
    resize();

    engine.start();
  });

  window.addEventListener("resize", resize);
  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup", keyDownUp);
});
