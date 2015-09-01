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

// board.condense(columnOrRow)
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

//board.compareAndResolve()
Board.prototype.compareAndResolve = function(condensedColOrRow, direction) {
  var resolvedColOrRow = [];

  if (direction == "up" || direction == "left") {
  // up & left -> starts at the beginning of the array, moves forward
    for (i = 0; i < condensedColOrRow.length; i++) {
      if (condensedColOrRow[i] == condensedColOrRow[i + 1]) {
        //COLLIDE!
        var newVal = condensedColOrRow[i] + condensedColOrRow[i + 1];
        resolvedColOrRow.push(newVal);
        i += 1; // this will increment by two
      } else {
        resolvedColOrRow.push(condensedColOrRow[i]);
      }
    }
  } else {
  // down & right -> starts at the end of the array, moves backward
    for (i = condensedColOrRow.length - 1; i >= 0; i--) {
      if (condensedColOrRow[i] == condensedColOrRow[i - 1]) {
        // COLLIDE!
        var newValue = condensedColOrRow[i] + condensedColOrRow[i - 1];
        resolvedColOrRow.unshift(newValue); // adds to beginning of array
        i -= 1; // this will increment by two
      } else {
        resolvedColOrRow.unshift(condensedColOrRow[i]);
      }
    }
  }

  return resolvedColOrRow;
}














//
