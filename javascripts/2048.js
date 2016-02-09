var rows = ['0', '1', '2', '3'];
var cols = ['0', '1', '2', '3'];
var boardSize = rows.length * cols.length;
var newTileValue = [ 2, 2, 2, 2, 4 ];
var score = 0;
var priorWin = false;
var gameOver = false;

// win var is currently set to win at 64 for testing! Change to 2048 for true win.
var winningTileValue = '2048';

$(document).ready(function() {
  initializeGame();
  $('body').keydown(playTurn);
  $('.retry-button').click(retryClickHandler);
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

    var collection = new TileCollection(event.which);
    collection.move();

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

function addTile(possible_values) {
  var tile = $('<div class="tile" data-row="" data-col="" data-val="">');
  var randomRow = function() { return Math.floor(Math.random() * (rows.length)); }();
  var randomCol = function() { return Math.floor(Math.random() * (cols.length)); }();
  var randomValue = function() {
    return Math.floor(Math.random() * (possible_values.length));
    }();

  tile.attr('data-row', rows[randomRow]);
  tile.attr('data-col', cols[randomCol]);
  tile.attr('data-val', possible_values[randomValue]);
  tile.text(tile.attr('data-val'));

  if ($('[data-row=' + rows[randomRow] + '][data-col=' + cols[randomCol] + ']').length === 0) {

    $('#gameboard').append(tile);
    scaleIn(tile);
  } else {
    addTile(possible_values);
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
  animateAddedValue(num);
}

// Sequentially collects all existing tiles from a row.
function generateRow(num) {
  var row = [];
  for (var i = 0; i < rows.length; i++) {
    var tile = $('[data-row=' + num + '][data-col=' + i + ']');
    if (tile.length > 0) { row.push(tile); }
  }

  return row;
}

// Sequentially collects all existing tiles from a column.
function generateCol(num) {
  var col = [];
  for (var i = 0; i < cols.length; i++) {
    var tile = $('[data-col=' + num + '][data-row=' + i + ']');
    if (tile.length > 0) { col.push(tile); }
  }

  return col;
}
