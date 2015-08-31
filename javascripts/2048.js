$(document).ready(function() {
  console.log('ready!');
  startGame();
  // kicks off the game
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, event.which);
      event.preventDefault();
    }
  });
});

function startGame() {
  newTile();
  newTile();
}

// tiles will be anywhere on the board
// refactor for when you're in the middle of a game
function newTile() {
  var rows = ["r0", "r1", "r2", "r3"];
  var cols = ["c0", "c1", "c2", "c3"];

  // randomize the row & column value
  var rowIndex = Math.floor(Math.random() * rows.length);
  var colIndex = Math.floor(Math.random() * cols.length);

  // create a html tile
  var tile = $("<div class='tile'></div>");
  tile.attr({"data-row":rows[rowIndex], "data-col":cols[colIndex]});
  tile.attr("data-val", 2); // brownie pts = randomly mix in 4s
  tile.text("2");

  $("#gameboard").append(tile);
}

function moveTile(tile, direction) {
  var new_tile_value = tile.attr("data-val") * 2;
  tile.attr("data-val", new_tile_value);
  tile.text(new_tile_value);

  switch(direction) {
    case 38: // up
      tile.attr("data-row","r0");
      break;
    case 40: // down
      tile.attr("data-row","r3");
      break;
    case 37: // left
      tile.attr("data-col","c0");
      break;
    case 39: // right
      tile.attr("data-col","c3");
      break;
  }
}
