$(document).ready(function() {
  console.log('ready!');
  initializeBoard();
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      moveTile(event.which);
      event.preventDefault();
    }
  })
})

var board     = [];
var boardSize = 4;

// sets up 2D array
function initializeBoard() {
  for(var i = 0; i < boardSize; i++) {
    innerBoard = [];
    board.push(innerBoard);

    for(var j = 0; j < boardSize; j++) {
      board[i][j] = 0;
      }
    }
    assignRandoTiles();
    assignRandoTiles();
    displayBoard();
  }

  function assignRandoTiles() {
    var y = Math.floor(Math.random() * (boardSize));
    var x = Math.floor(Math.random() * (boardSize));
    if(board[y][x] == 0) {
      var rando = Math.random();
      if(rando < .75) {
        board[y][x] = 2;
      }
      else{
        board[y][x] = 4;
      }
    }
    else {
      assignRandoTiles();
      // this will run endlessly when the board is full -- write a conditional for that
    }
  }

  function displayBoard() {
    for(var y = 0; y < boardSize; y++) {
      for(var x = 0; x < boardSize; x++) {
        var cell = $(".tile[data-row=y" + y + "][data-col=x" + x);
        cell.attr("data-val", board[y][x]);
        cell.text(board[y][x]);
      }
    }
  }


function moveTile(direction) {
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
  displayBoard();
}

function moveUp() {
  var starterBoard = board.toString();
  setupTempBoard("up");
  // traversal starting point = y3, x0
  for(y = 3; y >= 0; y--) {
    for(x = 0; x < boardSize; x++) {
      var next = checkNext(y, x, "up");
      if(next == board[y][x]) {
        board[y][x]    += board[y - 1][x]; // collapse it
        board[y - 1][x] = 0;
      }
    }
  }

  if (board.toString() != starterBoard){
    assignRandoTiles();
  }
}

function moveDown () {
  starterBoard = board.toString();
  setupTempBoard("down");
  // traversal starting point = y0, x0
  for(y = 0; y < boardSize; y++) {
    for(x = 0; x < boardSize; x++) {
      var next = checkNext(y, x, "down");
      if(next == board[y][x]) {
        board[y][x]    += board[y + 1][x]; // collapse it
        board[y + 1][x] = 0;
      }
    }
  }
  if (board.toString() != starterBoard){
    assignRandoTiles();
  }
}

function moveLeft() {
  // traversal starting point = y0, x3
  starterBoard = board.toString();
  // traversal starting point = y3, x0
  for(y = 0; y < boardSize; y++) {
    for(x = 3; x >= 0; x--) {
      // check if blank
      if (board[y][x] != 0) {
        // do something
        var next = checkNext(y, x, "left");
        if (next == 0) {
          // move it
          board[y][x - 1] = board[y][x];
          board[y][x]     = 0;
        }
        else if (next == board[y][x]) {
          // collapse it
          board[y][x - 1] += board[y][x];
          board[y][x]       = 0;
        }
        else {
          // do nothing probably dont need this. we'll see
        }
      }
      else {
      }
    }
  }
  if (board.toString() != starterBoard){
    assignRandoTiles();
  }
}

function moveRight() {
  // traversal starting point = y0, x0
  starterBoard = board.toString();
  for(y = 0; y < boardSize; y++) {
    for(x = 0; x < boardSize; x++) {
      // check if blank
      if (board[y][x] != 0) {
        // do something
        var next = checkNext(y, x, "right");
        if (next == 0) {
          // move it
          board[y][x + 1] = board[y][x];
          board[y][x]     = 0;
        }
        else if (next == board[y][x]) {
          // collapse it
          board[y][x + 1] += board[y][x];
          board[y][x]      = 0;
        }
        else {
          // do nothing probably dont need this. we'll see
        }
      }
      else {
      }
    }
  }
  if (board.toString() != starterBoard){
    assignRandoTiles();
  }
}

function setupTempBoard(direction){
  var newBoard = [];
  if(direction == "up"){
    for(x = 0; x < boardSize; x++){
      array = [];
      for( y = 3; y >= 0 ; y--){
        array.push(board[y][x]);
      }
      var tempColumn = removeZero(array);
      while(tempColumn.length <= boardSize - 1) {
        tempColumn.push(0);
      }
      newBoard.push(tempColumn);
    }
    console.log(newBoard);
  }

  else if(direction == "down"){
    for(x = 0; x < boardSize; x++) {
      array = [];
      for(y = 0; y < boardSize; y++) {
        array.push(board[y][x]);
      }
      var tempColumn = removeZero(array);
      while(tempColumn.length <= boardSize - 1) {
        tempColumn.unshift(0);
      }
      newBoard.push(tempColumn);
    }
    console.log(newBoard);
  }
  replaceBoard(newBoard, direction);
}

 function removeZero(arr){
    for(var i=arr.length - 1; i >= 0; i-- ) {
      if(arr[i] === 0) {
          arr.splice(i,1);
      }
    }
    return arr;
  }

  function replaceBoard(array, direction) {
    if(direction == "up"){
      for(x = 0; x < boardSize; x++) {
        var tempY = 0;
        for(y = 3; y >= 0; y--) {
          board[y][x] = array[x][tempY];
          tempY += 1;
        }
      }
    }
    if(direction == "down"){
      for(x = 0; x < boardSize; x++) {
        var tempY = 3;
        for(y = 0; y < boardSize; y++) {
          board[y][x] = array[x][tempY];
          tempY -= 1;
        }
      }
    }
    console.log(board.toString());
    return board;
  }

function checkNext(y, x, direction) {
  // this is for up condition
  if(direction == "up"){
    if(y - 1 >= 0) {
    return board[y - 1][x];
    }
    else {
      return null;
    }
  }
  else if(direction == "down"){
    if(y + 1 < boardSize) {
      return board[y + 1][x];
    }
    else {
      return null;
    }
  }
  else if(direction == "left") {
    if(x - 1 >= 0) {
      return board[y][x - 1];
    }
    else {
      return null;
    }
  }
  else if(direction == "right") {
    if(x + 1 <= 3) {
      return board[y][x + 1];
    }
    else {
      return null;
    }
  }
}
