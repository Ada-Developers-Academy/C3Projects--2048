$(document).ready(function() {
  console.log('ready!');
  var openCells = [["r1", "c1"], ["r1", "c2"], ["r1", "c3"], ["r1", "c0"],
                   ["r2", "c1"], ["r2", "c2"], ["r2", "c3"], ["r2", "c0"],
                   ["r3", "c1"], ["r3", "c2"], ["r3", "c3"], ["r3", "c0"],
                   ["r0", "c1"], ["r0", "c2"], ["r0", "c3"], ["r0", "c0"]];
  var usedCells = []
  playGame(openCells, usedCells);
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, openCells, usedCells, event.which);
      event.preventDefault();
    }
    newTile(openCells, usedCells);
  })
})

function playGame(open, used) {
  if (open.length == 16) {
    newTile(open, used);
    newTile(open, used);
  } else {
    newTile(open, used)
  }
}

function randomNum(array) {
  var index = Math.floor(Math.random()*(array.length));
  return array[index]
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
  openCells.splice(openCells.indexOf(cellSpace), 1);
  usedCells.push(cellSpace);
}

function emptyCell(openCells, usedCells, cellSpace) {
  usedCells.splice(usedCells.indexOf(cellSpace), 1);
  openCells.push(cellSpace);
}

// function moveTile(tile, direction) {
//   //only be user * 2 if the tiles merged
//   var new_tile_value = tile.attr("data-val") * 2;
//   tile.attr("data-val", new_tile_value);
//   tile.text(new_tile_value);
//
//   switch(direction) {
//     case 38: //up
//       tile.attr("data-row","r0");
//       break;
//     case 40: //down
//       tile.attr("data-row","r3");
//       break;
//     case 37: //left
//       tile.attr("data-col","c0");
//       break;
//     case 39: //right
//       tile.attr("data-col","c3");
//       break;
//   }
// }
function moveTile(tile, openCells, usedCells, direction) {

  switch(direction) {
      case 38: //up
        moveUp(tile, openCells, usedCells, direction);
        break;
  }
}

function moveUp(tile, openCells, usedCells, direction) {
  for (i = 0; i < 4; i++) {
    // filters cells for column for each loop
    var openCol = openCells.filter(function(array) { return array[1] == "c" + i });
    // search and delete from array method??
    var usedCol = usedCells.filter(function(array) { return array[1] == "c" + i});
    // is either open or used cells == 4, there is nothing to move
    if (openCol.length == 4 || usedCol.length == 4) {
      continue;
    } else {
      // gives array with row # and column coordinates sorted by row #
      var openArr = sortArray(openCol);
      var usedArr = sortArray(usedCol);
      // loop through used array and always compare to position 0 of open array
      for (j = 0; j < usedArr.length; j++) {
        if (openArr[0][0] < usedArr[j][0]) {
          var fullCoord = "r" + openArr[0][0];
          $(tile).attr("data-row", fullCoord);
          openCol.push(usedArr[j]);
          occupyCell(openCol, usedCol, [fullCoord, openArr[0][1]]);
        }
      }
      // add to global variables

    }
  }
  // all columns have been iterated over - create a new tile
  // newTile(openCells, usedCells);
}

function sortArray(arrayCol) {
  var newArr = [];
  for (j = 0; j < arrayCol.length; j++) {
    // returns the coordinate # of the row
    var coordPos = arrayCol[j][0].split('')[1];
    newArr.push([coordPos, arrayCol[j][1]]);
  }
  return newArr.sort(newArr[0]);
}
