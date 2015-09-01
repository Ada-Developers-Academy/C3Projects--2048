$(document).ready(function() {
  console.log('ready!');
  initializeBoard();
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      // var tile = $('.tile');
      moveTile(event.which);
      event.preventDefault();
    }
  })
})

var board     = [];
var boardSize = 4;

// sets up 2D array
function initializeBoard() {
  for(var i = 0; i < boardSize; i++) {
    innerBoard = [];
    board.push(innerBoard);

    for(var j = 0; j < boardSize; j++) {
      board[i][j] = 0;
      }
    }
    assignRandoTiles();
    assignRandoTiles();
    displayBoard();
    console.log(board.toString());
  }

  // sets the position of starter tiles in 2D array -- currently only setting
  // value to 2
  function assignRandoTiles() {
    var y = Math.floor(Math.random() * (boardSize));
    var x = Math.floor(Math.random() * (boardSize));
    if(board[y][x] == 0) {
      var rando = Math.random();
      if(rando < .75) {
        board[y][x] = 2;
      }
      else{
        board[y][x] = 4;
      }
    }
    else {
      assignRandoTiles();
      // this will run endlessly when the board is full -- write a conditional for that
    }
  }

  function displayBoard() {
    for(var y = 0; y < boardSize; y++) {
      for(var x = 0; x < boardSize; x++) {
        var cell = $(".tile[data-row=y" + y + "][data-col=x" + x);
        cell.attr("data-val", board[y][x]);
        cell.text(board[y][x]);
      }
    }
  }


function moveTile(direction) {
  // var new_tile_value = tile.attr("data-val") * 2;
  // tile.attr("data-val", new_tile_value);
  // tile.text(new_tile_value);
  switch(direction) {
    case 38: //up
      moveUp();
      // tile.attr("data-row","y3");
      break;
    case 40: //down
      moveDown();
      // tile.attr("data-row","y0");
      break;
    case 37: //left
      moveLeft();
      // tile.attr("data-col","x0");
      break;
    case 39: //right
      moveRight();
      // tile.attr("data-col","x3");
      break;
  }
  displayBoard();
}

function moveUp() {
  var starterBoard = board.toString();
  // traversal starting point = y0, x0
  for(y = 0; y < boardSize; y++) {
    for(x = 0; x < boardSize; x++) {
      // check if blank
      if (board[y][x] != 0) {
        // do something
        var next = checkNext(y, x);
        if (next == 0) {
          // move it
          board[y + 1][x] = board[y][x];
          board[y][x]     = 0;
        }
        else if (next == board[y][x]) {
          // collapse it
          board[y + 1 ][x] += board[y][x];
          board[y][x]       = 0;
        }
        else {
          // do nothing probably dont need this. we'll see
        }
      }
      else {
      }
    }
  }
  if (board.toString() != starterBoard){
    assignRandoTiles();
  }
}

function moveDown () {
  // traversal starting point = y3, x0
}

function moveLeft() {
  // traversal starting point = y0, x3
}

function moveRight() {
  // traversal starting point = y0, x0
}

function checkNext(y, x) {
  // this is for up condition
  if(y + 1 <= 3) {
  return board[y + 1][x];
  }
  else {
    return null;
  }
}
