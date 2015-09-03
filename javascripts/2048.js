$(document).ready(function() {
  // introduces 2 tiles only when the game is first started
  var tiles = $("#gameboard").children(".tile");
  var inPlay = (tiles.length > 0) ? true : false;
  if (inPlay === false) { startGame(); }

  // heart of the game
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, event.which);
      event.preventDefault();
    }
  });
});

function startGame() {
  function startTiles() {
    var rows = ["r0", "r1", "r2", "r3"];
    var cols = ["c0", "c1", "c2", "c3"];

    // randomize the row & column value
    var rowIndex = Math.floor(Math.random() * rows.length);
    var colIndex = Math.floor(Math.random() * cols.length);

    // TODO: refactor with newTile(); this is copy-pasta'd code
    var tile = $("<div class='tile'></div>");
    tile.attr({"data-row":rows[rowIndex], "data-col":cols[colIndex]});
    tile.attr("data-val", 2); // brownie pts = randomly mix in 4s
    tile.text("2");
    $("#gameboard").append(tile);
  }

  startTiles();
  startTiles();
  startTiles();
  startTiles();
  startTiles();
}

// tiles will be anywhere on the board
// refactor for being in the middle of tiles instead of on the edge?
function newTile() {
  // TODO refactor against tileInventory
  var BOARD_SPACES = [['r0', 'c0'],['r0', 'c1'], ['r0', 'c2'],['r0', 'c3'],
                      ['r1', 'c0'],['r1', 'c1'], ['r1', 'c2'],['r1', 'c3'],
                      ['r2', 'c0'],['r2', 'c1'], ['r2', 'c2'],['r2', 'c3'],
                      ['r3', 'c0'],['r3', 'c1'], ['r3', 'c2'],['r3', 'c3']];

  // collect the occupied tile spaces
  var tiles = $('.tile');
  var takenSpaces = [];
  for (var i = 0; i < tiles.length; i++) {
    var row = tiles[i].getAttribute("data-row");
    var col = tiles[i].getAttribute("data-col");
    takenSpaces.push([row, col]);
  }

  // determine the unoccupied spaces
  var openSpaces = BOARD_SPACES.map( function(space) {
    if ($.inArray(space, takenSpaces) < 0) { return space; }
  });
  // remove 'undefined's
  function noUndefined(value) {
    return value != 'undefined';
  }
  openSpaces = openSpaces.filter(noUndefined);

  // randomly select an available space
  var spaceIndex = Math.floor(Math.random() * openSpaces.length);
  var cell = openSpaces[spaceIndex];

  // create html tile
  var tile = $("<div class='tile'></div>");
  tile.attr({"data-row":cell[0], "data-col":cell[1]});
  tile.attr("data-val", 2); // brownie pts = randomly mix in 4s
  tile.text("2");

  $("#gameboard").append(tile);
}

function moveTile(tile, direction) {
  // increments tile value:
    // var new_tile_value = tile.attr("data-val") * 2;
    // tile.attr("data-val", new_tile_value);
    // tile.text(new_tile_value);

  tileCollision(direction);
  //
  // switch(direction) {
  //   case 38: // up
  //     tile.attr("data-row","r0");
  //     break;
  //   case 40: // down
  //     tile.attr("data-row","r3");
  //     break;
  //   case 37: // left
  //     tile.attr("data-col","c0");
  //     break;
  //   case 39: // right
  //     tile.attr("data-col","c3");
  //     break;
  // }

  // newTile();
}
