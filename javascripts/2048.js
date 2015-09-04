$(document).ready(function() {
  console.log('ready!');
  var openCells = [["r1", "c2"], ["r1", "c0"],
                   ["r2", "c1"], ["r2", "c2"], ["r2", "c3"], ["r2", "c0"],
                   ["r3", "c1"], ["r3", "c2"], ["r3", "c3"], ["r3", "c0"],
                   ["r0", "c1"], ["r0", "c2"], ["r0", "c3"], ["r0", "c0"]];

  var usedCells = [["r1", "c1"], ["r1", "c3"]];

  var tile = document.createElement("div");
  $("#gameboard").append(tile);
  $(tile).addClass("tile");
  $(tile).attr("data-row", "r1");
  $(tile).attr("data-col", "c1");
  $(tile).attr("data-val", 2);
  $(tile).text(2);

  var tile = document.createElement("div");
  $("#gameboard").append(tile);
  $(tile).addClass("tile");
  $(tile).attr("data-row", "r1");
  $(tile).attr("data-col", "c3");
  $(tile).attr("data-val", 2);
  $(tile).text(2);
  console.log("beginning array")
  console.log(usedCells);

  emptyCell(openCells, usedCells, ["r1", "c3"])
  console.log(usedCells);

  // newTile(openCells, usedCells);
  // newTile(openCells, usedCells);
  // console.log("open: ");
  // console.log(openCells);
  // console.log("used: ");
  // console.log(usedCells);

  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      playGame(tile, openCells, usedCells, event.which);
        // console.log("open: ");
        // console.log(openCells);
        // console.log("used: ");
        // console.log(usedCells);
      event.preventDefault();
    }
  })
})

function playGame(tile, openCells, usedCells, direction) {
    moveTile(tile, openCells, usedCells, direction);
    if (usedCells.length < 16) {
      newTile(openCells, usedCells);
    } else {
      alert("You have lost");
    }
}

function randomNum(array) {
  var index = Math.floor(Math.random()*(array.length));
  return array[index];
}

function newTile(openCells, usedCells) {
  var initNum = randomNum([2, 4]);
  var cellSpace = randomNum(openCells);
  var tile = document.createElement("div");
  $("#gameboard").append(tile);
  $(tile).addClass("tile");
  $(tile).attr("data-row", cellSpace[0]);
  $(tile).attr("data-col", cellSpace[1]);
  $(tile).attr("data-val", initNum);
  $(tile).text(initNum);
  occupyCell(openCells, usedCells, cellSpace);
}

function occupyCell(openCells, usedCells, cellSpace) {
  var index = findIndex(openCells, cellSpace);
  openCells.splice(index, 1);
  var cellExists = findIndex(usedCells, cellSpace);
  if (cellExists == undefined) {
    usedCells.push(cellSpace);
  }
}

function findIndex(array, element) {
  for (k = 0; k < array.length; k++) {
    if (array[k][0] == element[0] && array[k][1] == element[1]) {
      return k;
    }
  }
}

function emptyCell(openCells, usedCells, cellSpace) {
  console.log("is this cell removed form usedCells?");
  console.log("cellSpace");
  console.log(cellSpace);
  var index = findIndex(usedCells, cellSpace);
  usedCells.splice(index, 1);
  console.log(usedCells);
  openCells.push(cellSpace);
}


