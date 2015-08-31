$(document).ready(function() {
  console.log('ready!');
  initializeGame();
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];

    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, event.which);
      createTile();
      event.preventDefault();
    }
  })
})

 //keeps track of where on the board has a tile
  var filled_space = [];

function initializeGame() {
  createTile();
  createTile();
}

function rando_num(){
  return Math.floor(Math.random() * 4);
}


function checkLocation(column, row) {
  for(var i = 0; i < filled_space.length; i++) {
    if (filled_space[i] == column + row) {
      column = 'c' + rando_num();
      row = 'r' + rando_num();
      checkLocation(column, row);
    }
  }
  return [column, row];
}

function createTile() {

  // Set initial random location to check
  var new_column = 'c' + rando_num();
  var new_row = 'r' + rando_num();


  // Check for empty space before creating tile
  var result = checkLocation(new_column, new_row);

  var column = result[0];
  var row = result[1];

  // Create new div element with tile class, location attributes, and value attribute
  var newTile = $( '<div= class="tile">2</div>');
  newTile.attr("data-row", row);
  newTile.attr("data-col", column);
  newTile.attr("data-val", "2");
  $('#gameboard').append(newTile);

  // Add the created tile to the array of filled spaces
  filled_space.push(column + row);


  // Maybe assign unique tile identifier
}

function destroyTile() {
  // If a tile is merged into a new tile, tile is destroyed

  // div is destroyed
}

 // Function may need more arguments to work
function tileCollide(tile) {
  // Should happen upon collision
  var new_tile_value = tile.attr("data-val") * 2;
  tile.attr("data-val", new_tile_value);
  tile.text(new_tile_value);
}

function moveTile(tile, direction) {
  // needs conditionals to check for occupied grids spaces
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
