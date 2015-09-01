$(document).ready(function() {
  console.log('ready!');
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, event.which);
      event.preventDefault();
    }
  addTile();
  endGame();
  })

  // Assign position of first 2 tiles
  var tile1 = position();
  var tile2 = position();

  // if tiles are set to the same position
  while (tile1[0] === tile2[0] && tile1[1] === tile2[1]) {
    tile2 = position();
  }

  // Place tiles on gameboard
  tilePlacement(tile1);
  tilePlacement(tile2)
})

// Score is zero at the start of the game;
var score = 0;

// Find positions of all tiles on board =>[["r3", "c0"], ["r3", "c1"]]
function locateTiles(){
  var tileRowPositions = $(".tile").map(function() {return $(this).attr("data-row");}).get();
  var tileColPositions = $(".tile").map(function() {return $(this).attr("data-col");}).get();

  var tilePositions = [];
  for (var i=0; i < tileRowPositions.length; i++){
    tilePositions[i] = [tileRowPositions[i], tileColPositions[i]];
  }
  return tilePositions;
}

// Add a tile with every key press
function addTile(){
  var takenSpace = locateTiles();

  var newTile = position();
  for (var i=0; i < takenSpace.length; i++) {
    while (newTile[i] === takenSpace[i]) {
      newTile = position();
    }
  }
  tilePlacement(newTile);
}

function moveTile(tile, direction) {
  var new_tile_value = tile.attr("data-val");
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

// generates a random grid postion =>["r3", "c0"]
function position(){
  var rowCoordinates = ["r0", "r1", "r2", "r3"];
  var columnCoordinates = ["c0", "c1", "c2", "c3"];

  var randomRow = Math.floor(Math.random() * (rowCoordinates.length));
  var randomColumn = Math.floor(Math.random() * (columnCoordinates.length));

  var position = [rowCoordinates[randomRow], columnCoordinates[randomColumn]];

  return position;
}

function tilePlacement(position) {
  var tileDiv =  $("<div class='tile'></div>");
  var tileNumber = randomTileNumber();
  tileDiv.text(tileNumber);
  tileDiv.attr("data-row", position[0]);
  tileDiv.attr("data-col", position[1]);
  tileDiv.attr("data-val",  tileNumber);

  $("#gameboard").append(tileDiv);
  console.log(tileDiv);
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

// function addValue() {
//   if()
// }