// MERGING TILES --------------------------------------------------------------------------
function merge(tile1, tile2, direction, openCells, usedCells) {
  if (direction == "up" || direction == 38) {
    if (tile1[0][1] > tile2[0][1]) {
      var temp = tile1
      tile1 = tile2;
      tile2 = temp;
    }
    var findTile1 = $("div[data-row=" + tile1[0] + "][data-col=" + tile1[1] + "]");
    var findTile2 = $("div[data-row=" + tile2[0] + "][data-col=" + tile2[1] + "]");
    var value = $(findTile1).text();
    if (value == $(findTile2).text()) {
      $(findTile1).text(value * 2);
      $(findTile1).attr("data-val", value * 2)
      deleteTile(findTile2, openCells, usedCells);
      return tile2;
    }
  } else if (direction == "down" || direction == 40) {
    if (tile1[0][1] < tile2[0][1]) {
      var temp = tile1;
      tile1 = tile2;
      tile1 = temp;
    }
    var findTile1 = $("div[data-row=" + tile1[0] + "][data-col=" + tile1[1] + "]");
    var findTile2 = $("div[data-row=" + tile2[0] + "][data-col=" + tile2[1] + "]");
    var value = $(findTile1).text();
    if (value == $(findTile2).text()) {
      $(findTile1).text(value * 2);
      $(findTile1).attr("data-value", value * 2)
      deleteTile(findTile2, openCells, usedCells);
    }
  } else if (direction == "left" || direction == 37) {
    if (tile1[1][1] > tile2[1][1]) {
      var temp = tile1;
      tile1 = tile2;
      tile1 = temp;
    }
    var findTile1 = $("div[data-row=" + tile1[0] + "][data-col=" + tile1[1] + "]");
    var findTile2 = $("div[data-row=" + tile2[0] + "][data-col=" + tile2[1] + "]");
    var value = $(findTile1).text();
    if (value == $(findTile2).text()) {
      console.log("now were merging for sure");
      $(findTile1).text(value * 2);
      $(findTile1).attr("data-value", value * 2);
      deleteTile(findTile2, openCells, usedCells);
    }
  } else if (direction == "right" || direction == 39) {
    if (tile1[1][1] < tile2[1][1]) {
      var temp = tile1;
      tile1 = tile2;
      tile1 = temp;
    }
    var findTile1 = $("div[data-row=" + tile1[0] + "][data-col=" + tile1[1] + "]");
    var findTile2 = $("div[data-row=" + tile2[0] + "][data-col=" + tile2[1] + "]");
    var value = $(findTile1).text();
    if (value == $(findTile2).text()) {
      $(findTile1).text(value * 2);
      $(findTile1).attr("data-value", value * 2);
      deleteTile(findTile2, openCells, usedCells);
    }

  }
}

function deleteTile(tile, openCells, usedCells) {
  var row = $(tile).attr("data-row");
  var col = $(tile).attr("data-col");
  $(tile).remove();
  console.log("deleting this div from board");
  console.log(tile)
  emptyCell(openCells, usedCells, [row, col]);
}


// MOVING TILES --------------------------------------------------------------------
function moveTile(tile, openCells, usedCells, direction) {

  switch(direction) {
      case 38: //up or down
        return verticalMove(tile, openCells, usedCells, direction);
        break;
      case 40: //down
        return verticalMove(tile, openCells, usedCells, direction);
        break;
      case 37: //left
        return horizontalMove(tile, openCells, usedCells, direction);
        break;
      case 39: //right
        return horizontalMove(tile, openCells, usedCells, direction);
        break;
  }
}

