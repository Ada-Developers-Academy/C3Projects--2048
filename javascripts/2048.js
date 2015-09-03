$(document).ready(function() {
  console.log('ready!');
  initializeGame();
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, event.which);
      event.preventDefault();
    }
    // addTile();
    endGame();
  })
})

// Score is zero at the start of the game;
var score = 0;

function initializeGame() {  
  // Assign position of first 2 tiles
  var tile1 = position(); //=> 'r3, c0'
  var tile2 = position(); //=> 'r2, c1'

  // if tiles are set to the same position
  while (tile1.substr(0, 2) === tile2.substr(0, 2) && tile1.substr(4, 2) === tile2.substr(4, 2)) {
    tile2 = position();
  }

  // Place tiles on gameboard
  tilePlacement(tile1);
  tilePlacement(tile2);
}

// Find positions of all tiles on board => ["r3, c0", "r3, c1"]
function locateTiles(){
  var tileRowPositions = $(".tile").map(function() {return $(this).attr("data-row");}).get();
  var tileColPositions = $(".tile").map(function() {return $(this).attr("data-col");}).get();

  var tilePositions = [];
  for (var i=0; i < tileRowPositions.length; i++){
    tilePositions[i] = tileRowPositions[i] + ", " + tileColPositions[i]; // ["r3, c0", "r0, c1", "r2, c2"]
  }
  return tilePositions;
}

// Add a tile with every key press
function addTile(){
  var emptySpace = findEmptySpaces();
  var newTile = position();

  if (emptySpace.indexOf(newTile) > -1) {
    return tilePlacement(newTile);
  } else {
    do { 
      newTile = position();
    } while (emptySpace.indexOf(newTile) == -1)
    return tilePlacement(newTile);
  }
}

function findEmptySpaces() { // Returns all empty spaces in array => ['r0, c1', 'r3, c2']
  var allSpaces = ['r0, c0', 'r0, c1', 'r0, c2', 'r0, c3', 'r1, c0', 'r1, c1', 'r1, c2', 'r1, c3', 'r2, c0', 'r2, c1', 'r2, c2', 'r2, c3', 'r3, c0', 'r3, c1', 'r3, c2', 'r3, c3'];
  var taken = locateTiles();

  function isNotTaken(position) {
    var empty = true;
    for(var i = 0; i < taken.length; i++) {
      if (position == taken[i]) {
        empty = false;
      }
    }
    return empty;
  }
  return allSpaces.filter(isNotTaken);
}

function extractNum(tileDiv, data) {
  var coordinate = $('.tile').attr(data) // => "r3"
  var stringNum = coordinate.match(/\d+/) // => "3"
  return parseInt(stringNum);
}

function findEmptyRowCol(coordinate, RowCol) { // => 'r3' or 'c2'
  var emptyTiles = findEmptySpaces();
  
  function isEmpty(position) {
    if (RowCol == 'row') {
      return position.substr(0, 2) == coordinate;
    } else {
      return position.substr(4, 2) == coordinate;
    }
  }
  return emptyTiles.filter(isEmpty)
}

function moveTile(tile, direction) {
  // var new_tile_value = tile.attr("data-val");
  // tile.attr("data-val", new_tile_value);
  // tile.text(new_tile_value);
 
  // if up row - 1
  // if right column + 1
  // if down row + 1
  // if left column - 1
  for(var i = 0; i < tile.length; i++) {
    var rowValue = extractNum(tile[i], 'data-row'); // => 3
    var colValue = extractNum(tile[i], 'data-col'); // => 2
    var rowCoordinate = tile[i].getAttribute('data-row') // => 'r3'
    var colCoordinate = tile[i].getAttribute('data-col'); // => 'c2'

    switch(direction) {
      case 38: //up
        var emptyCol = findEmptyRowCol(colCoordinate, "col"); // => ['r2, c0', 'r1, c0']

        var rowPosition = (rowValue - 1);
        var newRow = "r" + rowPosition;
        var newPosition = newRow + ', ' + colCoordinate
        if (emptyCol.indexOf(newPosition) > -1) {
          tile[i].setAttribute("data-row", newRow);
        }
        console.log(tile[i])
        break;
      case 40: //down
        var emptyCol = findEmptyRowCol(colCoordinate, "col"); // => ['r2, c0', 'r1, c0']

        var rowPosition = (rowValue + 1);
        var newRow = "r" + rowPosition;
        var newPosition = newRow + ', ' + colCoordinate
        if (emptyCol.indexOf(newPosition) > -1) {
          tile[i].setAttribute("data-row", newRow);
        }
        console.log(tile[i])
        break;
      case 37: //left
        var emptyRow = findEmptyRowCol(rowCoordinate, "row");

        var colPosition = (colValue - 1);
        var newCol = "c" + colPosition;
        var newPosition = rowCoordinate + ', ' + newCol;
        if (emptyRow.indexOf(newPosition) > -1) {
          tile[i].setAttribute("data-col", newCol);
        }
        console.log(tile[i])
        break;
      case 39: //right
        var emptyRow = findEmptyRowCol(rowCoordinate, "row");

        var colPosition = (colValue + 1);
        var newCol = "c" + colPosition;
        var newPosition = rowCoordinate + ', ' + newCol;
        if (emptyRow.indexOf(newPosition) > -1) {
          tile[i].setAttribute("data-col", newCol);
        }
        console.log(tile[i])
        break;
    }
  }
}

// generates a random grid postion =>"r3, c0"
function position(){
  var rowCoordinates = ["r0", "r1", "r2", "r3"];
  var columnCoordinates = ["c0", "c1", "c2", "c3"];

  var randomRow = Math.floor(Math.random() * (rowCoordinates.length));
  var randomColumn = Math.floor(Math.random() * (columnCoordinates.length));

  var position = rowCoordinates[randomRow] + ", " + columnCoordinates[randomColumn];

  return position;
}

function tilePlacement(position) {
  var tileDiv =  $("<div class='tile'></div>");
  var tileNumber = randomTileNumber();
  tileDiv.text(tileNumber);
  tileDiv.attr("data-row", position.substr(0, 2));
  tileDiv.attr("data-col", position.substr(4, 2));
  tileDiv.attr("data-val",  tileNumber);

  $("#gameboard").append(tileDiv);
}

function randomTileNumber() {
  var randomValue = Math.random() < 0.9 ? 2 : 4;
  return randomValue;
}

function endGame() {
  var takenSpace = locateTiles();
  if(takenSpace.length === 16){
    console.log("Game over")
  }
}
