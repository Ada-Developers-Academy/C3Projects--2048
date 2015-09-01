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
  var type = rowOrColumn(direction);
  var value = farthestValue(direction);

  tile.setAttribute(type, value);
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
  if (direction == 37 || direction == 38) {
    value = "1";
  } else if (direction == 39 || direction == 40) {
    value = "4";
  }

  return value;
}
