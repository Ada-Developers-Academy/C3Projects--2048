$(document).ready(function() {
  console.log('ready!');
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
  var type = rowOrColumn();
  var oppositeType = (type == "data-row") ? "data-col" : "data-row";
  // set the positive or negative according to direction
  var magnitude = parseInt(farthestValue());

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
    var magnitude = parseInt(farthestValue(direction));
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

  function mergeTiles() {
    var sortedTiles = orderTiles();

    function mergeableTile(tile) {
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

    for (var i = 0; i < sortedTiles.length; i++) {
      var neighbor = mergeableTile(sortedTiles[i]);
      // if neighbor exists, then double current tile's value and delete neighbor tile
      if (neighbor) {
        var currentVal = parseInt(sortedTiles[i].getAttribute("data-val"));
        sortedTiles[i].setAttribute("data-val", (currentVal * 2));
        sortedTiles[i].innerHTML = (currentVal * 2);
        var neighborIndex = sortedTiles.indexOf(neighbor);
        // so sorry
        sortedTiles = sortedTiles.splice(0,neighborIndex).concat(
           sortedTiles.splice(1, sortedTiles.length-1)
           );
        neighbor.remove();
      }
    }
  }

  function rowOrColumn() {
    var type = "";
    if (direction == 38 || direction == 40) {
      type = "data-row";
    } else if (direction == 37 || direction == 39) {
      type = "data-col";
    }

    return type;
  }

  function farthestValue() {
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

  function addTile() {
    var tile = $("<div data-row='' data-col='' data-val=''></div>");
    var dataVal = Math.random() < 0.04 ? 4 : 2;

    // figure out all empty spots
    // function to pick row and column number
    function pickLocation() {
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      var row = getRandomInt(1, 4);
      var col = getRandomInt(1, 4);

      var newLocationText = ".tile[data-row=\"" + row + "\"][data-col=\"" + col + "\"]";
      var newLocation = $(newLocationText);

    // while tile exists, keep reassigning new numbers
      while (newLocation.length > 0) {
        pickLocation();
      }

      return [row, col];
    }

    // var rowCol = pickLocation();

    tile.addClass("tile");
    tile.attr("data-row", 4);
    tile.attr("data-col", 4);
    tile.attr("data-val", dataVal);
    tile.text(dataVal);

    $("#gameboard").append(tile);
  }

  moveTiles();
  mergeTiles();
  moveTiles();
  addTile();
}
