// declare a mystical global board
// exist, board!

var Board = function(boardArray) { // board constructor
  this.board = boardArray;
  this.boardLength = 4; // board is a square, so this is the same going both ways
  this.emptyTile = 0;
};

var board = new Board([
  [0, 0, 0, 2],
  [0, 0, 0, 0],
  [0, 2, 0, 0],
  [0, 0, 0, 0]
]);

$(document).ready(function() {
  board.display();
  console.log('ready, should be displayed!');

  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, event.which);
      event.preventDefault();
    }
  })
})

function moveTile(tile, direction) {
  switch(direction) {
    case 38: // up
      board.move("up");
      break;
    case 40: // down
      board.move("down");
      break;
    case 37: // left
      board.move("left");
      break;
    case 39: // right
      board.move("right");
      break;
  }
}


Board.prototype.display = function() {
  var gameboard = $("#gameboard");
  // mark all the tiles as old, so we know which ones need to be removed later
  $('.tile').addClass('old');

  for (var row = 0; row < this.boardLength; row++) {
    for (var col = 0; col < this.boardLength; col++) {
      var tileValue = this.board[row][col];

      if (tileValue != this.emptyTile) {
        var tile = $('<div></div>');
        tile.addClass("tile"); // mark the tile as a tile
        // add the attributes necessary for the tile to display in the right spot on the board
        tile.attr("data-row", "r" + row);
        tile.attr("data-col", "c" + col);
        tile.attr("data-val", tileValue);
        tile.text(tileValue);

        // remove the old tag, since this tile has been changed & shouldn't be deleted
        tile.removeClass("old"); // this tile isn't old anymore

        gameboard.append(tile);
      };
    }
  }

  $('.old').remove(); // remove any old tiles that remain

  var bd = this.board // we can delete this before the final PR, but in the mean
  console.log(bd[0]); // time it's nice to be able to open the console and see
  console.log(bd[1]); // the current iteration of the board!
  console.log(bd[2]);
  console.log(bd[3]);
}

// board.move("left")
// this is the movement controlling function that calls each step until a move is complete
Board.prototype.move = function(direction) {
  var that = this; // make this, which is the board object .move is being called on, available to inner scopes

  var newBoard = that.slice(); // ? is this the correct method to copy a board?

  // 1. reorient function => array of arrays in columns or rows
  var reorientedBoard = newBoard.reorient(direction);

  var resolvedBoard = reorientedBoard.map(function(currentRow) {
    // 2. each row/column condense function (LOOP)
    var condensedRow = newBoard.condense(currentRow, direction);
    // 3. each row/column => compare function (LOOP)
    return newBoard.compareAndResolve(condensedRow, direction);
  });

  // 4. build new board from results (takes in array of condensed arrays, returns array of uncondensed arrays)
  newBoard.build(resolvedBoard, direction, reorientedBoard); // NOTE build in its current form mutates the original board

  // 5. display board
  newBoard.display();

  this.board = newBoard; // reassigns the oldBoard to be the newboard's values (prep for the next move)
}

// board.reorient("down")
// reorients the board into arrays based on direction
Board.prototype.reorient = function(direction) {
  var method;

  if (direction == "left" || direction == "right")
    method = "horizontalReorient";
  else // "up" || "down"
    method = "verticalReorient";

  return this[method].call(this); // execute the function in the current context
};

// board.horizontalReorient()
// this function returns the board as is, since it's already oriented for left-right operations by default
Board.prototype.horizontalReorient = function() {
  return this.board.slice(); // slice() will make a copy for us.
}; // or do we want to modify the board in place?

// board.verticalReorient()
// this function returns the board twisted 90 degrees, so we can traverse up/down along individual arrays
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

// board.condense([2, 0, 0, 0]) // => [2]
// this function condenses empty tiles out of a row
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

// board.compareAndResolve([2, 2, 4], "left") // => board.moveForward([2, 2, 4])
// this function determines whether a row needs to be traversed forward or
// backward and sends the row along to the function that will do the traversal.
Board.prototype.compareAndResolve = function(condensedColOrRow, direction) {
  if (direction == "up" || direction == "left") {
  // up & left -> starts at the beginning of the array, moves forward
    return this.moveForward(condensedColOrRow);
  } else {
  // down & right -> starts at the end of the array, moves backward
    return this.moveBackward(condensedColOrRow);
  }
}

// board.moveForward([2, 4, 4, 4]) // => [2, 8, 4]
// this function traverses through a row, collapsing same-number pairs along the way
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

// board.moveBackward([2, 4, 4, 4]) // => [2, 4, 8]
// this function traverses through a row, collapsing same-number pairs along the way
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

Board.prototype.build = function(condensedArrays, direction, oldBoard) {
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
  if (oldBoard.toString() != this.board.toString()) {
    this.newTile(emptySpots);
  };

  // twisting the board back to its original orientation
  this.board = this.reorient(direction); // NOTE this is mutating the original board
}

Board.prototype.newTile = function(emptySpots) {
  // pick a location to insert the new tile at
  var randomIndex = Math.floor(Math.random() * (emptySpots.length));
  newTileLocation = emptySpots[randomIndex];
  newTileRow = newTileLocation[0];
  newTileColumn = newTileLocation[1];

  // pick what new tile to insert
  var chanceOfFour = 0.15; // 15% chance of four
  var diceRoll = Math.random();
  var newTileValue = (diceRoll > chanceOfFour) ? 2 : 4;

  this.board[newTileRow][newTileColumn] = newTileValue;
}
