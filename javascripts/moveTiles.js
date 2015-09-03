function moveTiles(direction) {
  var collection = new TileCollection(direction);
  collection.move();
}

function combineUpOrLeft(gridElement) {
  for (var i = 1; i < gridElement.length; i++) {
    if (gridElement[i].attr('data-val') === gridElement[i - 1].attr('data-val')) {
      // combine!
      updateValue(gridElement[i]);

      gridElement[i - 1].remove(); // removes adjacent tile from html
      gridElement.splice(i - 1, 1); // removes adjacent tile from gridElement array
      i += 1;
    }
  }
  return gridElement;
}

function combineRightOrDown(gridElement) {
  gridElement.reverse();
  // modify element to work with other combining function:
  return combineUpOrLeft(gridElement).reverse();
}

function shiftRightOrDown(tile_array, type) {
  if (type === 'col') {
    var attr_name = 'data-row', letter = 'r', length = rows.length;
  } else if (type === 'row') {
    var attr_name = 'data-col', letter = 'c', length = cols.length;
  } else { return; }

  for (var i = 1, j = tile_array.length - 1; i <= tile_array.length; i++, j--) {
    tile_array[j].attr(attr_name, letter + (length - i).toString());
  }
}

function shiftLeftOrUp(tile_array, type) {
  if (type === 'col') {
    var attr_name = 'data-row', letter = 'r';
  } else if (type === 'row') {
    var attr_name = 'data-col', letter = 'c';
  } else { return; }

  for (var i = 0; i < tile_array.length; i++) {
    tile_array[i].attr(attr_name, letter + (i).toString());
  }
}
