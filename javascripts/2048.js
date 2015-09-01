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

// before condense / resolve LEFT:
//   [  2,   2,   0,   0]
//   [  4,   4,   4,   2]
//   [ 32,  32, 128,  64]
//   [512, 256, 256,  32]

// after:
// var condensed = [
//   [4],
//   [8, 4, 2],
//   [64, 128, 64],
//   [512, 512, 32]
// ];

// after rebuild
// [  4,   0,  0, 0]
// [  8,   4,  2, 0]
// [ 64, 128, 64, 0]
// [512, 512, 32, 0]

Board.prototype.build = function(condensedArrays) {
  var rebuild = function(array) {
    while (array.length < 4) {
      array.push(0);
    }
  }

  condensedArrays.forEach(rebuild);
}

// console.log(condensed);
// build(condensed);
// console.log(condensed);
