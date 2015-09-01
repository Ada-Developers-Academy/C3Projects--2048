var board = []
$(document).ready(function() {

  function begin() {
    for (i = 0; i < 4; i++) {
      board[i] = new Array(4);
      console.log(board);
    }
    console.log('ready!');
    board[1][0] = "2";
    board[2][0] = "2";
  }

  begin();

  // {key: starting position}
  // {37: c0, 38: r0, 39: c3, 40: r3}
  // left = 37
  // up = 38
  // right = 39
  // down = 40

  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      // var tile = $('.tile');
      // console.log(tile);
      // console.log(tile.length);
      // console.log(tile[1]);
      // empty(tile);
      moveTiles(event.which);
      event.preventDefault();
    }
  })
})

function empty(location) {
  // input will be board location
  // check if board array location is undefined
  var answer = location == undefined ? true : false;
  console.log(answer);
  return answer;
}

function mergeTile(tile) {
  var new_tile_value = tile.attr("data-val") * 2;
  tile.attr("data-val", new_tile_value);
  tile.text(new_tile_value);
}

function moveTiles(direction) {
  switch(direction) {
    case 38: //up
      // for (y = 0; y <= 3; y++) { // for each column
        for (x = 0; x < 3; x++) { // don't want to move a non-existant row up
          console.log("round" + x)
          if (empty(board[x][0])) {
            // console.log("x also is" + x)
            // console.log("boo" + empty(board[x][0]))
            board[x][0] = board[x+1][0];
            // console.log("space check" + board[x][0])
            // console.log("space move" + board[x+1][0])
            board[x+1][0] = undefined;
            // console.log("space checK" + board[x+1][0])
            var old_row = ".tile[data-row=r" + (x + 1) + "]"
            var tile = $(old_row);
            var new_row = "r" + (x);
            tile.attr("data-row", new_row);
          }
        }
      // }
      break;
    case 40: //down
      // for (y = 0; y <= 3; y++) { // for each column
        for (x = 3; x > 0; x--) { // don't want to move a non-existant row up
          if (empty(board[x][0])) {
            board[x][0] = board[x-1][0];
            board[x-1][0] = undefined;
            var old_row = ".tile[data-row=r" + (x - 1) + "]"
            var tile = $(old_row);
            var new_row = "r" + (x);
            tile.attr("data-row", new_row);
          }
        }
      // }
      break;
    case 37: //left
      for (x = 0; x <= 3; x++) { // for each row
        for (y = 0; y < 3; y++) { // don't want to move a non-existant column up
          if (empty(board[x][y])) {
            board[x][y] = board[x][y+1];
            board[x][y+1] = undefined;
            var old_column = ".tile[data-row=c" + (y + 1) + "]"
            var tile = $(old_column);
            var new_column = "c" + y;
            tile.attr("data-col", new_column);
          }
        }
      }
      break;
    case 39: //right
      for (x = 0; x <= 3; x++) { // for each row
        for (y = 3; y > 0; y--) { // don't want to move a non-existant column up
          if (empty(board[x][y])) {
            board[x][y] = board[x][y-1];
            board[x][y-1] = undefined;
            var old_column = ".tile[data-row=c" + (y - 1) + "]"
            var tile = $(old_column);
            var new_column = "c" + y;
            tile.attr("data-col", new_column);
          }
        }
      }
      break;
  }
}
