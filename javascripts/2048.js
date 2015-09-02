var rows = ['r0', 'r1', 'r2', 'r3'];
var cols = ['c0', 'c1', 'c2', 'c3'];
var boardSize = function() { return rows.length * cols.length; }()
// var boardSize = 16 // rows.length * cols.length // TODO: ask about this!
var newTileValue = [ 2, 2, 2, 2, 4 ];
var score = 0;
var priorWin = false;
var gameOver = false;

$(document).ready(function() {
  initializeGame();

  $('body').keydown(playTurn);
});

function initializeGame() {
  // randomly pick two positions and start values
  addTile(newTileValue);
  addTile(newTileValue);
}

function playTurn(event) {
  if (gameOver) { return; }

  var arrow_keys = [37, 38, 39, 40];
  if (arrow_keys.indexOf(event.which) > -1) {
    event.preventDefault();

    var tile = $('.tile');
    moveTiles(tile, event.which);

    if ($('.tile').length >= boardSize) {
      if (checkLose()) { endGame('lose'); }
    } else {
      addTile(newTileValue);
    }

    if (!priorWin) { checkWin(); }
  }
}

function retryClickHandler(event) {
  event.preventDefault();
  location.reload();
}

function continueClickHandler(event) {
  event.preventDefault();
  gameOver = false;
  $('.gameOver, .cont-button, .retry-button').remove();
}

function addTile(array) {
  var tile = $('<div class="tile" data-row="" data-col="" data-val="">');
  var randomRow = Math.floor(Math.random() * (rows.length));
  var randomCol = Math.floor(Math.random() * (cols.length));
  var randomValue = Math.floor(Math.random() * (array.length));

  tile.attr('data-row', rows[randomRow]);
  tile.attr('data-col', cols[randomCol]);
  tile.attr('data-val', array[randomValue]);
  tile.text(tile.attr('data-val'));

  if ($('[data-row=' + rows[randomRow] + '][data-col=' + cols[randomCol] + ']').length === 0) {

    $('#gameboard').append(tile);
    scaleIn(tile);
  } else {
    addTile(array);
  }
}

function updateValue(tile) {
  var added = tile.attr('data-val') * 2;
  tile.attr('data-val', added);
  tile.text(added);
  pop(tile);

  updateScore(added);
}

function updateScore(num) {
  score += num;
  $('.score').text(score);
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

// Sequentially collects all existing tiles from a column.
function generateCol(num) {
  var col = [];
  for (var i = 0; i < cols.length; i++) {
    var tile = $('[data-col=c' + num + '][data-row=r' + i + ']');
    if (tile.length > 0) { col.push(tile); }
  }

  return col;
}
