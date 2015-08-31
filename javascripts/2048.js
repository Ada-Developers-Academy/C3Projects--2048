$(document).ready(function() {
  console.log('ready!');
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, event.which);
      event.preventDefault();
    }
  })
})

var

var tilesNum = 2;

var tilesNum

function generateRandomBoard(){
  var tilesAdded = 0;
  while (tilesAdded < tilesNum){
    var randomRow = Math.floor(Math.random() * 4 - 0);
    var randomCol = Math.floor(Math.random() * 4 - 0);
    var newTile =
    var newValArray = [2,2,2,2,2,2,2,2,4,4];
    var newTileValue = newValArray[Math.floor(Math.random() * newValArray.length)];
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
