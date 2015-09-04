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

// This can be called with a specific row, column, and value for testing purposes
function generateTileForTestPurposes(r, c, value)
{
  var newTileTemplate = $("<div class='tile' data-row='', data-col='' data-val=''></div>");

  // Build new tile
  newTileTemplate.attr("data-row", 'r'+ r);
  newTileTemplate.attr("data-col", 'c'+ c);
  newTileTemplate.attr("data-val", value);
  newTileTemplate.text(value);
  return newTileTemplate;
}

function generateRandomBoard() {

  $("#gameboard").append(generateTileForTestPurposes(1, 0, 4));
  $("#gameboard").append(generateTileForTestPurposes(2, 0, 2));
  $("#gameboard").append(generateTileForTestPurposes(3, 0, 2));

  $("#gameboard").append(generateTileForTestPurposes(0, 1, 4));
  $("#gameboard").append(generateTileForTestPurposes(2, 1, 4));
  $("#gameboard").append(generateTileForTestPurposes(3, 1, 2));

  $("#gameboard").append(generateTileForTestPurposes(0, 2, 4));
  $("#gameboard").append(generateTileForTestPurposes(1, 2, 4));
  $("#gameboard").append(generateTileForTestPurposes(3, 2, 2));

  $("#gameboard").append(generateTileForTestPurposes(0, 3, 2));
  $("#gameboard").append(generateTileForTestPurposes(1, 3, 2));
  $("#gameboard").append(generateTileForTestPurposes(2, 3, 4));

  // $("#gameboard").append(generateRandomTile());
  // $("#gameboard").append(generateRandomTile());
}

