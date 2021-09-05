//PICK UP HERE - something is screwy in what's rendering out. pixel math is off somewhere. Otherwise it functions....

//Transcribed from Frank Poth (copyright 02/28/2018)

/* This Display class contains the screen resize event handler and also handles
drawing colors to the buffer and then to the display. */
const Display = function (canvas) {
  (this.buffer = document.createElement("canvas").getContext("2d")),
    (this.context = canvas.getContext("2d"));

  this.drawMap = function (image, image_columns, map, map_columns, tile_size) {
    for (let index = map.length - 1; index > -1; --index) {
      let value = map[index];
      let source_x = (value % image_columns) * tile_size;
      let source_y = Math.floor(value / image_columns) * tile_size;
      let destination_x = (index % map_columns) * tile_size;
      let destination_y = Math.floor(index / map_columns) * tile_size;

      this.buffer.drawImage(
        image,
        source_x,
        source_y,
        tile_size,
        tile_size,
        destination_x,
        destination_y,
        tile_size,
        tile_size
      );
    }
  };

  this.drawObject = function (
    image,
    source_x,
    source_y,
    destination_x,
    destination_y,
    width,
    height
  ) {
    this.buffer.drawImage(
      image,
      source_x,
      source_y,
      width,
      height,
      Math.round(destination_x),
      Math.round(destination_y),
      width,
      height
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

    this.context.imageSmoothingEnabled = false;
  };
};

Display.prototype = {
  constructor: Display,

  render: function () {
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
  },
};
