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
    var new_col = neighbor.attr('data-col');
    var new_row = neighbor.attr('data-row');
    tile.attr('data-col', new_col);
    tile.attr('data-row', new_row);

    var col = +(new_col.slice(1));
    var row = +(new_row.slice(1));
    console.log(col, row, tile_array);
    junkTile = tile_array[col][row + 1];
    console.log(tile);
    $(junkTile).remove();
    tile_array[col][row] = undefined;


    // need to mutate neighbor
    updateTile(tile);
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

      var zero = moveDown(0);
      var one = moveDown(1);
      var two = moveDown(2);
      var three = moveDown(3);
      break;
    case 37: //left
    var zero = moveLeft(0);
    var one = moveLeft(1);
    var two = moveLeft(2);
    var three = moveLeft(3);
    // console.log(zero);
    // console.log(one);
    // console.log(two);
    // console.log(three);
      // tile.attr("data-col","c0");
      break;
    case 39: //right
    var zero = moveRight(0);
    var one = moveRight(1);
    var two = moveRight(2);
    var three = moveRight(3);
      // tile.attr("data-col","c3");
      break;
  }
}

  function getRow(r) {
    var row = [];

    for(var i = 0; i < tile_array.length; i++) {
      if(tile_array[i][r] !== undefined) {
        row.push(tile_array[i][r]);
        tile_array[i][r] = undefined;
      }
    }
    console.log(row);
    return row;
  }

  function moveLeft(r) {
    var row = getRow(r);
    for (var i = 0; i < row.length; i++ ) {

        var col = ('c' + i );
        tile_array[i][r] = row[i];
        row[i].attr('data-col', col)
        console.log(r, i);
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
          console.log("in the collide conditional");
          var tile = column[i];

          var tile_neighbor = column[i - 1];

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







