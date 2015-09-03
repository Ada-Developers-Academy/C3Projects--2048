// allows us to compare an array of arrays
// by turning the inner arrays into string, e.g. ["r3, c3", "r2, c0"]
function stringify(array) {
  var stringifiedArray = [];

  for (var i = 0; i < array.length; i++) {
    stringifiedArray.push(array[i].join());
  }

  return stringifiedArray;
}

// returns an array of the occupied spaces, e.g. ["r2", "c0"]
function occupiedSpaces() {
  var tiles = $('.tile');

  var takenSpaces = [];
  for (var i = 0; i < tiles.length; i++) {
    var row = tiles[i].getAttribute("data-row");
    var col = tiles[i].getAttribute("data-col");
    takenSpaces.push([row, col]);
  }

  return takenSpaces;
}

// returns an array of open space locations, e.g. ["r1", "c3"]
function openSpaces() {
  var takenSpaces = stringify(occupiedSpaces());
  var boardSpaces = [ 'r0,c0', 'r0,c1', 'r0,c2', 'r0,c3',
                      'r1,c0', 'r1,c1', 'r1,c2', 'r1,c3',
                      'r2,c0', 'r2,c1', 'r2,c2', 'r2,c3',
                      'r3,c0', 'r3,c1', 'r3,c2', 'r3,c3'];

  var result = boardSpaces.map( function(space) {
    if ($.inArray(space, takenSpaces) < 0) {
      return [space.slice(0,2), space.slice(3,5)];
    }
  });

  result = result.filter(function(space) {
    return space !== undefined;
  });

  return result;
}
