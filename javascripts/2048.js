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
  this.boardLength = 4; // board is a square, so this is the same going both ways
  this.emptyTile = 0;
};

board = new Board([ // this is an example board for us to play with during testing
  [2,     2,   0,   0], // [2,   4,  16, 512],
  [4,     8,   4,   2], // [2,   8,  32, 256],
  [16,   32, 128,  64], // [0,   4, 128, 128],
  [512, 256, 128,  32] //  [0,   2,  64,  32]
]);

Board.prototype.move = function(direction) {
  // this is the movement function
  // var reorientedBoard = this.reorient(direction);
};

// board.reorient() reorients the board into arrays based on direction
Board.prototype.reorient = function(direction) {
  var method;

  if (direction == "left" || direction == "right")
    method = "horizontalReorient";
  else // "up" || "down"
    method = "verticalReorient";

  return this[method].call(this); // execute the method in the current context
};

Board.prototype.horizontalReorient = function() {
  return this.board.slice(); // slice() will make a copy for us.
}; // or do we want to modify the board in place?

Board.prototype.verticalReorient = function() {
  var reorientedBoard = [];

  for (var oldCol = 0; oldCol < this.boardLength; oldCol++) {
    var newRow = [];

    for (var oldRow = 0; oldRow < this.boardLength; oldRow++) {
      newRow.push(this.board[oldRow][oldCol]);
    };

    reorientedBoard.push(newRow);
  };

  return reorientedBoard;
};

// board.condense(columnOrRow)
Board.prototype.condense = function(colOrRow) {
  var condensedColOrRow = [];

  for (i = 0; i < colOrRow.length; i++) {
    if (colOrRow[i] == this.emptyTile) {
      continue;
    } else {
      condensedColOrRow.push(colOrRow[i]);
    }
  }

  return condensedColOrRow;
}

//board.compareAndResolve()
Board.prototype.compareAndResolve = function(condensedColOrRow, direction) {
  if (direction == "up" || direction == "left") {
  // up & left -> starts at the beginning of the array, moves forward
    return this.moveForward(condensedColOrRow);
  } else {
  // down & right -> starts at the end of the array, moves backward
    return this.moveBackward(condensedColOrRow);
  }
}

Board.prototype.moveForward = function(condensedColOrRow) {
  var resolvedColOrRow = [];

  for (i = 0; i < condensedColOrRow.length; i++) {
    var currentTileValue = condensedColOrRow[i];
    var nextTileValue = condensedColOrRow[i + 1];

    if (currentTileValue == nextTileValue) {
      var newTileValue = currentTileValue * 2;

      resolvedColOrRow.push(newTileValue);
      this.updateScore(newTileValue);

      i += 1; // this will increment by two (once here and once as defined by for loop)
    } else {
      resolvedColOrRow.push(condensedColOrRow[i]);
    }
  }

  return resolvedColOrRow;
}

Board.prototype.moveBackward = function(condensedColOrRow) {
  var resolvedColOrRow = [];

  for (i = condensedColOrRow.length - 1; i >= 0; i--) {
    var currentTileValue = condensedColOrRow[i];
    var nextTileValue = condensedColOrRow[i - 1];

    if (currentTileValue == nextTileValue) {
      var newTileValue = currentTileValue * 2;

      resolvedColOrRow.unshift(newTileValue); // adds to beginning of array
      this.updateScore(newTileValue);

      i -= 1; // this will increment by two (once here and once as defined by for loop)
    } else {
      resolvedColOrRow.unshift(condensedColOrRow[i]);
    }
  }

  return resolvedColOrRow;
}

Board.prototype.updateScore = function(points) {
  // this will somehow update the total score the player has going
}

//------------ UP example --------------

// before reorient UP move
board2 = new Board([
  [2, 4,  32, 512],
  [2, 4,  32, 256],
  [0, 4, 128, 256],
  [0, 2,  64,  32]
]);
// after reorient, before condense / resolve UP:
//   [  2,   2,   0,   0]
//   [  4,   4,   4,   2]
//   [ 32,  32, 128,  64]
//   [512, 256, 256,  32]

// after condense & resolve -- now ready for build:
var condensedUp = [
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
var condensedDown = [
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
  // all this emptySpots stuff is setup for the new tile event function
  var emptySpots = []; // this will eventually be a set of [row, column] positions for all the 0s / empty spots
  var boardLength = this.boardLength;
  var emptyTile = this.emptyTile;

  var rebuild = function(array, currentRow) { // currentRow is for emptySpots positions
    while (array.length < boardLength) {
      if (direction == "left" || direction == "up") {
        // [2, 4] & we're about to push in this.emptyTile at index 2
        currentColumn = array.length; // currentColumn is for emptySpots positions
        array.push(emptyTile);
      } else { // "right" || "down"
        // [2, 4] & we're about to unshift in this.emptyTile at eventual index 1 (4 - 2 - 1 == 1)
        currentColumn = boardLength - array.length - 1; // currentColumn is for emptySpots positions
        array.unshift(emptyTile);
      }; // see ya, if

      emptySpots.push([currentRow, currentColumn]); // tell emptySpots where we just filled in an empty tile
    } // see ya, while
    return array;
  } // see ya, rebuild()

  extendedArrays = [];
  for (var currentRow = 0; currentRow < boardLength; currentRow++) {
    var extendedRow = rebuild(condensedArrays[currentRow], currentRow); // this reminds me of ruby's .each_with_index...
    extendedArrays.push(extendedRow);
  } // see ya, for

  this.board = extendedArrays; // NOTE this is mutating the original board

  // call new tile event here
  // NOTE this needs to happen BEFORE the board is reoriented, because the
  // positions created above are based on the current orientation
  board2.newTile(emptySpots);

  // twisting the board back to its original orientation
  this.board = this.reorient(direction); // NOTE this is mutating the original board
}

Board.prototype.newTile = function(emptySpots) {
  // handling for newTile here
  // var randomIndex = Math.floor(Math.random() * this.boardLength);
  // newTileLocation = emptySpots[randomIndex];
}
