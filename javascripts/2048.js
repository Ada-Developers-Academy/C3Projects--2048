$(document).ready(function() {
  // introduces 2 tiles only when the game starts
  var tiles = $(".tile");
  var inPlay = (tiles.length > 0) ? true : false;
  if (inPlay === false) {
    newTile();
    newTile();
  }

  // play
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, event.which);
      event.preventDefault();
    }
  });
});

function newTile() {
  var availableSpaces = openSpaces();
  // randomly select an available space
  var spaceIndex = Math.floor(Math.random() * availableSpaces.length);
  var cell = availableSpaces[spaceIndex];

  // TODO: Try to make it appear opposite of the keystroke instead of randomly
  // takes inventory of open spaces
  // figures out the direction of the keystroke
  // randomly selects an open space that's in the
  // 2 rows/columns opposite of your keystroke

  // create html tile
  var tile = $("<div class='tile'></div>");
  tile.attr({"data-row":cell[0], "data-col":cell[1]});
  tile.attr("data-val", 2); // brownie pts = randomly mix in 4s
  tile.text("2");

  $("#gameboard").append(tile);
}

function moveTile(tile, direction) {
  tileCollision(direction);

  // ensures the new tile is introduced *after* the tiles transition
  var addedTile = false;
  document.addEventListener("transitionend", function() {
    if (addedTile === false) {
      newTile();
      addedTile = true;
    }
  });
}
