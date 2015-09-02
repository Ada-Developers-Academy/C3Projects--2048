function moveTiles(tile, direction) {
  switch(direction) {
    case 38: //up
      moveUp();
      break;
    case 40: //down
      moveDown();
      break;
    case 37: //left
      moveLeft();
      break;
    case 39: //right
      moveRight();
      break;
  }
}

function moveRight() {
  for (var i = 0; i < rows.length; i++) {
    shiftRightOrDown(combineRightOrDown(generateRow(i)), 'row');
  }
}

function moveLeft() {
  for (var i = 0; i < rows.length; i++) {
    shiftLeftOrUp(combineUpOrLeft(generateRow(i)), 'row');
  }
}

function moveDown() {
  for (var i = 0; i < cols.length; i++) {
    shiftRightOrDown(combineRightOrDown(generateCol(i)), 'col');
  }
}

function moveUp() {
  for (var i = 0; i < cols.length; i++) {
    shiftLeftOrUp(combineUpOrLeft(generateCol(i)), 'col');
  }
}

function combineUpOrLeft(gridElement) {
  for (var i = 1; i < gridElement.length; i++) {
    if (gridElement[i].attr('data-val') === gridElement[i - 1].attr('data-val')) {
      // combine!
      updateValue(gridElement[i]);

      gridElement[i - 1].remove();
      gridElement.splice(i - 1, 1);
      i += 1;
    }
  }
  return gridElement;
}

function combineRightOrDown(gridElement) {
  for (var i = gridElement.length - 2; i >= 0; i--) {
    if (gridElement[i].attr('data-val') === gridElement[i + 1].attr('data-val')) {
      // combine!
      updateValue(gridElement[i]);

      gridElement[i + 1].remove();
      gridElement.splice(i + 1, 1);
      i -= 1;
    }
  }
  return gridElement;
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
