$(document).ready(function() {
  console.log('ready!');
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, event.which);
      addTile();
      event.preventDefault();
    }
  })
})

function moveTile(tile, direction) {
  // if (tilesCollide(direction); == true) {
    var new_tile_value = tile.attr("data-val") * 2;
    tile.attr("data-val", new_tile_value);
    tile.text(new_tile_value); // then also moves to next available position
  // } else {
    // they do not merge, they slide into the next available position
  // }

  switch(direction) {
    case 38: //up
      tile.attr("data-row","r0"); // unless a tile is there
      break;
    case 40: //down
      tile.attr("data-row","r3");
      break;
    case 37: //left
      moveLeft();
      // tile.attr("data-col","c0");
      break;
    case 39: //right
      tile.attr("data-col","c3");
      break;
  }
}

function moveLeft() {
  var row0 = [];
  var row1 = [];
  var row2 = [];
  var row3 = [];

  var tiles = $(".tile");
  for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].getAttribute("data-row") == "r0") {
        // var tileCol = tiles[i].getAttribute("data-col");
        // tileCol = tileCol.substr(1);
        row0.push(tiles[i]);
        // put into row0 array in the position of the col
      } else if (tiles[i].getAttribute("data-row") == "r1") {
        row1.push(tiles[i]);
      } else if (tiles[i].getAttribute("data-row") == "r2") {
        row2.push(tiles[i]);
      } else if (tiles[i].getAttribute("data-row") == "r3") {
        row3.push(tiles[i]);
      }
    }
    
  for(var i = 0; i < 5; i++) {
      row0[i] = $(".tile").attr("[data-row=r" + 0 + "][data-col=c" + i + "]");   
      row1[i] = $(".tile").attr("[data-row=r" + 1 + "][data-col=c" + i + "]");
      row2[i] = $(".tile").attr("[data-row=r" + 2 + "][data-col=c" + i + "]");
      row3[i] = $(".tile").attr("[data-row=r" + 3 + "][data-col=c" + i + "]");
  }
}

function tilesCollide(direction) {

}

function gameLost(){
  var gameLost = false;

  if (($("#gameboard .tile").length == 16) ) {  // && (no collisions possible)
    var gameLost = true;
  }

 return gameLost;
}

function gameWon(){
  var gameWon = false;

  var gameBoard = $("#gameboard .tile")
  for (var i = 0; i < gameBoard; i++){  // loop through all the tiles, check value
     if (gameBoard[i].attr("data-val") >= 2048) {    // if tile with value "2048", gameWon true
        gameWon = true;
      }
    }
  if (gameWon == true) {
    // $('body').keydown(function(event){
    //   var arrow_keys = [37, 38, 39, 40];
    //   if(arrow_keys.indexOf(event.which) > -1) {
    //     $("body").fadeOut("slow");
    //     event.preventDefault();
    //   }
    // });
  }
}

function freeSpot() {
 var freeSpots = [];
 for (var row = 0; row < 4; row++) {
   for (var col = 0; col < 4; col++) {
     var reference = ".tile[data-row=r" + row + "][data-col=c" + col + "]";
     // => .tile[data-row=r0][data-col=c0] => occupied
     var unoccupied = $(reference).length == 0;
     if(unoccupied)
       freeSpots.push({ row: row, col: col });
   }
 }

 return freeSpots[Math.floor( Math.random() * freeSpots.length )]; // => returns hash
}

function addTile(){
  var newSpot = freeSpot();
  var newDiv = document.createElement("div");
  var newClass = document.createAttribute("class");
  newClass.value = "tile";
  newDiv.setAttributeNode(newClass);
  var dataRow = document.createAttribute("data-row");
  dataRow.value = "r" + newSpot["row"];
  newDiv.setAttributeNode(dataRow);
  var dataCol = document.createAttribute("data-col");
  dataCol.value = "c" + newSpot["col"];
  newDiv.setAttributeNode(dataCol);
  var dataVal = document.createAttribute("data-val");

  var randomValArray = [2, 2, 2, 4]
  var randomVal = randomValArray[Math.floor(Math.random() * randomValArray.length)];
  dataVal.value = randomVal;
  newDiv.setAttributeNode(dataVal);
  newDiv.textContent = randomVal;
  $("#gameboard").append(newDiv); // adds tile to gameboard

}

function gameStart() {
  addTile();
  addTile();
}

// function playTurn() {
//   if ($("#gameboard .tile").length == 0) {
//     gameStart();
//   } else {
//     gameWon();
//     gameLost();
//
//   }
// }

// pseudo:
// when game starts: two random tiles populate board
// is game over?
//   true or false
//   (like battleship -> start in false)
//   game over:
//     lose:any empty spaces && no possible collisions?
//     win:tile value "2048"
// click event (arrow_keys)
//   movetile function happens
//   collisions result in new tile with increased
//   face value
//     if tile adjacent in direction of arrow is identical
//     in face value to the one next to it, the farthest tile is replaced with new tile
//      -> double face value
//     any additional tiles behind that merge shift one position in same direction
//   new value from collision of tile in farthest most position
// score updated to reflect any/all collisions (+=)
// new random tile enters the board
//   check for empty spaces
//   randomly select value of 2 or 4 to random tile
//   place random tile in random empty spot
// start over - is game over?
