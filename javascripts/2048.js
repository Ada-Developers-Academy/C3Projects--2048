$(document).ready(function() {
  console.log('ready!');
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    var direction = event.which;
    if(arrow_keys.indexOf(direction) > -1) {
      moveTiles(direction);
      event.preventDefault();
    }
  })
})

function moveTiles(direction) {
  var moveInDirection = makeMovement(direction);
  var tiles = $(".tile"); // in order by the html

  // order tiles correctly
  function orderTiles() {
    // check if movement is up/down (row) or right/left (col)
    var type = rowOrColumn(direction);
    // check if movement makes values get smaller (up/left) or bigger (down/right)
    var magnitude = parseInt(farthestValue(direction));
    // store type of non-movement dimension
    var oppositeType = (type == "data-row") ? "data-col" : "data-row";

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

  var sortedTiles = orderTiles();

  for (var i = 0; i < sortedTiles.length; i++) {
    moveInDirection(sortedTiles[i]);
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

function farthestValue(direction) {
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
function makeMovement(direction) {
  var moveTile = function(tile) {
    // set the positive or negative according to direction
    var magnitude = parseInt(farthestValue(direction));

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

    // set row or column (type)
    var type = rowOrColumn(direction);

    // move the tile one space
    var relevantAttributeValue = tile.getAttribute(type);
    // console.log(relevantAttributeValue);
    var newAttributeValue = parseInt(relevantAttributeValue) + magnitude;

    if (newAttributeValue > 4) {
      newAttributeValue = 4;
    } else if (newAttributeValue < 1) {
      newAttributeValue = 1;
    }

    if (okayToMove(tile)) {
      tile.setAttribute(type, newAttributeValue);
    }
    // if tile can't move, do nothing
  }
  return moveTile;
}

// NOTE do elsewhere!! check if tile can move