function moveTile(tile, direction) {

  function noNeighborVert(tile, direction){
    var occupantRow = tile.getAttribute("data-row");
    var occupantRowNum = Number(occupantRow.replace("r", ""));  // 2

    // If up, go to the higher rows
    var neighborRow;
    if (direction == "up"){
      neighborRow = occupantRowNum - 1;
    // If down, go to the lower rows
    }
    else if (direction == "down") {
      neighborRow = occupantRowNum + 1;
    }

    var neighborCol = tile.getAttribute("data-col");
    var neighborCount = $("[data-row='r" + neighborRow + "'][data-col='" + neighborCol + "']").size();
    return neighborCount === 0;
  }

  function noNeighborSideways(tile, direction){

    var occupantCol = tile.getAttribute("data-col"); // c2
    var occupantColNum = Number(occupantCol.replace("c", ""));  // 2
    var neighborCol;
    if (direction == "left"){
      neighborCol = (occupantColNum - 1);
    } else if (direction == "right") {
      neighborCol = (occupantColNum + 1);
    }
    var neighborRow = tile.getAttribute("data-row");
    var neighborCount = $("[data-col='c" + neighborCol + "'][data-row='" + neighborRow + "']").size();
    return neighborCount === 0;
  }

  function noWallVert(tile, direction){

    if (direction == "up"){
      var topWall = "r0";
      return tile.getAttribute("data-row") != topWall;
    } else if (direction == "down") {
      var bottomWall = "r3";
      return tile.getAttribute("data-row") != bottomWall;
    }
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

  function mergeCheckVert(tile, direction){
    var occupantRow = tile.getAttribute("data-row");
    var occupantRowNum = Number(occupantRow.replace("r", ""));
    var occupantCol = tile.getAttribute("data-col");
    var occupantVal = tile.getAttribute("data-val");
    // Know which direction you're heading
    var neighborRowNum;
    if (direction == "up"){
      neighborRowNum = occupantRowNum - 1;
    } else if (direction == "down"){
      neighborRowNum = occupantRowNum + 1;
    }

    var neighborCol = occupantCol;
    var neighbor = $("[data-col='" + neighborCol + "'][data-row='r" + neighborRowNum + "']");
    var neighborVal = neighbor.attr("data-val");
    if (neighborVal == occupantVal) {
      return neighbor;
    }
  }

  function mergeTiles(tile, neighbor){
    var neighborValue = Number(neighbor.attr("data-val"));
    var newNeighborValue = neighborValue * 2;
    neighbor.attr("data-val", newNeighborValue);
    neighbor.text(newNeighborValue);

    // Mark the neighbor as already merged so it never gets merged
    // multiple times in the same turn
    neighbor.addClass("merged");

    // Remove the obsolete tile HTML
    tile.remove();

    // Add newNeighborValue to the score
    updateScore(newNeighborValue);
  }

  function updateScore(newNeighborValue){
    var currentScore = $("#score-number").text();
    var updatedScore = Number(currentScore) + Number(newNeighborValue);
    $("#score-number").text(updatedScore);
  }

  function addNewTile(){
    var newTile = generateRandomTile();
    if (newTile !== null) {
      $("#gameboard").append(newTile);
    }
  }

  function moveVert(direction) {
    // for each column
    for (var i = 0; i < 4; i++) {
      // collectOccupants -- Array of tiles
      var occupants = $("[data-col='c" + i + "']");

      // Tile iteration for up
      if (direction == "up"){
        var start = 0;
        var incrementor = 1;
        var condition = function (num) {
          return num < occupants.length;
        }
      // Tile iteration based on down
      } else if (direction == "down"){
        var start = occupants.length - 1;
        var incrementor = -1;
        var condition = function (num) {
          return num >= 0;
        }
      }

      // For each tile
      for (j = start; condition(j); j = j + incrementor) {

        var tile = occupants[j];

        // Check for a space directly in front of the current tile
        while (noWallVert(tile, direction) && noNeighborVert(tile, direction)){
          // There is a space, so move it forward by one space
            var currentPosition = tile.getAttribute("data-row");
            var positionNum = Number(currentPosition.replace("r",""));

            // Move the tiles vertically
            if (direction == "up"){
              tile.setAttribute("data-row", "r" + (positionNum - 1) );
            } else if (direction == "down") {
              tile.setAttribute("data-row", "r" + (positionNum + 1) );
            }
        }

        // Merge Check if there's a neighbor
        var neighbor = mergeCheckVert(tile, direction);
        if (neighbor) {
          // Only merge if neither tile has been merged already in this turn
          if (!$(tile).hasClass("merged") && !$(neighbor).hasClass("merged")) {
            mergeTiles(tile, neighbor);
          }
        }
      }
    }

    // Clear any merged class markings from this turn
    var mergedTiles = $('.merged');
    for (var i = 0; i < mergedTiles.length; i++)
    {
      $(mergedTiles[i]).removeClass("merged");
    }
  }

  function mergeCheckSideways(tile, direction){
    var occupantCol = tile.getAttribute("data-col");
    var occupantColNum = Number(occupantCol.replace("c", ""));
    var occupantRow = tile.getAttribute("data-row");
    var occupantVal = tile.getAttribute("data-val");
    // Know which direction you're heading
    var neighborColNum;
    if (direction == "left"){
      neighborColNum = occupantColNum - 1;
    } else if (direction == "right"){
      neighborColNum = occupantColNum + 1;
    }

    var neighborRow = occupantRow;
    var neighbor = $("[data-row='" + neighborRow + "'][data-col='c" + neighborColNum + "']");
    var neighborVal = neighbor.attr("data-val");
    if (neighborVal == occupantVal) {
      return neighbor;
    }
  }

  function moveSideways(direction){
    // for each row
    for (var i = 0; i < 4; i++) {
      // collectOccupants -- Array of tiles
      var occupants = $("[data-row='r" + i + "']");

      // Loop backwards so that sliding works and we don't leave gaps
      for (var j = occupants.length - 1; j >= 0; j--) {

        var tile = occupants[j];

        // Check for a space directly in front of the current tile
        while (noWallSideways(tile, direction) && noNeighborSideways(tile, direction)){
          // There is a space, so move it forward by one space
            var currentPosition = tile.getAttribute("data-col");
            var positionNum = Number(currentPosition.replace("c",""));

            // Move the tiles vertically
            if (direction == "left"){
              tile.setAttribute("data-col", "c" + (positionNum - 1) );
            } else if (direction == "right") {
              tile.setAttribute("data-col", "c" + (positionNum + 1) );
            }
        }

        // Merge Check if there's a neighbor
        var neighbor = mergeCheckSideways(tile, direction);
        if (neighbor) {
          // Only merge if neither tile has been merged already in this turn
          if (!$(tile).hasClass("merged") && !$(neighbor).hasClass("merged")) {
            mergeTiles(tile, neighbor);
          }
        }
      }
    }

    // Clear any merged class markings from this turn
    var mergedTiles = $('.merged');
    for (var i = 0; i < mergedTiles.length; i++)
    {
      $(mergedTiles[i]).removeClass("merged");
    }
  }

  switch(direction) {
    case 38: //up

      moveVert("up");

      addNewTile();

      break;
    case 40: //down

      moveVert("down");

      addNewTile();

      break;
    case 37: //left

      moveSideways("left");

      addNewTile();

      break;
    case 39: //right
      moveSideways("right");

      addNewTile();

      break;
  }
}
  function moveToVacancy(occupants, j){
    var tile = occupants[j];
    // Check for a space directly in front of the current tile
    while (noWallVert(tile, direction) && noNeighborVert(tile, direction)){
      // There is a space, so move it forward by one space
        var currentPosition = tile.getAttribute("data-row");
        var positionNum = Number(currentPosition.replace("r",""));

        // Move the tiles vertically
        if (direction == "up"){
          tile.setAttribute("data-row", "r" + (positionNum - 1) );
        } else if (direction == "down") {
          tile.setAttribute("data-row", "r" + (positionNum + 1) );
        }
    }
  }

  function merging(){
      // Merge Check if there's a neighbor
    var neighbor = mergeCheckVert(tile, direction);
    if (neighbor) {
      // Only merge if neither tile has been merged already in this turn
      if (!$(tile).hasClass("merged") && !$(neighbor).hasClass("merged")) {
        mergeTiles(tile, neighbor);
      }
    }
  }
