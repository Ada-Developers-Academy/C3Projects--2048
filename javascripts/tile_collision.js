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
  function adjacentSpace(direction, rowsIndex, columnsIndex){
    var space = "";

    if (direction === "up") {
      var rowUp = rows[rowsIndex - 1]; if (rowsIndex > 0);
      space = [rowUp, sameColumn].join();

    } else if (direction === "down") {
      var rowDown = rows[rowsIndex + 1]; if (rowsIndex < 3);
      space = [rowDown, sameColumn].join();

    } else if (direction === "left") {
      var colLeft = columns[columnsIndex - 1]; if (columnsIndex > 0);
      space = [sameRow, colLeft].join();

    } else if (direction === "right") {
      var colRight = columns[columnsIndex + 1]; if (columnsIndex < 3);
      space = [sameRow, colRight].join();
    }

    var emptyArray = [];
    for (var i = 0; i < orderedTiles.length; i++) {
      emptyArray.push(orderedTiles[i].join());
    }

    return emptyArray.indexOf(space);
  }

  // iterates through every tile to determine it's action
  // on this single keystroke
  for (var i = 0; i < orderedTiles.length; i++) {
    var tile = orderedTiles[i];
    var rows = ["r0","r1", "r2", "r3"];
    var columns = ["c0","c1", "c2", "c3"];
    var rowsIndex = 0;
    var columnsIndex = 0;

    // prepares variables to check the adjacent tile
    if(direction === "up" || direction === "down") {
      var tileRow = tile[0];
      rowsIndex = rows.indexOf(tileRow); // index of the row that the tile is in
      var sameColumn = tile[1];

    } else if(direction ==="left" || direction === "right") {
      var tileColumn = tile[1];
      columnsIndex = columns.indexOf(tileColumn);
      var sameRow = tile[0];
    }

    // returns adjacent tile's index in orderedTiles
    // or -1 if the adjacent space isn't occupied
    var adjacentTile = adjacentSpace(direction, rowsIndex, columnsIndex);
    // NOTE: Right now it's always returning -1, but we think that might be
    // because we haven't implemented all the logic

    if (adjacentTile > -1) {
      // the order is super important!
      // first should be the tile we're on in the iteration
      // second should be the tile adjacent to it
      merge(tile, adjacentTile, direction, orderedTiles);
    } else {
      moveOne(tile, direction);
    }
  }
}

function grabTile(coordinates) {
  var row = coordinates[0];
  var col = coordinates[1];
  var tile = $("div[data-row|='" + row + "'][data-col|='" + col + "']");
  return tile;
}


// determines if tiles can merge or not
function merge(space1, spaceIndex, direction, orderedTiles) {
  var space2 = orderedTiles[spaceIndex];

  var tile1 = grabTile(space1);
  var tile2 = grabTile(space2);
  var tile1Value = parseInt($(tile1).text());
  var tile2Value = parseInt($(tile2).text());

  if (tile1Value === tile2Value) {
    // moves tile1 under tile2
    if (direction === "up" || direction === "down"){ tile1.attr("data-row", space2[0]); }
    if (direction === "left" || direction === "right") { tile1.attr("data-col", space2[1]); }

    // tile2 gets it's value updated
    tile2.attr("data-val", tile1Value * 2);
    tile2.text(tile1Value * 2);

    // tile1 gets deleted
    tile1.attr("id", "delete");
    $("#delete").remove();

    // update score
  }
}

function moveOne(coordinates, direction){
  var rows = ["r0", "r1", "r2", "r3"];
  var cols = ["c0", "c1", "c2", "c3"];
  var rowIndex = rows.indexOf(coordinates[0]);
  var colIndex = cols.indexOf(coordinates[1]);
  var tile = grabTile(coordinates);
  // grabs all the tiles in the same row/column behind the tile in question
  var tilesBehind = function(){
    var tiles = [];
    var tile = "";
    var i = "";

    if (direction === "up" || direction === "down") {
      if(direction === "up") {
        for(i = rowIndex; i < rows.length; i++) {
          tile = $("div[data-col|='" + cols[colIndex] + "'][data-row|='" + rows[i] + "']");
          tiles.push(tile);
        }
      } else if (direction === "down") {
        for(i = rowIndex; i > -1; i--) {
          tile = $("div[data-col|='" + cols[colIndex] + "'][data-row|='" + rows[i] + "']");
          tiles.push(tile);
        }
      }
    } else if (direction === "left" || direction === "right") {
      if(direction === "left") {
        for(i = colIndex; i < cols.length; i++) {
          tile = $("div[data-col|='" + cols[i] + "'][data-row|='" + rows[rowIndex] + "']");
          tiles.push(tile);
        }
      } else if (direction === "right") {
        for(i = colIndex; i > -1; i--) {
          tile = $("div[data-col|='" + cols[i] + "'][data-row|='" + rows[rowIndex] + "']");
          tiles.push(tile);
        }
      }
    }

    return tiles;
  }();

  switch(direction) {
    // change the tile's coordinates
    // guard against tiles on the top edge
    case "up":
      if (rows[rowIndex] != "r0") { tile.attr("data-row", rows[rowIndex - 1]); }
      break;
    case "down":
      if (rows[rowIndex] != "r3") { tile.attr("data-row", rows[rowIndex + 1]); }
      break;
    case "left":
      if (cols[colIndex] != "c0") { tile.attr("data-col", cols[colIndex - 1]); }
      break;
    case "right":
      if (cols[colIndex] != "c3") { tile.attr("data-col", cols[colIndex + 1]); }
      break;
  }
}
