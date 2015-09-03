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


// Creates 2 tiles at the start of the game
function initializeGame() {
  createTile();
  createTile();
}

// Random number generated between 0 and 3
function rando_num(){
  return Math.floor(Math.random() * 4);
}

// See if a tile already exists at a particular column and row
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


function tileCollide(tile, neighbor, direction) {
  // tile should be checked against neighbor
  console.log('tile', tile, 'neighbor', neighbor);
  if (tile.attr('data-val') == neighbor.attr('data-val')) {
    //move tile to neighbors spot
    var new_col = neighbor.attr('data-col');
    var new_row = neighbor.attr('data-row');
    tile.attr('data-col', new_col);
    tile.attr('data-row', new_row);
    console.log(tile);
    // take col and row and number and set for tile to be deleted
    var col = +(new_col.slice(1));
    var row = +(new_row.slice(1));

    // remove tile
    junkTile = neighbor;
    $(junkTile).remove();

    // reset tile array so updated tile is in correct spot
    tile_array[col][row] = tile
    // reset tile array so deleted spot is set to undefined
    deleteTile(col, row, direction)
    // update tile
    updateTile(tile);
  }
}

  function deleteTile(col, row, direction){
    if (direction == 'up'){
      tile_array[col][row + 1] = undefined;
    } else if (direction == 'down') {
      tile_array[col][row - 1] = undefined;
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
      moveDirection(moveUp);
      break;
    case 40: //down

      moveDirection(moveDown);
      break;
    case 37: //left

      moveDirection(moveLeft);
      break;
    case 39: //right

      moveDirection(moveRight);
      break;
  }
}

// Loops through to move elements in every column/row
function moveDirection(moveWay) {
  for (var i=0; i < 4; i++) {
    moveWay(i);
  }
}

// Returns row at passed in index (r)
  function getRow(r) {
    var row = [];

    for(var i = 0; i < tile_array.length; i++) {
      if(tile_array[i][r] !== undefined) {
        row.push(tile_array[i][r]);
        tile_array[i][r] = undefined;
      }
    }
    return row;
  }

  function moveLeft(r) {
    var row = getRow(r);
    for (var i = 0; i < row.length; i++ ) {
      var col = ('c' + i );
      tile_array[i][r] = row[i];
      row[i].attr('data-col', col)
      var top = 0

       if (i !== top && row.length > 1){
          var tile = row[i];
          var tile_neighbor = row[i - 1];
          console.log('tile', tile, 'neighbor', tile_neighbor);
          tileCollide(tile, tile_neighbor, 'up');
        }
  }

   function moveRight(r) {
     var row = getRow(r);
     var max = 3;
     for (var i = row.length - 1; i >= 0; i-- ) {
         var col = ('c' + max );
         tile_array[max][r] = row[i];
         row[i].attr('data-col', col)
         max -=1;
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
        var row = ('r' + [i] );
        tile_array[col][i] = column[i];
        column[i].attr('data-row', row)
        var top = 0

      if (i !== top && column.length > 1){
        var tile = column[i];
        var tile_neighbor = column[i - 1];
        tileCollide(tile, tile_neighbor, 'up');
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


        if (max !== 2 && column.length > 1){
          console.log('inside if loop');
          var tile = column[i];
          var tile_neighbor = column[i + 1];
          tileCollide(tile, tile_neighbor, 'down');
        }
      }
  }





