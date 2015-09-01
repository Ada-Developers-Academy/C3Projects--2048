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
  var farthestEdgeType = "";
  var farthestEdgeValue = "";

  switch(direction) {
    case 38: // up
      farthestEdgeType = "data-row";
      farthestEdgeValue = "1";
      break;
    case 40: // down
      farthestEdgeType = "data-row";
      farthestEdgeValue = "4";
      break;
    case 37: // left
      farthestEdgeType = "data-col";
      farthestEdgeValue = "1";
      break;
    case 39: // right
      farthestEdgeType = "data-col";
      farthestEdgeValue = "4";
      break;
  }

  tile.setAttribute(farthestEdgeType, farthestEdgeValue);
}
