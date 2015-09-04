// declare a mystical global board
// exist, board!
var empty = "0";
var randomNumber = function() {
  return Math.floor(Math.random() * 4);
}

var createRandomNumberArray =  function() {
  // This will pick a random number between 0 and 3, four times
  var firstX = randomNumber(); // this picks a random number between 0 and 3
  var firstY = randomNumber();
  var secondX = randomNumber();
  var secondY = randomNumber();

  // If the two positions are the same, we'll pick a different second place
  while (firstX == secondX && firstY == secondY) {
    secondX = randomNumber();
    secondY = randomNumber();
  }

  // It will store it in an array [[0, 1], [2, 3]]
  // We'll return the array
  return [[firstX, firstY], [secondX, secondY]];
}

var createBoard = function(randomNumbersArray) {
  //This will put the board together with the random configuration
  var row1 = randomNumbersArray[0][0];
  var col1 = randomNumbersArray[0][1];
  var row2 = randomNumbersArray[1][0];
  var col2 = randomNumbersArray[1][1];

  var array = [
    [empty, empty, empty, empty],
    [empty, empty, empty, empty],
    [empty, empty, empty, empty],
    [empty, empty, empty, empty],
  ]

  array[row1][col1] = 2; // this fills the two starting points
  array[row2][col2] = 2;

  return array
}

var Board = function(boardArray) { // board constructor
  this.board = boardArray;
  this.boardLength = 4; // board is a square, so this is the same going both ways
  this.emptyTile = empty;
};

var board = new Board(createBoard(createRandomNumberArray()));


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

  // 1. reorient function => array of arrays in columns or rows
  var reorientedBoard = this.reorient(direction);

  var resolvedBoard = reorientedBoard.map(function(currentRow) {
    // 2. each row/column condense function (LOOP)
    var condensedRow = that.condense(currentRow, direction);
    // 3. each row/column => compare function (LOOP)
    return that.compareAndResolve(condensedRow, direction);
  });

  // 4. build new board from results (takes in array of condensed arrays, returns array of uncondensed arrays)
  this.build(resolvedBoard, direction, reorientedBoard); // NOTE build in its current form mutates the original board

  // 5. display board
  this.display();

  // 6. resolve win/lose condition
  this.isGameOver();
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

  for (var i = 0; i < colOrRow.length; i++) {
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

  for (var i = 0; i < condensedColOrRow.length; i++) {
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

  for (var i = condensedColOrRow.length - 1; i >= 0; i--) {
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

Board.prototype.isGameOver = function() {
  var win = false;
  var lose = false;
  var that = this;
  // 1. check for winning first
  this.board.forEach(function(row) {
    if (row.indexOf(2048) > -1) {
      win = true;
      return that.gameOver("win");
    }
  });

  // 2. check for losing if we haven't won
  //   - check if there are any zeros
  var hasZeros = false;
  this.board.forEach(function(row) {
    zeros = row.filter(function(tile) {
      return tile == that.emptyTile;
    });

    if (zeros.length > 0) {
      console.log("there are zeros in row index #" + row);
      hasZeros = true;
      return;
    }
  });

  if (hasZeros) { return; }

  //  - check for legal moves?
  var board = this.board;
  for (var row = 0; row < this.boardLength; row++) {
    for (var col = 0; col < this.boardLength; col++) {
      // if you're the last row, we don't care about a row below you anymore
      if (row == this.boardLength - 1) {
        if (board[row][col] == board[row][col + 1]) {
          return;
        };
      } else if (col == this.boardLength - 1) {
        if (board[row][col] == board[row + 1][col]) {
          return;
        };
      } else if (board[row][col] == board[row + 1][col] || board[row][col] == board[row][col + 1]) {
        return;
      }; // bye, if last row
    } // bye, for col loop
  } // bye, for row loop

  return this.gameOver("lose");
}

Board.prototype.gameOver = function(condition) {
  // call this from somewhere??

  var endgame = $('#endgame');
  endgame.addClass(condition);

  // stop the click handlers?
}
