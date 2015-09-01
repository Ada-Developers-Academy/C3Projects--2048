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


var Board = function(boardArray) { // board constructor
  this.board = boardArray;
};

board = new Board([
  [2,     2,   0,   0], // [2,   4,  16, 512],
  [4,     8,   4,   2], // [2,   8,  32, 256],
  [16,   32, 128,  64], // [0,   4, 128, 128],
  [512, 256, 128,  32] //  [0,   2,  64,  32]
]);

console.log(board.board);

Board.prototype.move = function(direction) {
  // this is the movement function
  var reorientedBoard = this.split(direction);
  console.log(reorientedBoard);
  // var condensedBoard = reorientedBoard.forEach(this.condense); // not 100% certain about this syntax
};

// board.split()
Board.prototype.reorient = function(direction) {
  // splits the board into arrays based on direction
  // this should have access to the direction from board.update();
  var method;
  if (direction == "left" || direction == "right")
    method = "leftReorient";
  else // "up" || "down"
    method = "downReorient";

  return this[method].call(this); // execute the method in the current context
};

Board.prototype.leftReorient = function() {
  return this.board; // or do we want to modify the board in place?
};

Board.prototype.downReorient = function() {
  var reorientedBoard = [];

  for (var oldCol = 0; oldCol < 4; oldCol++) {
    var newRow = [];

    for (var oldRow = 0; oldRow < 4; oldRow++) {
      newRow.push(this.board[oldRow][oldCol]);
    };

    reorientedBoard.push(newRow);
  };

  return reorientedBoard;
};

// board.condense()
Board.prototype.condense = function() {
  // condensing the array (removing empty spaces / 0s)
}
