var rows = ['r0', 'r1', 'r2', 'r3'];
var cols = ['c0', 'c1', 'c2', 'c3'];
var newTileLevel2 = [ 2, 4 ];
var newTileLevel1 = [ 2 ];
var score = 0;

$(document).ready(function() {
  initializeGame();

  console.log('ready!');
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTiles(tile, event.which);
      event.preventDefault();
      generateTile(newTileLevel2);  // later pass in newTileLevel1 or newTileLevel2 depending on score
    }
  });
});

function initializeGame() {
  // randomly pick two positions and start values
  generateTile(newTileLevel2);
  generateTile(newTileLevel2);
}

function generateTile(array) {
  var tile = $('<div class="tile" data-row="", data-col="" data-val="">');
  var randomRow = Math.floor(Math.random() * (rows.length));
  var randomCol = Math.floor(Math.random() * (cols.length));
  var randomValue = Math.floor(Math.random() * (array.length));

  tile.attr('data-row', rows[randomRow]);
  tile.attr('data-col', cols[randomCol]);
  tile.attr('data-val', array[randomValue]);
  tile.text(array[randomValue]);

  if ($('[data-row=' + rows[randomRow] + '][data-col=' + cols[randomCol] + ']').length === 0) {

    $('#gameboard').append(tile);
    scaleIn(tile);
  } else {
    generateTile(array);
  }
}

function scaleIn(tile) {
  tile.addClass('scaleIn')
  .on('animationend',
    function () { $(this).removeClass('scaleIn'); }
  );
}

function pop(tile) {
  $(tile)
  .addClass("popper")
  .on("animationend",
    function() { $(this).removeClass("popper"); }
  );
}

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
      var added = gridElement[i].attr('data-val') * 2;
      gridElement[i].attr('data-val', added);
      gridElement[i].text(added);
      pop(gridElement[i]);

      // add to score var
      score += added;
      console.log(score);

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
      var added = gridElement[i].attr('data-val') * 2;
      gridElement[i].attr('data-val', added);
      gridElement[i].text(added);
      pop(gridElement[i]);

      // add to score var
      score += added;
      console.log(score);

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

// Sequentially collects all existing tiles from a row.
function generateRow(num) {
  var row = [];
  for (var i = 0; i < rows.length; i++) {
    var tile = $('[data-row=r' + num + '][data-col=c' + i + ']');
    if (tile.length > 0) { row.push(tile); }
  }

  return row;
}

function generateCol(num) {
  var col = [];
  for (var i = 0; i < cols.length; i++) {
    var tile = $('[data-col=c' + num + '][data-row=r' + i + ']');
    if (tile.length > 0) { col.push(tile); }
  }

  return col;
}

// partial code for keypress 39?
  // var row0 = $('[data-row=r0]');  // not in order... need to fix
  // for (var i = row0.length - 1; i >= 0; i--) {
  //   if (row0[i].getAttribute('data-val') === row0[i - 1].getAttribute('data-val')) {
  //     moveTiles(row0[i], event.which);
  //   }
  // }