function horizontalMove(tile, openCells, usedCells, direction) {
  for ( i = 0; i < 4; i++) {
    var openRow = openCells.filter(function(array) { return array[0] == "r" + i });
    var usedRow = usedCells.filter(function(array) { return array[0] == "r" + i });
    if (usedRow.length >= 4) {
      //loop through all tiles in row i
      for (l = 0; l < usedRow.length; l++) {
        //if there is a next tile after tile l see if you can merge.
        if (usedRow[l+1] != undefined) {
          merge(usedRow[l], usedRow[l+1], direction, openCells, usedCells);
        }
      }
    }
    if (openRow.length >= 4) {
      continue;
    } else {
      if (direction == 37) { //left
        var openArr = sortArrayByColumn(openRow);
        console.log("1st moving left");
        var usedArr = sortArrayByColumn(usedRow);
        for (j = 0; j < usedArr.length; j++) {
          if (openArr[0][1] < usedArr[j][1]) {
            var row = "r" + i;
            oneTile = $("div[data-row=" + row + "][data-col=" + usedArr[j][1] + "]");
            $(oneTile).attr("data-col", openArr[0][1]);
            emptyCell(openCells, usedCells, usedArr[j]);
            emptyCell(openArr, usedArr, usedArr[j]);
            // console.log("usedArr before:");
            // console.log(usedArr);
            occupyCell(openCells, usedCells, [row, openArr[0][1]]);
            occupyCell(openArr, usedArr, [openArr[0][0], openArr[0][1]]);
            // console.log("usedArr after:");
            // console.log(usedArr);
          }
          usedArr = sortArrayByColumn(usedArr);
          console.log("2nd moving left");
          openArr = sortArrayByColumn(openArr);
          if (usedRow.length > 1 && usedArr[j+1] != undefined) {
            console.log("chekcing to see if we can merge!!!");
            merge(usedArr[j], usedArr[j+1], "left", openCells, usedCells);
          }
          usedArr = sortArrayByColumn(usedArr);
          console.log("3rd moving left");
          openArr = sortArrayByColumn(openArr);
        }
      } else if (direction == 39) { //right
        var openArr = sortArrayByColumn(openRow).reverse();
        var usedArr = sortArrayByColumn(usedRow).reverse();
        for (j = 0; j < usedArr.length; j++) {
          if (openArr[0][1] > usedArr[j][1]) {
            var row = "r" + i;
            oneTile = $("div[data-row=" + row + "][data-col=" + usedArr[j][1] + "]");
            $(oneTile).attr("data-col", openArr[0][1]);
            emptyCell(openCells, usedCells, usedArr[j]);
            emptyCell(openArr, usedArr, usedArr[j]);
            occupyCell(openCells, usedCells, [row, openArr[0][1]]);
            occupyCell(openArr, usedArr, [openArr[0][0], openArr[0][1]]);
          }
          usedArr = sortArrayByColumn(usedArr).reverse();
          openArr = sortArrayByColumn(openArr).reverse();
          if (usedRow.length > 1 && usedArr[j+1] != undefined) {
            merge(usedArr[j], usedArr[j+1], "left", openCells, usedCells);
          }
          usedArr = sortArrayByColumn(usedArr).reverse();
          openArr = sortArrayByColumn(openArr).reverse();
        }
      }
    }
  }
}


