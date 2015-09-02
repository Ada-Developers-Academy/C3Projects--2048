$(document).ready(function() {
  console.log('ready!');
  var openCells = [["r1", "c1"], ["r1", "c2"], ["r1", "c3"], ["r1", "c0"],
                   ["r2", "c1"], ["r2", "c2"], ["r2", "c3"], ["r2", "c0"],
                   ["r3", "c1"], ["r3", "c2"], ["r3", "c3"], ["r3", "c0"],
                   ["r0", "c1"], ["r0", "c2"], ["r0", "c3"], ["r0", "c0"]];
  var usedCells = []
  newTile(openCells, usedCells);
  newTile(openCells, usedCells);

  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      // newTile(openCells, usedCells);
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


function merge(tile1, tile2) {
  var value = $(tile1).val();
  if (value == $(tile2).val()) {
    $(tile1).val(value * 2);
    deleteTile(tile2);
  }
}

function deleteTile(tile) {
  // var row = $(tile).attr("data-row");
  // var col = $(tile).attr("data-col");
  $(tile).remove();
}

function moveTile(tile, direction) {
  //only be user * 2 if the tiles merged
  var new_tile_value = tile.attr("data-val") * 2;
  tile.attr("data-val", new_tile_value);
  tile.text(new_tile_value);

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
        return moveUp(tile, openCells, usedCells, direction);
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
    if (openCol.length >= 4 || usedCol.length >= 4) {
      continue;
    } else {
      // gives array with row # and column coordinates sorted by row #
      var openArr = sortArray(openCol);
      var usedArr = sortArray(usedCol);
      // loop through used array and always compare to position 0 of open array
      for (j = 0; j < usedArr.length; j++) {
        if (openArr[0][0] < usedArr[j][0]) {
          var fullCoord = "r" + openArr[0][0];
          var col = "c" + i;
          usedArr[j][0] = "r" + usedArr[j][0]
          oneTile = $("div[data-row=" + usedArr[j][0] + "][data-col=" + col + "]");
          $(oneTile).attr("data-row", fullCoord);
          emptyCell(openCells, usedCells, usedArr[j]);
          occupyCell(openCells, usedCells, [fullCoord, openArr[0][1]]);
        }
      }
    }
  }
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
