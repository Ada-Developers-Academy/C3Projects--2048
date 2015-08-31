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
 tilePlacement(["r3", "c2"]);
})

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
    tileDiv.text(2);
    tileDiv.attr("data-row", position[0]);
    tileDiv.attr("data-col", position[1]);
    tileDiv.attr("data-val",  '2');

    $("#gameboard").append(tileDiv);
    console.log(tileDiv);
  }
