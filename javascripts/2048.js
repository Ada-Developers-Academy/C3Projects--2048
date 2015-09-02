$(document).ready(function() {
  console.log('ready!');
  arrayInitialize();
  initializeGame();
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];

    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(event.which);
      createTile();
      event.preventDefault();
    }
  })
})

 //keeps track of where on the board has a tile

var tile_array = [];
//set up for 2D array
function arrayInitialize(){
  for(var i = 0; i < 4; i++) {
    var first_array = [];
    tile_array.push(first_array);
    for(var j = 0; j < 4; j++) {
      tile_array[i][j] = undefined;
      }
    }
}

function initializeGame() {
  createTile();
  createTile();
}

function rando_num(){
  return Math.floor(Math.random() * 4);
}


function checkLocation(column, row) {
  for(var i = 0; i < tile_array.length; i++) {
    if (tile_array[column][row] !== undefined) {
      column = rando_num();
      row = rando_num();
      checkLocation(column, row);
    }
  }
  return [column, row];
}

function createTile() {

  // Check for empty spaces before creating
  // if (tile_array.length < 16) {
    var new_column = rando_num();
    var new_row = rando_num();

    var result = checkLocation(new_column, new_row);

    var column = result[0];
    var row = result[1];

    // Create new div element with tile class, location attributes, and value attribute
    var newTile = $( '<div= class="tile">2</div>');
    newTile.attr("data-col", 'c' + column);
    newTile.attr("data-row", 'r' + row);
    newTile.attr("data-val", "2");
    $('#gameboard').append(newTile);

    tile_array[column][row] = newTile;

  // } else {
  //   console.log("spaces full");
  // }

  // Maybe assign unique tile identifier
}

// function destroyTile() {
//   // If a tile is merged into a new tile, tile is destroyed

//   // div is destroyed
// }

//  // Function may need more arguments to work


function tileCollide(tile, neighbor) {
  // tile should be checked against neighbor
  if (tile.attr('data-val') == neighbor.attr('data-val')) {
    //move tile to neighbors spot
    var new_col = neighbor.attr('data-col')
    var new_row = neighbor.attr('data-row')
    tile.attr('data-col', new_col)
    tile.attr('data-row', new_row - 1)

    // need to mutate neighbor
    updateTile(neighbor);
  }
}

 function updateTile(tile) {
  var new_tile_value = tile.attr("data-val") * 2;
  tile.attr("data-val", new_tile_value);
  tile.text(new_tile_value);
 }

function moveTile(direction) {
  // needs conditionals to check for occupied grids spaces
  switch(direction) {
    case 38: //up
      //tile.attr("data-row","r0");
      var zero = moveUp(0);
      var one = moveUp(1);
      var two = moveUp(2);
      var three = moveUp(3);
      break;
    case 40: //down
     // tile.attr("data-row","r3");
      var zero = moveDown(0);
      var one = moveDown(1);
      var two = moveDown(2);
      var three = moveDown(3);

      break;
    case 37: //left
      tile.attr("data-col","c0");
      break;
    case 39: //right
      tile.attr("data-col","c3");
      break;
  }
}

  function getColumn(col){
   var column = tile_array[col];
   var no_undef_column = [];
   for(var i = 0; i < column.length; i++) {
     if (column[i] !== undefined) {
       no_undef_column.push(column[i]);
         tile_array[col][i] = undefined;

     }
   }
   return no_undef_column;
 }

 function moveUp(col) {
   var column = getColumn(col);
   for (var i = 0; i < column.length; i++ ) {
      var max = 0
        // if column.length < 1, then there is only one tile
        // if there length is more than 1, then we need to check if tiles are the same value
        // pass column[i] through check to see if it will collide with other tiles
        var row = ('r' + i );
        tile_array[col][i] = column[i];
        column[i].attr('data-row', row)

        if (i !== max && column.length > 1){
          console.log("in the collide conditional");
          var tile = column[i];
          var tile_neighbor = column[i -1];
            tileCollide(tile, tile_neighbor);
          }
     }
  }

  function moveDown(col){
    var column = getColumn(col);
    var max = 3;
      for (var i = column.length - 1; i >= 0; i-- ) {
          var row = ('r' + max );
          tile_array[col][max] = column[i];
          column[i].attr('data-row', row);
          max -= 1;
        }
   }







