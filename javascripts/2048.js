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
  })
})

function generateRandomTile() {
  // Generate random tile position and value
  // For test purposes!
  // var randomRow = Math.floor(Math.random() * 2 - 0);
  // var randomCol = Math.floor(Math.random() * 2 - 0);
  // var newValArray = [2,2,2,2,2,2,2,2];

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

function tilesInSameLocation(existingTile, newTile){
  return existingTile.attr("data-row") === newTile.attr("data-row") && existingTile.attr("data-col") === newTile.attr("data-col");
  // removed last comparison because technically a 2 and 4 would return
  // false even if location was the same because they have two diff values.
}

function generateRandomBoard(){
  var tilesAdded = 0;
  var tilesNum = 2;

  while (tilesAdded < tilesNum){

    var newTile = generateRandomTile();
    // if on the sencond iteration of loops
    // needs to check for an existing placement of 1st tile
    // if tilesAdded===1 then check for existing
    // if no then add
    // if yes then choose new spot
    // save 1st tile to variable
    // do not allow append until new value is different than 1st

    var badTile = false;

    // If there's already a tile
    if (tilesAdded === 1){
      // Grab existing tile
      var existingTile = $(".tile").first();
      // Check if new tile and existing tile are the same
      badTile = tilesInSameLocation(existingTile, newTile);
      // console.log(tilesInSameLocation(existingTile, newTile));
    }

    // Insert new tile
    if (!badTile)
    {
      $("#gameboard").append(newTile);
      tilesAdded++;
    }
  }
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
    var neighborRow = (occupantRow.replace("r","") - 1);
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
      for (i = 0; i < 4; i++){

        // collectOccupants -- Array of tiles
        var occupants = $("[data-col='c" + i + "']");
        var sortedOccupants = occupants.sort(function(a, b) {
          return $(b).attr("data-row") - $(a).attr("data-row");
        });
          //for each tile

        // noNeighbor
          for (j = 0; j < occupants.length; j++){
            var tile = occupants[j];
            console.log(" noNeighbor: " + noNeighbor(tile));
            console.log(" noWall: " + noWall(tile));

            while (noWall(tile) && noNeighbor(tile)){

              // move forward
              var currentPosition = tile.getAttribute("data-row");
              var positionNum = currentPosition.replace("r","");
              tile.setAttribute("data-row", "r" + (positionNum - 1) );
            }
          }

            // checkWall

            // while checks return false
            // moveTile


      }
  // --- old code----------

      //   if (neighborCount === 0 && tile.attr("data-row") != "topWall"){

      //     // move forward one
      //   }
      // }



      // look for occupants that have a row value of neighborRow

      // shift "occupant(s)" in direction pressed if next tile is empty else


      // check next cell
      // move or stop

      // stop moving in that direction.


      // check for movement path for stacking, merging possibility

      // generate new tile after move completion

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
          for (j = 0; j < occupants.length; j++){
            var tile = occupants[j];

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
          for (j = 0; j < occupants.length; j++){
            var tile = occupants[j];

            console.log("No sideways wall: " + noWallSideways(tile, "right"));
            console.log("No Neighbor : " + noNeighborSideways(tile, "right"));

            // while (noWallSideways(tile, "right") && noNeighborSideways(tile, "right")){
            //
            //   // move right
            //   var currentPosition = tile.getAttribute("data-col");
            //   var positionNum = currentPosition.replace("c","");
            //   tile.setAttribute("data-col", "c" + (positionNum + 1) );
            // }
          }
        }

      break;
  }
}
