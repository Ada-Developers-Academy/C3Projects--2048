$(document).ready(function() {
  console.log('ready!');
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

// generate data structure to keep track of spaces -- object with array pairs
// x = { 0:[c0, r0], 1:[c1, r0], 2:[c2, r0] }
// { '0': [ 0, 0 ], '1': [ 1, 0 ], '2': [ 2, 0 ] }

function createTile() {

  // Check for empty spaces before creating

  // Create new div element with tile class, location attributes, and value attribute
  var colrand = Math.floor(Math.random() * 4);
  var rowrand = Math.floor(Math.random() * 4);
  var column = 'c' + colrand;
  var row= 'r' + rowrand;
  console.log(column);
  console.log(row);
  var newTile = $( '<div= class="tile">2</div>');
  newTile.attr("data-row", row);
  newTile.attr("data-col", column);
  newTile.attr("data-val", "2");
  $('#gameboard').append(newTile);
  // console.log(newTile['data-row']);
  // Maybe assign unique tile identifier

  // Ramdomly generate location attributes. Always start with value of 2 for now.

  // Location attributes must be unique/unused.

  // Probably be called twice to initialize game
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
