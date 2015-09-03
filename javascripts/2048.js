$(document).ready(function() {
  console.log('ready!');
  var openCells = [["r1", "c1"], ["r1", "c2"], ["r1", "c3"], ["r1", "c0"],
                   ["r2", "c1"], ["r2", "c2"], ["r2", "c3"], ["r2", "c0"],
                   ["r3", "c1"], ["r3", "c2"], ["r3", "c3"], ["r3", "c0"],
                   ["r0", "c1"], ["r0", "c2"], ["r0", "c3"], ["r0", "c0"]];
  var usedCells = [];
  newTile(openCells, usedCells);
  newTile(openCells, usedCells);

  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      playGame(tile, openCells, usedCells, event.which);
      event.preventDefault();
    }
  })
})

function playGame(tile, openCells, usedCells, direction) {
    moveTile(tile, openCells, usedCells, direction);
    newTile(openCells, usedCells);
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
  var index = findIndex(usedCells, cellSpace);
  usedCells.splice(index, 1);
  openCells.push(cellSpace);
}


// MERGING TILES --------------------------------------------------------------------------
function merge(tile1, tile2, direction) {
  if (direction == "up") {
    if (tile1[0][1] > tile2[0][1]) {
      tile1 = tile2;
      tile2 = tile1;
    }

    var findTile1 = $("div[data-row=" + tile1[0] + "][data-col=" + tile1[1] + "]");
    var findTile2 = $("div[data-row=" + tile2[0] + "][data-col=" + tile2[1] + "]");
    var value = $(findTile1).text();
    if (value == $(findTile2).text()) {
      $(findTile1).text(value * 2);
      deleteTile(findTile2);
    }
  }
}

function deleteTile(tile) {
  // var row = $(tile).attr("data-row");
  // var col = $(tile).attr("data-col");
  $(tile).remove();
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
    if (openRow.length >= 4 || usedRow.length >= 4) {
      continue;
    } else {
      if (direction == 37) { //left
        var openArr = sortArray(openRow);
        var usedArr = sortArray(usedRow);
        for (j = 0; j < usedArr.length; j++) {
          if (openArr[0][1][1] < usedArr[j][0][1]) {
            reassignHorTiles(openArr, usedArr, j, i, openCells, usedCells);
          }
        }
      } else if (direction == 39) { //right
        var openArr = sortArray(openRow).reverse();
        var usedArr = sortArray(usedRow).reverse();
        for (j = 0; j < usedArr.length; j++) {
          if (openArr[0][1][1] > usedArr[j][1][1]) {
            reassignHorTiles(openArr, usedArr, j, i, openCells, usedCells);
          }
        }
      }
    }
  }
}


function verticalMove(tile, openCells, usedCells, direction) {
  for (i = 0; i < 4; i++) {
    // filters cells for column for each loop
    var openCol = openCells.filter(function(array) { return array[1] == "c" + i });
    // search and delete from array method??
    var usedCol = usedCells.filter(function(array) { return array[1] == "c" + i});
    // is either open or used cells == 4, there is nothing to move
    if (openCol.length >= 4 || usedCol.length >= 4) {
      continue;
    } else {
      if (direction == 38) { //up
        // gives array with row # and column coordinates sorted by row #
        var openArr = sortArray(openCol);
        var usedArr = sortArray(usedCol);
        for (j = 0; j < usedArr.length; j++) {
        // loop through used array and always compare to position 0 of open array
          if (openArr[0][0][1] < usedArr[j][0][1]) {
            reassignVerTiles(openArr, usedArr, j, i, openCells, usedCells);
          }
        }
      } else if (direction == 40) { //down
        // gives array with row # and column coordinates sorted by row #
        var openArr = sortArray(openCol).reverse();
        var usedArr = sortArray(usedCol).reverse();
        for (j = 0; j < usedArr.length; j++) {
          if (openArr[0][0] > usedArr[j][0]) {
            var col = "c" + i;
            oneTile = $("div[data-row=" + usedArr[j][0] + "][data-col=" + col + "]");
            $(oneTile).attr("data-row", openArr[0][0]);
            // check to make sure local arrays are correct
            // double check global holder
            emptyCell(openCells, usedCells, usedArr[j]);
            emptyCell(openArr, usedArr, usedArr[j]);
            occupyCell(openCells, usedCells, [openArr[0][0], openArr[0][1]]);
            occupyCell(openArr, usedArr, [openArr[0][0], openArr[0][1]]);
          }
            openArr = sortArray(openArr).reverse();
            usedArr = sortArray(usedArr).reverse();
        }
      }
    }
  }
}

function reassignHorTiles(open, used, cellNum, rowNum, openCells, usedCells) {
  var row = "r" + rowNum;
  oneTile = $("div[data-row=" + row + "][data-col=" + used[cellNum][1] + "]");
  $(oneTile).attr("data-col", open[0][1]);
  emptyCell(openCells, usedCells, used[cellNum]);
  emptyCell(open, used, used[cellNum]);
  occupyCell(openCells, usedCells, [row, open[0][1]]);
  occupyCell(open, used, [open[0][0], open[0][1]]);
  used = sortArray(used);
  open = sortArray(open);
}

function reassignVerTiles(open, used, cellNum, colNum, openCells, usedCells) {
  var col = "c" + colNum;
  oneTile = $("div[data-row=" + used[cellNum][0] + "][data-col=" + col + "]");
  $(oneTile).attr("data-row", open[0][0]);
  // check to make sure local arrays are correct
  // double check global holder
  emptyCell(openCells, usedCells, used[cellNum]);
  emptyCell(open, used, used[cellNum]);
  occupyCell(openCells, usedCells, [open[0][0], open[0][1]]);
  occupyCell(open, used, [open[0][0], open[0][1]]);
  // sort outside the IF loop instead!!! DUH!!!
  // extract empty and occupy cells??
  used = sortArray(used);
  open = sortArray(open);
}

function sortArray(arrayCol) {
  var newArr = [];
  for (k = 0; k < arrayCol.length; k++) {
    // returns the coordinate # of the row
    var coordPos = arrayCol[k][0];
    newArr.push([coordPos, arrayCol[k][1]]);
  }
  return newArr.sort(newArr[0][1]);
}
