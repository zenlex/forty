//PICK UP HERE - something is screwy in what's rendering out. pixel math is off somewhere. Otherwise it functions....

//Transcribed from Frank Poth (copyright 02/28/2018)

/* This Display class contains the screen resize event handler and also handles
drawing colors to the buffer and then to the display. */
const Display = function (canvas) {
  (this.buffer = document.createElement("canvas").getContext("2d")),
    (this.context = canvas.getContext("2d"));

  this.tile_sheet = new Display.TileSheet(16, 8);

  this.drawMap = function (map, columns) {
    for (let index = map.length - 1; index > -1; --index) {
      let value = map[index] - 1;
      let source_x =
        (value % this.tile_sheet.columns) * this.tile_sheet.tile_size;
      let source_y =
        Math.floor(value / this.tile_sheet.columns) * this.tile_sheet.tile_size;
      let destination_x = (index % columns) * this.tile_sheet.tile_size;
      let destination_y =
        Math.floor(index / columns) * this.tile_sheet.tile_size;

      this.buffer.drawImage(
        this.tile_sheet.image,
        source_x,
        source_y,
        this.tile_sheet.tile_size,
        this.tile_sheet.tile_size,
        destination_x,
        destination_y,
        this.tile_sheet.tile_size,
        this.tile_sheet.tile_size
      );
    }
  };

  this.renderColor = function (color) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(
      0,
      0,
      this.buffer.canvas.width,
      this.buffer.canvas.height
    );
  };

  this.drawPlayer = function (rectangle, color1, color2) {
    this.buffer.fillStyle = color1;
    this.buffer.fillRect(
      Math.floor(rectangle.x),
      Math.floor(rectangle.y),
      rectangle.width,
      rectangle.height
    );
    this.buffer.fillStyle = color2;
    this.buffer.fillRect(
      Math.floor(rectangle.x) + 2,
      Math.floor(rectangle.y) + 2,
      rectangle.width - 4,
      rectangle.height - 4
    );
  };

  this.fill = function (color) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(
      0,
      0,
      this.buffer.canvas.width,
      this.buffer.canvas.height
    );
  };

  this.render = function () {
    this.context.drawImage(
      this.buffer.canvas,
      0,
      0,
      this.buffer.canvas.width,
      this.buffer.canvas.height,
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
  };

  this.resize = function (width, height, hw_ratio) {
    if (height / width > hw_ratio) {
      this.context.canvas.height = width * hw_ratio;
      this.context.canvas.width = width;
    } else {
      this.context.canvas.height = height;
      this.context.canvas.width = height / hw_ratio;
    }

    this.render();
  };
};

Display.prototype = {
  constructor: Display,
};

Display.TileSheet = function (tile_size, columns) {
  this.image = new Image();
  this.tile_size = tile_size;
  this.columns = columns;
};

Display.TileSheet.prototype = {};
