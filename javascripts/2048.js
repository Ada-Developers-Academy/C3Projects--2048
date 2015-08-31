$(document).ready(function() {
  console.log('ready!');
  initializeBoard();
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, event.which);
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
    console.log(board.toString());
  }

  // sets the position of starter tiles in 2D array -- currently only setting
  // value to 2
  function assignRandoTiles() {
    var y = Math.floor(Math.random() * (boardSize));
    var x = Math.floor(Math.random() * (boardSize));
    if(board[y][x] == 0) {
      board[y][x] = 2;
    }
    else {
      assignRandoTiles();
      // this will run endlessly when the board is full -- write a conditional for that
    }
  }






function moveTile(tile, direction) {
  var new_tile_value = tile.attr("data-val") * 2;
  tile.attr("data-val", new_tile_value);
  tile.text(new_tile_value);

  switch(direction) {
    case 38: //up
      tile.attr("data-row","y3");
      break;
    case 40: //down
      tile.attr("data-row","y0");
      break;
    case 37: //left
      tile.attr("data-col","x0");
      break;
    case 39: //right
      tile.attr("data-col","x3");
      break;
  }
}
