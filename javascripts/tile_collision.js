function tileInventory() {
  // all the tiles and their locations
  var tiles = $('.tile');
  var takenSpaces = [];
  for (var i = 0; i < tiles.length; i++) {
    var row = tiles[i].getAttribute("data-row");
    var col = tiles[i].getAttribute("data-col");
    takenSpaces.push([row, col]);
  }

  return takenSpaces;
}

function orderDirection(direction) {
  switch(direction) {
    case 38: // up
    // bottom, middle, top

      break;
    case 40: // down
    // top, middle, bottom
      break;
    case 37: // left
    // right, middle, left
      break;
    case 39: // right
    // left, middle, right
      break;
  }
}

function orderTiles(start) {
  var direction = function() {
    // keystroke up
    if (start === "r3") { return ["r3", "r2", "r1", "r0"]; }
    // keystroke down
    if (start === "r0") { return ["r0", "r1", "r2", "r3"]; }
    // keystroke left
    if (start === "c3") { return ["c3", "c2", "c1", "c0"]; }
    // keystroke right
    if (start === "c0") { return ["c0", "c1", "c2", "c3"]; }
  };
}
