$(document).ready(function() {
  console.log('ready!');
  $('body').keydown(function(event){ // invoking a keydown event
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, event.which);
      event.preventDefault();
    }
  })
})

function moveTile(tile, direction) {
  var new_tile_value = tile.attr("data-val") * 2;
  tile.attr("data-val", new_tile_value);
  tile.text(new_tile_value);

  switch(direction) {
    case 38: //up
      tile.attr("data-row","r0");
      break;
    case 40: //down
      tile.attr("data-row","r3");
      break;
    case 37: //left
      tile.attr("data-col","c0");
      break;
    case 39: //right
      tile.attr("data-col","c3");
      break;
  }
}


// board = new Board([]);
var Board = function(boardArray) { // board constructor
  this.board = boardArray;
}

Board.protoype.update(direction) {
  // this is the movement function
  // var reorientedBoard = this.split();
  // this.condense();
}

// board.split()
Board.prototype.split() {
  // splits the board into arrays based on direction
}

// board.condense()
Board.prototype.condense = function(colOrRow) {
  var condensedColOrRow = [];

  for (i = 0; i < colOrRow.length; i++) {
    if (colOrRow[i] == "0") {
      continue;
    } else {
      condensedColOrRow.push(colOrRow[i]);
    }
  }

  return condensedColOrRow;
}

//------------ UP example --------------

// before reorient UP move
// [2, 4,  32, 512]
// [2, 4,  32, 256]
// [0, 4, 128, 256]
// [0, 2,  64,  32]

// after reorient, before condense / resolve UP:
//   [  2,   2,   0,   0]
//   [  4,   4,   4,   2]
//   [ 32,  32, 128,  64]
//   [512, 256, 256,  32]

// after condense & resolve -- now ready for build:
var condensed = [
  [4],
  [8, 4, 2],
  [64, 128, 64],
  [512, 512, 32]
];

// after rebuild step
// [  4,   0,  0, 0]
// [  8,   4,  2, 0]
// [ 64, 128, 64, 0]
// [512, 512, 32, 0]

// after reorient step, READY FOR NEW TILE! :)
// [4, 8,  64, 512]
// [0, 4, 128, 512]
// [0, 2,  64,  32]
// [0, 0,   0,   0]

//------------ DOWN example --------------

// before reorient DOWN move
// [2, 4,  32, 512]
// [2, 4,  32, 256]
// [0, 4, 128, 256]
// [0, 2,  64,  32]

// after reorient, before condense / resolve DOWN:
//   [  2,   2,   0,   0]
//   [  4,   4,   4,   2]
//   [ 32,  32, 128,  64]
//   [512, 256, 256,  32]

// after condense & resolve -- now ready for build:
var condensed = [
  [4],
  [4, 8, 2],
  [64, 128, 64],
  [512, 512, 32]
];

// after rebuild step
// [0,   0,   0,  4]
// [0,   4,   8,  2]
// [0,  64, 128, 64]
// [0, 512, 512, 32]

// after reorient step, READY FOR NEW TILE! :)
// [0, 0,   0,   0]
// [0, 4,  64, 512]
// [0, 8, 128, 512]
// [4, 2,  64,  32]

Board.prototype.build = function(condensedArrays, direction) {
  var rebuild = function(array) {
    while (array.length < 4) {
      if (direction == "left" || direction == "up")
        array.push(0);
      else // "right" || "down"
        array.unshift(0);
    }
  }

  var direction = "left";
  condensedArrays.forEach(rebuild);
  condensedArrays.reorient(direction);
}

console.log(condensed);
build(condensed);
console.log(condensed);
