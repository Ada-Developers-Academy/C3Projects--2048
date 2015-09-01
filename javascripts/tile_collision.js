// all the tiles and their locations
function tileInventory() {
  var tiles = $('.tile');
  var takenSpaces = [];
  for (var i = 0; i < tiles.length; i++) {
    var row = tiles[i].getAttribute("data-row");
    var col = tiles[i].getAttribute("data-col");
    takenSpaces.push([row, col]);
  }

  return takenSpaces;
}

// returns a fat array of all the tiles in
// opposite order of the keystroke
function orderTiles(keystroke) {
  // collect all the tile locations
  var tiles = tileInventory();

  // the reaction of tiles colliding happens in the order opposite
  // of the keystroke (e.g. up key evalautes the bottom row first)
  var direction = function() {
    if (keystroke === 38) { return ["r3", "r2", "r1", "r0"]; } // up
    if (keystroke === 40) { return ["r0", "r1", "r2", "r3"]; } // down
    if (keystroke === 37) { return ["c3", "c2", "c1", "c0"]; } // left
    if (keystroke === 39) { return ["c0", "c1", "c2", "c3"]; } // right
  };

  // determines which index to use to organize the tiles
  // tile = `[row, column]`
  var index = function() {
    if (start.splice(0, 1) === "r") {
      return 0; // filters by row
    } else if (start.splice(0, 1) === "c") {
      return 1; // filters by columns
    }
  };

  // select the tiles occupying the selected row/column
  function filterByLocation(pointer) {
    var section = tiles.filter(function(){
      if (tile[index] === pointer) { return tile; }
    });

    return section;
  }

  // reorganize the collected tile locations
  // into the order of the direction array
  var organizedTiles = function(){
    var result = [];
    for(var i = 0; i < direction.length; i++) {
      result.concat(filterByLocation(direction[i]));
    }

    return result;
  };

  return organizedTiles;
}

// move through the tiles one by one
// figure out if they merge, move, or stay put
function tileCollision(keystroke) {
  var orderedTiles = orderTiles(keystroke);

  
}
