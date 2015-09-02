$(document).ready(function() {
  console.log('ready!');
  generateRandomBoard();

  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, event.which);
      event.preventDefault();
    }
  });
});

function generateTileTemplate() {
  // Generate random tile position and value
  // For test purposes!
  // var randomRow = Math.floor(Math.random() * 2 - 0);
  // var randomCol = Math.floor(Math.random() * 2 - 0);
  // var newValArray = [2,2,2,2,2,2,2,2];
  console.log("tile template generated");
  var randomRow = Math.floor(Math.random() * 4 - 0);
  var randomCol = Math.floor(Math.random() * 4 - 0);
  var newValArray = [2,2,2,2,2,2,2,2,4,4];
  var randomValue = newValArray[Math.floor(Math.random() * newValArray.length)];
  var newTileTemplate = $("<div class='tile' data-row='', data-col='' data-val=''></div>");

  // Build new tile
  newTileTemplate.attr("data-row", 'r'+ randomRow);
  newTileTemplate.attr("data-col", 'c'+ randomCol);
  newTileTemplate.attr("data-val", randomValue);
  newTileTemplate.text(randomValue);
  return newTileTemplate;
}

function generateRandomTile() {

    // Grab all existing tiles
    var existingTiles = $(".tile");

    // We can only generate a valid new tile if the board isn't full
    while (existingTiles.length < 16) {

      var badTile = false;
      var newTile = generateTileTemplate();

      // Loop through all existing tiles and make sure none of them are in
      // the spot of the new tile
      var i = 0;
      while (!badTile && i < existingTiles.length)
      {
        // Check if new tile and existing tile are the same
        badTile = tilesInSameLocation(existingTiles[i], newTile);
        // console.log(tilesInSameLocation(existingTile, newTile));
        i++;
      }

      if (!badTile)
      {
        return newTile;
      }
    }

    // There are no more empty spaces on the board
    console.log("The board is full!");
    return null;
}

function tilesInSameLocation(existingTile, newTile){
  return existingTile.getAttribute("data-row") === newTile.attr("data-row") && existingTile.getAttribute("data-col") === newTile.attr("data-col");
  // removed last comparison because technically a 2 and 4 would return
  // false even if location was the same because they have two diff values.
}

function generateRandomBoard() {
  $("#gameboard").append(generateRandomTile());
  $("#gameboard").append(generateRandomTile());
}

function moveTile(tile, direction) {
  var new_tile_value = tile.attr("data-val");
  tile.attr("data-val", new_tile_value);
  // tile.text(new_tile_value);

  // checkForVacancies -- if this returns false, move to the next column
  function anyVacancies(columnNum) {
    var occupants = $("[data-col='c" + columnNum + "']").size();
    var vacancies = (4 - occupants);
    return vacancies > 0;
  }

  function noNeighbor(tile){
    var occupantRow = tile.getAttribute("data-row");
    var occupantRowNum = Number(occupantRow.replace("r", ""));  // 2
    var neighborRow = occupantRowNum - 1;
    var neighborCol = tile.getAttribute("data-col");
    var neighborCount = $("[data-row='r" + neighborRow + "'][data-col='" + neighborCol + "']").size();
    return neighborCount === 0;
  }

function noNeighborSideways(tile, direction){

  var occupantCol = tile.getAttribute("data-col"); // c2
  var occupantColNum = Number(occupantCol.replace("c", ""))  // 2
  if (direction == "left"){
    var neighborCol = (occupantColNum - 1);
  } else if (direction == "right") {
    var neighborCol = (occupantColNum + 1);
  }
  var neighborRow = tile.getAttribute("data-row");
  var neighborCount = $("[data-col='c" + neighborCol + "'][data-row='" + neighborRow + "']").size();
  return neighborCount === 0;
  }


  function noWall(tile){
    var topWall = "r0";
    return tile.getAttribute("data-row") != topWall;
  }

  function noWallSideways(tile, direction){

    if (direction == "left"){
      var leftWall = "c0";
      return tile.getAttribute("data-col") != leftWall;
    } else if (direction == "right") {
      var rightWall = "c3";
      return tile.getAttribute("data-col") != rightWall;
    }
  }

  switch(direction) {
    case 38: //up

      // for each column
      for (i = 0; i < 4; i++) {

        // collectOccupants -- Array of tiles
        var occupants = $("[data-col='c" + i + "']");
        var sortedOccupants = occupants.sort(function(a, b) {
           return $(a).attr("data-row").replace("r","") - $(b).attr("data-row").replace("r","");
          // return $(a).attr("data-row") - $(b).attr("data-row");
        });
        console.log(sortedOccupants);
        //for each tile

        // noNeighbor
        for (j = 0; j < sortedOccupants.length; j++) {
          var tile = sortedOccupants[j];
          console.log(tile.getAttribute("data-row"));
          console.log(" noNeighbor: " + noNeighbor(tile));
          console.log(" noWall: " + noWall(tile));

          while (noWall(tile) && noNeighbor(tile)){

            // move forward
            var currentPosition = tile.getAttribute("data-row");
            var positionNum = Number(currentPosition.replace("r",""));
            // THIS IS THE LINE that does the up (row - 1)
            // Down is row + 1, left is col - 1, right is col + 1
            tile.setAttribute("data-row", "r" + (positionNum - 1) );
          }
        }
      }

      // generate new tile after move completion
      // if the board is full, newTile will be null and we don't try
      // to append anything
      var newTile = generateRandomTile();
      if (newTile !== null) {
        $("#gameboard").append(newTile);
      }

      // --- old code----------

      // check for movement path for stacking, merging possibility

      break;
    case 40: //down
      tile.attr("data-row","r3");
      break;
    case 37: //left

      // For each row
      for (i = 0; i < 4; i++){

        // collect all occupants
        var occupants = $("[data-row='r" + i + "']");
        var sortedOccupants = occupants.sort(function(a, b) {
          return $(b).attr("data-col") - $(a).attr("data-col");
        });
          //for each tile

        // noNeighbor
          for (j = 0; j < sortedOccupants.length; j++){
            var tile = sortedOccupants[j];

            while (noWallSideways(tile, "left") && noNeighborSideways(tile, "left")){

              // move left
              var currentPosition = tile.getAttribute("data-col");
              var positionNum = currentPosition.replace("c","");
              tile.setAttribute("data-col", "c" + (positionNum - 1) );
            }
          }
        }

      break;
    case 39: //right

      // For each row
      for (i = 0; i < 4; i++){

        // collect all occupants
        var occupants = $("[data-row='r" + i + "']");
        var sortedOccupants = occupants.sort(function(a, b) {
          return $(b).attr("data-col") - $(a).attr("data-col");
        });
          //for each tile

        // noNeighbor
          for (j = 0; j < sortedOccupants.length; j++){
            var tile = sortedOccupants[j];

            while (noWallSideways(tile, "right") && noNeighborSideways(tile, "right")){

              // move right
              var currentPosition = tile.getAttribute("data-col");
              var positionNum = Number(currentPosition.replace("c",""));
              tile.setAttribute("data-col", "c" + (positionNum + 1) );
            }
          }
        }

      break;
  }
}
