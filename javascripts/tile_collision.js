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
  }(); // these parens executes the function and saves the result to the variable

  // determines which index to use to organize the tiles
  // tile = `[row, column]`
  var index = function() {
    if (direction[0].slice(0, 1) === "r") {
      return 0; // filters by row
    } else if (direction[0].slice(0, 1) === "c") {
      return 1; // filters by columns
    }
  }();

  // select the tiles occupying the selected row/column
  function filterByLocation(pointer) {
    var section = tiles.filter(function(tile){
      if (tile[index] === pointer) { return tile; }
    });

    return section;
  }

  // reorganize the collected tile locations
  // into the order of the direction array
  var organizedTiles = function(){
    var result = [];
    for(var i = 0; i < direction.length; i++) {
      result = result.concat(filterByLocation(direction[i]));
    }
    return result;
  };
  return organizedTiles();
}

// move through the tiles one by one
// figure out if they merge, move, or stay put
function tileCollision(keystroke) {
  var orderedTiles = orderTiles(keystroke);

//  console.log(orderedTiles);
  var direction = function() {
    switch(keystroke) {
    case 38:
      return "up";
    case 40:
      return "down";
    case 37:
      return "left";
    case 39:
      return "right";
    }
  }();

  // returns index of the adjacent tile (in regards to orderedTiles)
  // or -1 if the tile does not exist
  function adjacentSpace(direction){
    if (direction === "up") {
      var rowUp = rows[rowsIndex - 1]; if (rowsIndex > 0);
      return $.inArray([rowUp, sameColumn], orderedTiles);

    } else if (direction === "down") {
      var rowDown = rows[rowsIndex + 1]; if (rowsIndex < 3);
      return $.inArray([rowDown, sameColumn], orderedTiles);

    } else if (direction === "left") {
      var colLeft = columns[columnsIndex - 1]; if (columnsIndex > 0);
      return $.inArray([colLeft, sameRow], orderedTiles);

    } else if (direction === "right") {
      var colRight = columns[columnsIndex + 1]; if (columnsIndex < 3);
      return $.inArray([colRight, sameRow], orderedTiles);
    }
  }
  console.log(adjacentSpace("up"));
  console.log(adjacentSpace("down"));
  console.log(adjacentSpace("left"));
  console.log(adjacentSpace("right");

  // iterates through every tile to determine it's action
  // on this single keystroke
  for (var i = 0; i < orderedTiles; i++) {
    var tile = orderedTiles[i];
    var rows = ["r0","r1", "r2", "r3"];
    var columns = ["c0","c1", "c2", "c3"];

    // prepares variables to check the adjacent tile
    if(direction === "up" || direction === "down") {
      var tileRow = tile[0];
      var rowsIndex = rows.indexOf(tileRow); // index of the row that the tile is in
      var sameColumn = tile[1];

    } else if(direction ==="left" || direction === "right") {
      var tileColumn = tile[1];
      var columnsIndex = columns.indexOf(tileColumn);
      var sameRow = tile[0];
    }

    // returns adjacent tile's index
    // or -1 if the adjacent space isn't occupied
    var adjacentTile = adjacentSpace(direction);

    if (adjacentTile > -1) {
      // this order is super important!
      // first should be the tile we're on in the iteration
      // second should be the tile adjacent to it
      merge(tile, orderedTiles[adjacentTile]);
    } else {
      moveOne();
    }
  }
}

// determines if tiles can merge or not
function merge(space1, space2) {
  var tile1 = $("div[data-row|='" + space1[0] + "'][data-col|='" + space1[1] + "']");
  var tile2 = $("div[data-row|='" + space2[0] + "'][data-col|='" + space2[1] + "']");
  var tile1Value = tile1.val();
  var tile2Value = tile2.val();

  if (tile1Value === tile2Value) {
    // tile closer to the edge gets it's value updated
    // tiler farther from the edge gets deleted? - brownie pts
    // update score
  } else {
    // the tile does not move at all
  }
}
