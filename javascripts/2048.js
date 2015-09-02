$(document).ready(function() {
  console.log('ready!');
  // setupScoreboard();
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    var direction = event.which;
    if(arrow_keys.indexOf(direction) > -1) {
      makeTurn(direction);
      // moveTiles(direction);
      event.preventDefault();
    }
  })
})

function makeTurn(direction) {
  var tiles = $(".tile"); // in order by the html
  var type = rowOrColumn(direction);
  var oppositeType = (type == "data-row") ? "data-col" : "data-row";
  // set the positive or negative according to direction
  var magnitude = parseInt(getMagnitude(direction));
  var score = parseInt($("#score").attr("data-score"));

  var updateScore = function(points) {
    score += points;
    var scoreBoard = $("#score");
    scoreBoard.attr("data-score", score);
    scoreBoard.text(score);
  }

  function moveTiles() {
    var moveInDirection = makeMovement(direction);

    // order tiles correctly
    var sortedTiles = orderTiles();

    for (var i = 0; i < sortedTiles.length; i++) {
      moveInDirection(sortedTiles[i]);
    }
  }

  function orderTiles() {
    // check if movement is up/down (row) or right/left (col)
    // check if movement makes values get smaller (up/left) or bigger (down/right)
    var magnitude = parseInt(getMagnitude(direction));
    // store type of non-movement dimension

    // split into groups by type
    var typeA = [];
    var typeB = [];
    var typeC = [];
    var typeD = [];

    var upLeftOrder = [1, 2, 3, 4];
    var downRightOrder = [4, 3, 2, 1];

    var order = (direction == 38 || direction == 37) ? upLeftOrder : downRightOrder;

    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].getAttribute(type) == order[0]) {
        typeA.push(tiles[i]);
      } else if (tiles[i].getAttribute(type) == order[1]) {
        typeB.push(tiles[i]);
      } else if (tiles[i].getAttribute(type) == order[2]) {
        typeC.push(tiles[i]);
      } else if (tiles[i].getAttribute(type) == order[3]) {
        typeD.push(tiles[i]);
      }
    }

    var allTypes = [typeA, typeB, typeC, typeD];
    // sort each group
    for (var i = 0; i < allTypes.length; i++) {
      allTypes[i].sort(function(a, b) {
        var oppositeValueA = parseInt(a.getAttribute(oppositeType));
        var oppositeValueB = parseInt(b.getAttribute(oppositeType));
        return (magnitude == 1) ? oppositeValueA < oppositeValueB : oppositeValueA > oppositeValueB;
      })
    }
    // join each sorted group
    var sortedTiles = [];
    sortedTiles = sortedTiles.concat.apply(sortedTiles, allTypes);
    // return
    return sortedTiles;
  }

  function findMergeableTile(tile, type, magnitude) {
    var dataVal = tile.getAttribute("data-val");
    // look at opposite type value
    var typeValue = tile.getAttribute(type);
    var oppositeValue = tile.getAttribute(oppositeType);
    // find neighbor value ( if c1,r1 and moving up, neighbor is c1, r2)
    var neighborValue = parseInt(typeValue) - magnitude;
    // nasty block text stuff
    var neighborText = ".tile[" + type + "=\"" + neighborValue + "\"][" + oppositeType + "=\"" + oppositeValue + "\"]";
    // use block text to check if neighbor exists
    var neighbor = $(neighborText);

    if (neighbor.length > 0) {
      neighbor = neighbor[0];
      if (neighbor.getAttribute("data-val") == dataVal) {
        return neighbor;
      }
    } else {
      return null;
    }
  }

  function mergeTiles() {
    var sortedTiles = orderTiles();


    for (var i = 0; i < sortedTiles.length; i++) {
      var neighbor = findMergeableTile(sortedTiles[i], type, magnitude);
      // if neighbor exists, then double current tile's value and delete neighbor tile
      if (neighbor) {
        var currentVal = parseInt(sortedTiles[i].getAttribute("data-val"));
        var newVal = currentVal * 2;
        sortedTiles[i].setAttribute("data-val", (newVal));
        updateScore(newVal);
        sortedTiles[i].innerHTML = (newVal);
        var neighborIndex = sortedTiles.indexOf(neighbor);
        // so sorry
        sortedTiles = sortedTiles.splice(0,neighborIndex).concat(
           sortedTiles.splice(1, sortedTiles.length-1)
           );
        neighbor.remove();
        checkWin(newVal);
      }
    }
  }

  function rowOrColumn(direction) {
    var type = "";
    if (direction == 38 || direction == 40) {
      type = "data-row";
    } else if (direction == 37 || direction == 39) {
      type = "data-col";
    }

    return type;
  }

  function getMagnitude(direction) {
    var value = "";
    // if moving left or up
    if (direction == 37 || direction == 38) {
      value = "-1";
    // if moving down or right
    } else if (direction == 39 || direction == 40) {
      value = "1";
    }

    return value;
  }

  // outputs a function that takes a tile and moves it in a particular direction
  function makeMovement() {
    var moveTile = function(tile) {

      function okayToMove(tile) {
        var okay = true;
        var oppositeType = (type == "data-row") ? "data-col" : "data-row";
        var oppositeValue = tile.getAttribute(oppositeType);
        var blockerText = ".tile[" + type + "=\"" + newAttributeValue + "\"][" + oppositeType + "=\"" + oppositeValue + "\"]";
        var blocker = $(blockerText);


        if (blocker.length > 0) {
          okay = false;
        }
        return okay;
        // return true/false
      }

      // move the tile one space
      var relevantAttributeValue = tile.getAttribute(type);
      // console.log(relevantAttributeValue);
      var newAttributeValue = parseInt(relevantAttributeValue) + magnitude;

      // if already on the furthest edge, do not reassign value
      if (newAttributeValue > 4) {
        newAttributeValue = 4;
      } else if (newAttributeValue < 1) {
        newAttributeValue = 1;
      }

      if (okayToMove(tile)) {
        tile.setAttribute(type, newAttributeValue);
        moveTile(tile);
      }
      // if tile can't move, do nothing
    }
    return moveTile;
  }

  function collectEmptySpaces() {
    var emptySpaces = [];
    var row = null;
    var col = null;
    var tileLocation = null;
    // figure out all empty spots
    for (var i = 1; i < 5; i++) { // loop through rows
      row = i;
      for (var j = 1; j < 5; j++) { // loop through cols
        col = j;
        tileLocation = $(tileSelectorText(row, col));
        if (tileLocation.length == 0) {
          emptySpaces.push([row, col]);
        }
      }
    }
    return emptySpaces;
  }

  function tileSelectorText(row, col) {
    return ".tile[data-row=\"" + row + "\"][data-col=\"" + col + "\"]";
  }

  function addTile() {
    var tile = $("<div data-row='' data-col='' data-val=''></div>");
    var dataVal = Math.random() < 0.04 ? 4 : 2;
    var emptySpaces = collectEmptySpaces();

    // function to pick row and column number
    var randomLocation = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];

    tile.addClass("tile");
    tile.attr("data-row", randomLocation[0]);
    tile.attr("data-col", randomLocation[1]);
    tile.attr("data-val", dataVal);
    tile.text(dataVal);

    $("#gameboard").append(tile);
  }

  function checkWin(score) {
    var winningScore = 32;
    if (score == winningScore) {
      alert("Yay! You won!");
    }
  }

  function checkLoss() {
    // condition 1: board is completely full
    // -- just got new tile
    // condition 2: no merges possible
    // -- tries to merge

    // count empty spaces, if 0 continue
    var emptySpaces = collectEmptySpaces();
    var lost = true;
    if (emptySpaces.length == 0) {
      // for every tile
      // check merge in every direction
      var tiles = $(".tile");
      // NOTE MAYBE NEED TO SORT TILES??
      for (var i = 0; i < tiles.length; i++) { // loop through each tile
        if (lost == false) {
          break;
        } else {

          for (var j = 0; j < 4; j++) { // loop through each direction
            var directions = [38, 40, 37, 39];
            var type = rowOrColumn(directions[j]);
            var magnitude = getMagnitude(directions[j]);
            var mergeableTile = findMergeableTile(tiles[i], type, magnitude);
            if (mergeableTile) {
              // stop checking
              lost = false;
              break;
            }
          }
        }
      }

      if (lost == true) {
        alert("You have lost. Refresh to play again.");
      }
    }

  }

  moveTiles();
  mergeTiles(); // scoring happens here
  moveTiles();
  addTile();
  checkLoss();
}
