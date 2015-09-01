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
    if (filled_space[i][0] == column && filled_space[i][1] == row) {
      column = rando_num();
      row = rando_num();
      checkLocation(column, row);
    }
  }
  return [column, row];
}

function createTile() {

  // Check for empty spaces before creating

  if (filled_space.length < 16) {
    var new_column = rando_num();
    var new_row = rando_num();

    var result = checkLocation(new_column, new_row);

    var column = result[0];
    var row = result[1];

    // Create new div element with tile class, location attributes, and value attribute
    var newTile = $( '<div= class="tile">2</div>');
    newTile.attr("data-row", 'r' + row);
    newTile.attr("data-col", 'c' + column);
    newTile.attr("data-val", "2");
    $('#gameboard').append(newTile);

    filled_space.push([column, row]);
  } else {
    console.log("spaces full");
  }

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
//   function sortToMove() {
//       var zero_array = [];
//       var one_array = [];
//       var two_array = [];
//       var three_array = [];
//     for(var i=0; i < filled_space.length; i++) {
//       if (filled_space[i][0] == 0) {
//         zero_array.push([filled_space[i]]);
//       } else if (filled_space[i][0] == 1) {
//           one_array.push([filled_space[i]]);
//       } else if (filled_space[i][0] == 2) {
//           two_array.push([filled_space[i]]);
//       } else if (filled_space[i][0] == 3) {
//           three_array.push([filled_space[i]]);
//       } else {
//         console.log("you broke it");
//       }
//     }
//     zero_array.sort();
//     one_array.sort();
//     two_array.sort();
//     three_array.sort();
//
//
//
//   }
// }
//
// var tile_num = zero_array.length;
// zero_array = zero_result.slice(0, tile_num);
//
// var zero_result =  [[0,0][0,1][0,2][0,3]];
// var one_result =   [[1,0][1,1][1,2][1,3]];
// var two_result =   [[2,0][2,1][2,2][2,3]];
// var three_result = [[3,0][3,1][3,2][3,3]];

// var filled_space = [[0, 1], [1, 3], [2, 3], [1, 1]];
    // console.log(zero_array);
    // console.log(one_array);
    // console.log(two_array);
    // console.log(three_array);
