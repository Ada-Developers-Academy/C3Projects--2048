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
  var coordinate = $(tileDiv).attr(data) // => "r3"
  var stringNum = coordinate.match(/\d+/) // => "3"
  return parseInt(stringNum);
}

function findEmptyRowCol(coordinate, RowCol) { // => ('r3', 'row') or ('c2', 'col')
  var emptyTiles = findEmptySpaces();
  
  function isEmpty(position) {
    if (RowCol == 'row') {
      return position.substr(0, 2) == coordinate;
    } else {
      return position.substr(4, 2) == coordinate;
    }
  }
  return emptyTiles.filter(isEmpty) // => ['r3, c0', 'r0, c0']
}

function orderedColTiles(tiles) { // => tiles = array of jQuery tile divs 
  var array = [0, 0, 0, 0];

  for(var i = 0; i < tiles.length; i++) {
    var tile = tiles[i]; 
    var rowValue = extractNum(tile, 'data-row') // for 'r1' => 1
    console.log(rowValue);
    array[rowValue] = tile; // => array[1] = tile
  }
  return array;
}

function removeZero(element) {
  return element != 0;
}

function solveColumn(col, direction) { // => ('c3', 'up')
  var tiles = $('.tile[data-col=c' + col + ']'); //=> [tile in c3, tile in c3]

  var orderedTiles = orderedColTiles(tiles); //=> [0, tile, 0, tile]

  orderedTiles = orderedTiles.filter(removeZero); //=> [tile, tile]

  if (direction == 'up') {
    while (orderedTiles.length < 4) {
      orderedTiles.push(0); // => [tile, tile, 0, 0]
    }
  } else { // => 'down'
    while (orderedTiles.length < 4) {
      orderedTiles.unshift(0); // => [0, 0, tile, tile]
    }
  }

  for(var i = 0; i < orderedTiles.length; i++) {
    if (orderedTiles[i] != 0) {
      var newRow = 'r' + i;
      orderedTiles[i].setAttribute("data-row", newRow);
    }
  }
}

  // [2, 2, 0, 0]

  // [undefined, 2, undefined, 4] => 

  // data-row value represents the position they should be in the array
  //[tile, tile] => [undefined, tile, undefined, tile]

  // r0 0
  // r1 2
  // r2 0 
  // r3 4
  // for the column, find the "empty" spaces

  // discard them from the array
  // [0, 2, 0, 4] => [2, 4]
  // r0 2
  // r1 4

  // loop the tiles array to update the data-row
  // the tile in spot zero should get data-row=r0

function solveRow(row) {

}

function moveTile(tile, direction) {
  for(var i = 0; i < tile.length; i++) {
    var rowValue = extractNum(tile[i], 'data-row'); // => 3
    var colValue = extractNum(tile[i], 'data-col'); // => 2
    var rowCoordinate = tile[i].getAttribute('data-row') // => 'r3'
    var colCoordinate = tile[i].getAttribute('data-col'); // => 'c2'
    var positions = [0, 1, 2, 3]
    switch(direction) {
      case 38: //up
        for(var i = 0; i < positions.length; i++) {
          solveColumn(i, "up");
        }
        break;
      case 40: //down
        for(var i = 0; i < positions.length; i++) {
          solveColumn(i, "down");
        }
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
