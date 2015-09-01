var rows = ['r0', 'r1', 'r2', 'r3'];
var cols = ['c0', 'c1', 'c2', 'c3'];
var startValues = [ 2, 4 ];

$(document).ready(function() {


  initializeGame();

  console.log('ready!');
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, event.which);
      event.preventDefault();
    }
  });
});

function initializeGame() {
  // randomly pick two positions and start values
  generateTile(startValues);
  generateTile(startValues);
}

function generateTile(array) {
  var tile = $('<div class="tile" data-row="", data-col="" data-val="">');
  var randomRow = Math.floor(Math.random() * (rows.length));
  var randomCol = Math.floor(Math.random() * (cols.length));
  var randomValue = Math.floor(Math.random() * (array.length));

  tile.attr('data-row', rows[randomRow]);
  tile.attr('data-col', cols[randomCol]);
  tile.attr('data-val', array[randomValue]);
  tile.text(array[randomValue]);

  if ($('[data-row=' + rows[randomRow] + '][data-col=' + cols[randomCol] + ']').length === 0) {
    $('#gameboard').append(tile);
  } else {
    generateTile(array);
  }
}

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
