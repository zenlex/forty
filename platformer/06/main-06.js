// Transcribed from Frank Poth Copyright 02/28/2018

/* Part 2 - add character to screen and give control to move/jump with some animation

/* This is the basic "skeleton" of the program. It has three main parts: 
the controller, display, and game logic. It also has an engine which combines the three logical parts which are otherwise completely separate. One of the most important aspects of programming is organization. Without an organized foundation, your code will quickly become unruly and difficult to maintain. Separating code into logical groups is also a principle of object oriented programming, which lends itself to comprehensible, maintainable code as well as modularity. */

/* Since scripts are loaded dynamically from the rabbit-trap.html, they are wrapped in a load listener. This ensures that this code will not execute until the document has finished loading and I have access to all of my classes. */

window.addEventListener("load", function (event) {
  "use strict";

  const ZONE_PREFIX = "06/zone";
  const ZONE_SUFFIX = ".json";

  //// CLASSES ////

  /*The assets manager will be responsible for loading and storing graphics for the game. Because it only has to load the tilesheet image right now, it's very specific */
  const AssetsManager = function () {
    this.tile_set_image = undefined;
  };

  AssetsManager.prototype = {
    constructor: Game.AssetsManager,

    requestJSON: function (url, callback) {
      let request = new XMLHttpRequest();

      request.addEventListener(
        "load",
        function (event) {
          callback(JSON.parse(this.responseText));
        },
        { once: true }
      );

      request.open("GET", url);
      request.send();
    },

    requestImage: function (url, callback) {
      let image = new Image();

      image.addEventListener(
        "load",
        function (event) {
          callback(image);
        },
        { once: true }
      );

      image.src = url;
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
      game.world.graphical_map,
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

    if (game.world.door) {
      engine.stop();

      assets_manager.requestJSON(
        ZONE_PREFIX + game.world.door.destination_zone + ZONE_SUFFIX,
        (zone) => {
          game.world.setup(zone);

          engine.start();
        }
      );

      return;
    }
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

  assets_manager.requestJSON(
    ZONE_PREFIX + game.world.zone_id + ZONE_SUFFIX,
    (zone) => {
      game.world.setup(zone);

      assets_manager.requestImage("rabbit-trap.png", (image) => {
        assets_manager.tile_set_image = image;

        resize();
        engine.start();
      });
    }
  );

  window.addEventListener("resize", resize);
  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup", keyDownUp);
});
