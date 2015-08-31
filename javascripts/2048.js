$(document).ready(function() {
  var board = []

  function begin() {
    for (i = 0; i < 4; i++) {
      board[i] = new Array(4);
      console.log(board);
    }
    console.log('ready!');

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
      var tile = $('.tile');
      console.log(tile);
      console.log(tile.length);
      console.log(tile[1]);
      empty(tile);
      moveTile(tile, event.which);
      event.preventDefault();
    }
  })
})


function empty(location) {
  // input will be board location
  // check if board array location is undefined
  var answer = location == undefined ? true : false;
  console.log(location);
  console.log(answer);
  return answer;
}

function mergeTile(tile) {
  var new_tile_value = tile.attr("data-val") * 2;
  tile.attr("data-val", new_tile_value);
  tile.text(new_tile_value);
}

function moveTile(tile, direction) {




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
