$(document).ready(function() {
  console.log('ready!');
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    var direction = event.which;
    if(arrow_keys.indexOf(direction) > -1) {
      moveTiles(direction);
      event.preventDefault();
    }
  })
})

function moveTiles(direction) {
  var tiles = $(".tile");
  for (i = 0; i < tiles.length; i++) {
    moveTile(tiles[i], direction);
  }
}

function moveTile(tile, direction) {
  // determine if tiles are moving across rows or columns
  var type = rowOrColumn(direction);

  // determine if you are moving in positive or negative direction
  var farthestValue = farthestValue(direction);

  // works for up and left
  var secondFarthest = parseInt(farthestValue) + 1;
  // look through col1 row2


  // tile.setAttribute(type, value);
}

function rowOrColumn(direction) {
  var type = "";
  if (direction == 38 || direction == 40) {
    type = "data-row";
  } else if (direction == 37 || direction == 39) {
    type = "data-col";
  }

  return type;
}

function farthestValue(direction) {
  var value = "";
  // if moving left or up
  if (direction == 37 || direction == 38) {
    value = "-1";
  // if moving down or right
  } else if (direction == 39 || direction == 40) {
    value = "1";
  }

  return value;
}


function makeMovement(direction) {
  var moveTile = function(tile) {
    // set the positive or negative according to direction

    // set row or column (type)
    // check if tile can move
    // if tile can move, move the tile one space
    // if tile can't move, do nothing
  }
  return moveTile;
}
