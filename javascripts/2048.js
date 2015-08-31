$(document).ready(function() {
  console.log('ready!');
  playGame();
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, event.which);
      event.preventDefault();
    }
  })
})

function playGame() {
  var openCells = [["r1", "c1"], ["r1", "c2"], ["r1", "c3"], ["r1", "c0"],
                   ["r2", "c1"], ["r2", "c2"], ["r2", "c3"], ["r2", "c0"],
                   ["r3", "c1"], ["r3", "c2"], ["r3", "c3"], ["r3", "c0"],
                   ["r0", "c1"], ["r0", "c2"], ["r0", "c3"], ["r0", "c0"]];
  var usedCells = []
  if (openCells.length == 16) {
    newTile(openCells, usedCells);
    newTile(openCells, usedCells);
  } else {
    newTile(openCells, usedCells)
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

function moveTile(tile, direction) {
  //only be user * 2 if the tiles merged
  var new_tile_value = tile.attr("data-val") * 2;
  tile.attr("data-val", new_tile_value);
  tile.text(new_tile_value);

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
