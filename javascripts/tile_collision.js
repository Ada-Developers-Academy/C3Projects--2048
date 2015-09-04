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
  function filterByLocation(pointer) { // THREE filterByLocation(r1);

    var section = tiles.filter(function(tile){ // FOUR r0,c0,r1,c1.filter for only r1,c1
      if (tile[index] === pointer) { return tile; } // FIVE if r1 === r1, return r1, c1
    });

    return section; // SIX return r1c1
  }

  // reorganize the collected tile locations
  // into the order of the direction array
  var organizedTiles = function(){
    var result = [];
    for(var i = 0; i < direction.length; i++) { // ["r3", "r2", "r1", "r0"] } ONE
      result = result.concat(filterByLocation(direction[i])); // same as above
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

    switch(direction) {
      case "up":
        var rowUp = rows[rowsIndex - 1]; if (rowsIndex > 0);
        space = [rowUp, sameColumn].join();
        break;

      case "down":
        var rowDown = rows[rowsIndex + 1]; if (rowsIndex < 3);
        space = [rowDown, sameColumn].join();
        break;

      case "left":
        var colLeft = columns[columnsIndex - 1]; if (columnsIndex > 0);
        space = [sameRow, colLeft].join();
        break;

      case "right":
        var colRight = columns[columnsIndex + 1]; if (columnsIndex < 3);
        space = [sameRow, colRight].join();
        break;
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
  // maybe this is bad 'cause orderedTiles hasn't been updated?
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

  }
}

function solveMovement(rowNumber, columnNumber, direction) { // (c1, "up")
  var tilesInColumn = $("div[data-col|=c" + columnNumber + "]"); // all tiles in c1
  var tilesInRow = $("div[data-row|=r" + rowNumber + "]"); // all tiles in r1

  var realOrderedTiles = "";
  if (columnNumber !== null) {
    realOrderedTiles = orderedTilesInColumn(tilesInColumn); //  [0, tile, 0, tile] <=> [r0, r1, r2, r3]
  } else if (rowNumber !== null) {
    realOrderedTiles = orderedTilesInRow(tilesInRow);
  }

  realOrderedTiles = realOrderedTiles.filter(eliminateZeros); // [tile, tile]

  while (realOrderedTiles.length < 4){
    if (direction === "up" || direction === "left")   { realOrderedTiles.push(0); }
    if (direction === "down" || direction === "right") { realOrderedTiles.unshift(0); }
    console.log(realOrderedTiles);
  }

  switch (direction) {
    case "up":
      for(var i = 0; i < realOrderedTiles.length; i++) {
        var upRow = 'r' + i;
        if(realOrderedTiles[i] !== 0) {
          realOrderedTiles[i].setAttribute("data-row", upRow);
        }
      }
      break;

    case "down":
      for(var j = realOrderedTiles.length - 1; j > -1; j--) {
        var downRow = 'r' + j;
        if(realOrderedTiles[j] !== 0) {
          realOrderedTiles[j].setAttribute("data-row", downRow);
        }
      }
      break;

    case "left":
      for(var l = realOrderedTiles.length - 1; l > -1; l--) {
        var leftCol = 'c' + l;
        if(realOrderedTiles[l] !== 0) {
          realOrderedTiles[l].setAttribute("data-col", leftCol);
        }
      }
      break;

    case "right":
      for(var k = 0; k < realOrderedTiles.length; k++) {
        var rightCol = 'c' + k;
        if(realOrderedTiles[k] !== 0) {
          realOrderedTiles[k].setAttribute("data-col", rightCol);
        }
      }
      break;
  }
}

function orderedTilesInColumn(tilesInColumn) {
  var initialColumn = [0, 0, 0, 0];

  for (var i = 0; i < tilesInColumn.length; i++) {
    var tilep = tilesInColumn[i];
    var row = tilep.getAttribute("data-row");
    var rows = ["r0", "r1", "r2", "r3"];
    var rowIndex = rows.indexOf(row); // 1 is r1
    initialColumn[rowIndex] = tilep; // => array[1] = tile
  }
  return initialColumn;
}

function orderedTilesInRow(tilesInRow) {
  var initialRow = [0, 0, 0, 0];

  for (var i = 0; i < tilesInRow.length; i++) {
    var tilep = tilesInRow[i];
    var col = tilep.getAttribute("data-col");
    var cols = ["c0", "c1", "c2", "c3"];
    var colIndex = cols.indexOf(col); // 1 is r1
    initialRow[colIndex] = tilep; // => array[1] = tile
  }
  return initialRow;
}

function eliminateZeros(tilesInColumn) {
  return tilesInColumn !== 0;
}

function moveOne(coordinates, direction){ // change it so that moveOne accepts tilesInColumn not coordinates
    var rows = ["r0", "r1", "r2", "r3"];
    var cols = ["c0", "c1", "c2", "c3"];
    var rowIndex = rows.indexOf(coordinates[0]); // 1 is r1
    var colIndex = cols.indexOf(coordinates[1]); // 1 is c1
    var tile = grabTile(coordinates); // r1c1
    var cellIndex = [0, 1, 2, 3];

  switch(direction) {
    // change the tile's coordinates
    // guard against tiles on the edge
    case "up":
      for (var i = 0; i < cellIndex.length; i++ ) {
        solveMovement(null, i, "up");
      }
      break;

    case "down":
     for (var j = 0; j < cellIndex.length; j++ ) {
       solveMovement(null, j, "down");
      }
      break;

    case "left":
      for (var k = 0; k < cellIndex.length; k++ ) {
        solveMovement(k, null, "left");
      }
      break;
    case "right":
      for (var l = 0; l < cellIndex.length; l++ ) {
        solveMovement(l, null, "right");
      }
      break;
  }
  // var tilesBehind = function(){
  //   var tiles = [];
  //   var tile = "";
  //   var i = "";
  //
  //   switch(direction) {
  //     case "up":
  //       for(i = rowIndex; i < rows.length; i++) {
  //         tile = $("div[data-col|='" + cols[colIndex] + "'][data-row|='" + rows[i] + "']");
  //         tiles.push(tile);
  //       }
  //       return tiles;
  //
  //     case "down":
  //       for(i = rowIndex; i > -1; i--) {
  //         tile = $("div[data-col|='" + cols[colIndex] + "'][data-row|='" + rows[i] + "']");
  //         tiles.push(tile);
  //       }
  //       return tiles;
  //
  //     case "left":
  //       for(i = colIndex; i < cols.length; i++) {
  //         tile = $("div[data-col|='" + cols[i] + "'][data-row|='" + rows[rowIndex] + "']");
  //         tiles.push(tile);
  //       }
  //       return tiles;
  //
  //     case "right":
  //       for(i = colIndex; i > -1; i--) {
  //         tile = $("div[data-col|='" + cols[i] + "'][data-row|='" + rows[rowIndex] + "']");
  //         tiles.push(tile);
  //       }
  //       return tiles;
  //   }
  // }();
}