function verticalMove(tile, openCells, usedCells, direction) {
  for (i = 0; i < 4; i++) {
    // filters openCells for column for each loop
    var openCol = openCells.filter(function(array) { return array[1] == "c" + i });
    // filters usedCells for column for each loop
    var usedCol = usedCells.filter(function(array) { return array[1] == "c" + i});
    // if usedCol == 4 there's nothing to move, but need to check if some tiles can be merged.
    if (usedCol.length >= 4) {
      //loop through all tiles in column i
      for (l = 0; l < usedCol.length; l++) {
        //if there is a next tile after tile l see if you can merge.
        if (usedCol[l+1] != undefined) {
          merge(usedCol[l], usedCol[l+1], direction, openCells, usedCells);
        }
      }
    }
    // if openCells == 4, there is nothing to move
    else if (openCol.length >= 4) {
      continue;
    } else {
      if (direction == 38) { //up
        // gives array with row # and column coordinates sorted by row #
        var openArr = sortArrayByRow(openCol);
        var usedArr = sortArrayByRow(usedCol);
        for (j = 0; j < usedArr.length; j++) {
        //if the first position of openArr is above the tile (usedArry[j]), then move the tile.
          if (openArr[0][0] < usedArr[j][0]) {
            var col = "c" + i;
            //finding the tile from the usedArr[j] coordinants.
            oneTile = $("div[data-row=" + usedArr[j][0] + "][data-col=" + col + "]");
            //Change the attributes of that tile, so it will move.
            $(oneTile).attr("data-row", openArr[0][0]);
            //move cell coordinates so the old tile position is now open
            emptyCell(openCells, usedCells, usedArr[j]);
            emptyCell(openArr, usedArr, usedArr[j]);
            //move cell coordinates so the new tile position is now used
            occupyCell(openCells, usedCells, [openArr[0][0], openArr[0][1]]);
            occupyCell(openArr, usedArr, [openArr[0][0], openArr[0][1]]);
          }
          openArr = sortArrayByRow(openArr);
          usedArr = sortArrayByRow(usedArr);
          if (usedCol.length > 1 && usedArr[j+1] != undefined) {
            // merge() returns the cell that will be deleted
            var cellToEmpty = merge(usedArr[j], usedArr[j+1], "up", openCells, usedCells);
            //this checks if cells were merged. If cells were merged, then merge() returns the cell to be moved into emptyCells
            if (cellToEmpty != undefined) {
              //this empties the cell in the local variables (openArr, usedArr)
              emptyCell(openArr, usedArr, cellToEmpty);
            }
          }
          openArr = sortArrayByRow(openArr);
          usedArr = sortArrayByRow(usedArr);
        }
      } else if (direction == 40) { //down
        // gives array with row # and column coordinates sorted by row #
        var openArr = sortArrayByRow(openCol).reverse();
        var usedArr = sortArrayByRow(usedCol).reverse();
        for (j = 0; j < usedArr.length; j++) {
          if (openArr[0][0] > usedArr[j][0]) {
            var col = "c" + i;
            oneTile = $("div[data-row=" + usedArr[j][0] + "][data-col=" + col + "]");
            $(oneTile).attr("data-row", openArr[0][0]);
            // move cell from occupied to empty in local(usedArr & openArr) and "global" (usedCells & openCells)
            emptyCell(openCells, usedCells, usedArr[j]);
            emptyCell(openArr, usedArr, usedArr[j]);
            // move cell from empty to occupied in local(usedArr & openArr) and "global" (usedCells & openCells)
            occupyCell(openCells, usedCells, [openArr[0][0], openArr[0][1]]);
            occupyCell(openArr, usedArr, [openArr[0][0], openArr[0][1]]);
          }
          openArr = sortArrayByRow(openArr).reverse();
          usedArr = sortArrayByRow(usedArr).reverse();
          if (usedCol.length > 1 && usedArr[j+1] != undefined) {
            // merge() returns the cell that will be deleted
            var cellToEmpty = merge(usedArr[j], usedArr[j+1], "down", openCells, usedCells);
            //this checks if cells were merged. If cells were merged, then merge() returns the cell to be moved into emptyCells
            if (cellToEmpty != undefined) {
              //this empties the cell in the local variables (openArr, usedArr)
              emptyCell(openArr, usedArr, cellToEmpty);
          }
          openArr = sortArrayByRow(openArr).reverse();
          usedArr = sortArrayByRow(usedArr).reverse();
          }
        }
      }
    }
  }
}


function sortArrayByRow(array) {
  var newArr = [];
  if (array.length > 1) {
    for (k = 0; k < array.length; k++) {
      // returns the coordinate # of the row
      var coordPos = array[k][0];
      newArr.push([coordPos, array[k][1]]);
    }
    return newArr.sort(newArr[0][1]);
  }
  return array;
}

function sortArrayByColumn(array) {
  console.log("before");
  console.log(array);
  var newArr = [];
  if (array.length > 1) {
    for (k = 0; k < array.length; k++) {
      // returns the coordinate # of the column
      var coordPos = array[k][1];
      console.log("coordPos");
      console.log(coordPos);
      newArr.push([array[k][0], coordPos]);
      console.log("newArr");
      console.log(newArr);
    }
    return newArr.sort(newArr[1][1]);
  }
  return array;
}

