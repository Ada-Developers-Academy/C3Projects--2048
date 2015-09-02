$(document).ready(function() {
  console.log('ready!');
  initializeGame();
  endGame();
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, event.which);
      event.preventDefault();
    }
    addTile();
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

function moveTile(tile, direction) {
  var spacesTaken = locateTiles(); //=>[["r3", "c0"], ["r3", "c1"]]
  // if(arrow_keys.indexOf(event.which) > -1) {
  //   var tile = $('.tile');
  //   moveTile(tile, event.which);
  //   event.preventDefault();
  // }



  // var flattened=[];
  // for (var i=0; i<spacesTaken.length; ++i) {
  //   var current = spacesTaken[i];
  //   for (var j=0; j<current.length; ++j)
  //     flattened.push(current[j]);
  //   }
    // console.log(flattened);

  var new_tile_value = tile.attr("data-val");
  tile.attr("data-val", new_tile_value);
  tile.text(new_tile_value);

  for(var i = 0; i < spacesTaken.length; i++) {
    switch(direction) {
      case 38: //up
        // tile.attr("data-row","r0");
        // var rowValue = spacesTaken[i][1][1]; // "3"
        // console.log(rowValue);
        var r0 = jQuery.inArray("r0", spacesTaken[i]); // TRUE: 0, FALSE: -1
        var r1 = jQuery.inArray("r1", spacesTaken[i]);
        var r2 = jQuery.inArray("r2", spacesTaken[i]);
        var r3 = jQuery.inArray("r3", spacesTaken[i]);
        var newRowValue;

        // console.log("spacesTaken[i][0]: " + spacesTaken[i][0]);
        // console.log("spacesTaken: " + spacesTaken);
        // console.log("r0:" + r0);
        // console.log("r1:" + r1);
        // console.log("r2:" + r2);
        // console.log("r3:" + r3);

        if(spacesTaken[i][0] == "r0"){
          newRowValue = "r0";
        }else if (spacesTaken[i][0] == "r1" && r0 < 0 ){
          newRowValue = "r0";
        }else if (spacesTaken[i][0] == "r1" && r0 > - 1){
          newRowValue = "r1";
        }else if (spacesTaken[i][0] == "r2" && r1 < 0 && r0 < 0){
          newRowValue = "r0";
        }else if (spacesTaken[i][0] == "r2" && r1 < 0){
          newRowValue = "r1";
        }else if (spacesTaken[i][0] == "r2" && r1 > -1){
          newRowValue = "r2";
        }else if (spacesTaken[i][0] == "r3" && r2 < 0 && r1 < 0 && r0 < 0){
          newRowValue = "r0";
        }else if (spacesTaken[i][0] == "r3" && r2 < 0 && r1 < 0){
          newRowValue = "r1";
        }else if (spacesTaken[i][0] == "r3" && r2 < 0){
          newRowValue = "r2";
        }else{
          newRowValue = "r3";
        }

        // tile.attr("data-row", newRowValue);
        console.log(newRowValue);
          tile.attr("data-row", newRowValue);
        break;
      case 40: //down
        tile.attr("data-row","r3");
        break;
      case 37: //left
        tile.attr("data-col","c0");
        var colValue = spacesTaken[i][1][1]; // "c0"
        break;
      case 39: //right
        tile.attr("data-col","c3");
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
