$(document).ready(function() {
  console.log('ready!');
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      // var tile = $('.tile');
      moveTile(event.which);
      addTile();
      event.preventDefault();
    }
  })
})

function moveTile(direction) {
  // if (tilesCollide(direction); == true) {
    // var new_tile_value = tile.attr("data-val") * 2;
    // tile.attr("data-val", new_tile_value);
    // tile.text(new_tile_value); // then also moves to next available position
  // } else {
    // they do not merge, they slide into the next available position
  // }
  var c0 = $("div[data-col='c0']");
  var col0 = $.makeArray(c0);
  var c1 = $("div[data-col='c1']");
  var col1 = $.makeArray(c1);
  var c2 = $("div[data-col='c2']");
  var col2 = $.makeArray(c2);
  var c3 = $("div[data-col='c3']");
  var col3 = $.makeArray(c3);

  var tile = col0.concat(col1, col2, col3);

  switch(direction) {
    case 38: //up
      // tile.attr("data-row","r0"); // unless a tile is there
      moveUp(tile);
      break;
    case 40: //down
      // tile.attr("data-row","r3");
      moveDown(tile);
      break;
    case 37: //left
      moveLeft(tile);
      // tile.attr("data-col","c0");
      break;
    case 39: //right
      moveRight(tile);
      // tile.attr("data-col","c3");
      break;
  }
}

function moveLeft(tile) {
  var row0 = [];
  var row1 = [];
  var row2 = [];
  var row3 = [];

  for (var i = 0; i < tile.length; i++) {
      if (tile[i].getAttribute("data-row") == "r0") {
        row0.push(tile[i]);
      } else if (tile[i].getAttribute("data-row") == "r1") {
        row1.push(tile[i]);
      } else if (tile[i].getAttribute("data-row") == "r2") {
        row2.push(tile[i]);
      } else if (tile[i].getAttribute("data-row") == "r3") {
        row3.push(tile[i]);
      }
    }

  var rows = [row0, row1, row2, row3];

  for (var i = 0; i < rows.length; i++) {
    moveRowLeft(rows[i]);
    collideTilesLeft(rows[i]);
    moveRowLeft(rows[i]);
  }
}

function collideTilesLeft(row){

  for (var i = 0; i < row.length - 1; i++) {
    var leftTileValue = row[i].getAttribute("data-val");
    var nextTileValue = row[i+1].getAttribute("data-val");
    if (leftTileValue == nextTileValue){
      var newTileValue = leftTileValue * 2; 
      row[i].setAttribute("data-val", newTileValue);
      row[i].textContent = newTileValue;
      row[i+1].remove();
    };
  } 
    
}


function moveRowLeft(row) {
  for(var i = 0; i < row.length; i++) {
    row[i].setAttribute("data-col", ("c" + i));
    }
}

function moveRight(tile) {
  var row0 = [];
  var row1 = [];
  var row2 = [];
  var row3 = [];

  for (var i = 0; i < tile.length; i++) {
      if (tile[i].getAttribute("data-row") == "r0") {
        row0.push(tile[i]);
      } else if (tile[i].getAttribute("data-row") == "r1") {
        row1.push(tile[i]);
      } else if (tile[i].getAttribute("data-row") == "r2") {
        row2.push(tile[i]);
      } else if (tile[i].getAttribute("data-row") == "r3") {
        row3.push(tile[i]);
      }
    }

  var rows = [row0, row1, row2, row3];

  for (var i = 0; i < rows.length; i++) {
    moveRowRight(rows[i]);
  }
}

function moveRowRight(row) {
  for(var i = 0; i < row.length; i++) {
    row[i].setAttribute("data-col", ("c" + (i + 4 - row.length)));
  }
}

function moveUp(tile) {
  var col0 = [];
  var col1 = [];
  var col2 = [];
  var col3 = [];

  for (var i = 0; i < tile.length; i++) {
      if (tile[i].getAttribute("data-col") == "c0") {
        col0.push(tile[i]);
      } else if (tile[i].getAttribute("data-col") == "c1") {
        col1.push(tile[i]);
      } else if (tile[i].getAttribute("data-col") == "c2") {
        col2.push(tile[i]);
      } else if (tile[i].getAttribute("data-col") == "c3") {
        col3.push(tile[i]);
      }
    }

  var cols = [col0, col1, col2, col3];

  for (var i = 0; i < cols.length; i++) {
    moveColUp(cols[i]);
  }
}

function moveColUp(col) {
  for(var i = 0; i < col.length; i++) {
    col[i].setAttribute("data-row", ("r" + i));
    }
}

function moveDown(tile){

  var col0 = [];
  var col1 = [];
  var col2 = [];
  var col3 = [];

  for (var i = 0; i < tile.length; i++) {
    if (tile[i].getAttribute("data-col") == "c0") {
      col0.push(tile[i]);
    } else if (tile[i].getAttribute("data-col") == "c1") {
      col1.push(tile[i]);
    } else if (tile[i].getAttribute("data-col") == "c2") {
      col2.push(tile[i]);
    } else if (tile[i].getAttribute("data-col") == "c3") {
      col3.push(tile[i]);
    }
  }

  var cols = [col0, col1, col2, col3];

  for (var i = 0; i < cols.length; i++) {
    moveColDown(cols[i]);
  }
}

function moveColDown(col) {
  for(var i = 0; i < col.length; i++) {
    col[i].setAttribute("data-row",("r" + (i + 4 - col.length)));
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

function playTurn() {
  if ($("#gameboard .tile").length == 0) {
    gameStart();
  } else {
    gameWon();
    gameLost();

  }
}

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
// //   face value
//           a direction is chosen 
//           tiles data-val is looked at
//           if adjacent tiles have identical data-val
//             farthest tile data *2
//             tile next to it deletes 
//             * nice to have - deletes by sliding behind the farthest tile
//             (visual animation)
//             any tiles behind deleted tile, slide one position in direction chosen
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
