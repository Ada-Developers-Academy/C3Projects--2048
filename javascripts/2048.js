$(document).ready(function() {
  console.log('ready!');
  generateRandomBoard();


  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, event.which);
      event.preventDefault();
    }
  })
})

function generateRandomBoard(){
  var tilesAdded = 0;
  var tilesNum = 2;
  while (tilesAdded < tilesNum){

    // Generate random tile position and value
    var randomRow = Math.floor(Math.random() * 4 - 0);
    var randomCol = Math.floor(Math.random() * 4 - 0);
    var newValArray = [2,2,2,2,2,2,2,2,4,4];
    var randomValue = newValArray[Math.floor(Math.random() * newValArray.length)];
    var newTileTemplate = $("<div class='tile' data-row='', data-col='' data-val=''></div>");

    // Build new tile
    newTileTemplate.attr("data-row", 'r'+ randomRow);
    newTileTemplate.attr("data-col", 'c'+ randomCol);
    newTileTemplate.attr("data-val", randomValue);
    newTileTemplate.text(randomValue)
    // if on the sencond iteration of loops
    // needs to check for an existing placement of 1st tile
    // if tilesAdded===1 then check for existing
    // if no then add
    // if yes then choose new spot
    // save 1st tile to variable
    // do not allow append until new value is different than 1st

    if (tilesAdded === 1){
      var firstTile = $(".tile");
        while (newTileTemplate === firstTile){

        }
    }

    // Insert new tile
    $("#gameboard").append(newTileTemplate);

    tilesAdded++;
  }
}

function moveTile(tile, direction) {
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
