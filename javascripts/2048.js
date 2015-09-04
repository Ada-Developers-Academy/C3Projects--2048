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
var newTile  = [];
var score = 0;

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
      newTile = [y,x];
      var rando = Math.random();
      if(rando < .9) {
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
        if(board[y][x] == 0){
          cell.text("");
        }
        else {
          cell.text(board[y][x]);
        }
        if(y == newTile[0] && x == newTile[1]){
          cell.addClass("popper");
          cell.one("animationend", function(e) {
            $(this).removeClass("popper");
          });
        }
      }
    }
    newTile = [];
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
      if(board[y][x] == 0 && next != null) {
        board[y][x]     = board[y - 1][x];
        board[y - 1][x] = 0;
      }
      else if(next == board[y][x]) {
        board[y][x]    += board[y - 1][x]; // collapse it
        score += board[y][x];
        // populateScore(score);
        board[y - 1][x] = 0;
      }
    }
  }
  var endGame = checkEndGame();
  displayGameResult(endGame);

  if (board.toString() != starterBoard) {
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
      if(board[y][x] == 0 && next != null) {
        board[y][x]     = board[y + 1][x];
        board[y + 1][x] = 0;
      }
      else if(next == board[y][x]) {
        board[y][x]    += board[y + 1][x]; // collapse it
        score += board[y][x];
        board[y + 1][x] = 0;
      }
    }
  }
  var endGame = checkEndGame();
  displayGameResult(endGame);

  if (board.toString() != starterBoard) {
    assignRandoTiles();
  }
}

function moveLeft() {
  starterBoard = board.toString();
  setupTempBoard("left");
  // traversal starting point = y0, x3
  for(x = 0; x < boardSize; x++) {
    for(y = 0; y < boardSize; y++) {
      var next = checkNext(y, x, "left");
      if(board[y][x] == 0 && next != null) {
        board[y][x]     = board[y][x + 1];
        board[y][x + 1] = 0;
      }
      else if(next == board[y][x]) {
        board[y][x]    += board[y][x + 1]; // collapse it
        score += board[y][x];
        board[y][x + 1] = 0;
      }
    }
  }
  var endGame = checkEndGame();
  displayGameResult(endGame);

  if (board.toString() != starterBoard) {
    assignRandoTiles();
  }
}

function moveRight() {
  starterBoard = board.toString();
  setupTempBoard("right");
  // traversal starting point = y0, x3
  for(x = 3; x >= 0; x--) {
    for(y = 0; y < boardSize; y++) {
      var next = checkNext(y, x, "right");
      if(board[y][x] == 0 && next != null) {
        board[y][x]     = board[y][x - 1];
        board[y][x - 1] = 0;
      }
      else if(next == board[y][x]) {
        board[y][x]    += board[y][x - 1]; // collapse it
        score += board[y][x];
        board[y][x - 1] = 0;
      }
    }
  }
  var endGame = checkEndGame();
  displayGameResult(endGame);

  if (board.toString() != starterBoard) {
    assignRandoTiles();
  }
}

function setupTempBoard(direction) {
  var newBoard = [];
  if(direction == "up") {
    for(x = 0; x < boardSize; x++) {
      array = [];
      for(y = 3; y >= 0 ; y--){
        array.push(board[y][x]);
      }
      var tempColumn = removeZero(array);
      while(tempColumn.length <= boardSize - 1) {
        tempColumn.push(0);
      }
      newBoard.push(tempColumn);
    }
  }

  else if(direction == "down") {
    for(x = 0; x < boardSize; x++) {
      array = [];
      for(y = 3; y >= 0; y--) {
        array.push(board[y][x]);
      }
      var tempColumn = removeZero(array);
      while(tempColumn.length <= boardSize - 1) {
        tempColumn.unshift(0);
      }
      newBoard.push(tempColumn);
    }
  }

  else if(direction == "left"){
    for(y = 0; y < boardSize; y++) {
      array = [];
      for(x = 0; x < boardSize; x++) {
        array.push(board[y][x]);
      }
      var tempRow = removeZero(array);
      while(tempRow.length < boardSize) {
        tempRow.push(0);
      }
      newBoard.push(tempRow);
    }
  }

  else if(direction == "right"){
    for(y = 0; y < boardSize; y++) {
      array = [];
      for(x = 0; x < boardSize; x++) {
        array.push(board[y][x]);
      }
      var tempRow = removeZero(array);
      while(tempRow.length < boardSize) {
        tempRow.unshift(0);
      }
      newBoard.push(tempRow);
    }
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
    if(direction == "left"){
      for(y = 0; y < boardSize; y++) {
        for(x = 0; x < boardSize; x++) {
          board[y][x] = array[y][x];
        }
      }
    }
    if(direction == "right"){
      for(y = 0; y < boardSize; y++) {
        for(x = 3; x >= 0; x--) {
          board[y][x] = array[y][x];
        }
      }
    }
    return board;
  }

function checkNext(y, x, direction) {
  switch(direction){
    case "up":
      if(y - 1 >= 0) {
        return board[y - 1][x];
      }
      else {
        return null;
      }
    case "down":
      if(y + 1 < boardSize) {
        return board[y + 1][x];
      }
      else {
        return null;
      }
    case "left":
      if(x + 1 <= 3) {
        return board[y][x + 1];
      }
      else {
        return null;
      }

    case "right":
      if(x - 1 >= 0) {
        return board[y][x - 1];
      }
      else {
        return null;
      }
  }
}

function populateScore(score){
  var scoreDiv = $('.score');
  scoreDiv.text(score);
}

function checkEndGame(){
  var directions = ["up", "down", "left", "right"];
  for(y = 0; y < boardSize; y++){
    for(x = 0; x < boardSize; x++){
      if(board[y][x] == 2048){
        var result = 2048; // game is over and you win
        return result;
      }
      for(i = 0; i < directions.length; i++){
        var next = checkNext(y, x, directions[i]);
        if(next == board[y][x] || next == 0){
          var result = false; // game is not over
          return result;
        }
        else {
          var result = true; // game is over and you lose
        }
      }
    }
  }
  return result;
}

function displayGameResult(endGameResult) {
  var gameResult = $(".game_result");
  if(endGameResult == false){
    populateScore(score);
  }
  else if (endGameResult == 2048) {
    gameResult.addClass("win");
    gameResult.text("YOU HIT 2048!");
  }
  else {
    gameResult.addClass("results_container");
    $(".default").addClass("result_text");
    $(".default").text("You lose.");
  }
}
