$(document).ready(function() {
  console.log('ready!');
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];
    if(arrow_keys.indexOf(event.which) > -1) {
      var tile = $('.tile');
      moveTile(tile, event.which);
      event.preventDefault();
    }
  })
})

function moveTile(tile, direction) {
  var new_tile_value = tile.attr("data-val") * 2;
  tile.attr("data-val", new_tile_value);
  tile.text(new_tile_value);

  switch(direction) {
    case 38: //up
      tile.attr("data-row","r0");
      break;
    case 40: //down
      tile.attr("data-row","r3");
      break;
    case 37: //left
      tile.attr("data-col","c0");
      break;
    case 39: //right
      tile.attr("data-col","c3");
      break;
  }
}

function game_Lost(){
  var gameLost = false

  if $("#gameboard .tile").length == 16 
    var gameLost = true 
  // && else if no collisions possible  
    var gameLost = true
  end  
      
 return gameLost 
}

function game_Won(){
  var gameWon = false
  // pseudo : loop through all the tiles, check value.
  // if tile with value "2048", gameWon true

  var gameBoard = $("#gameboard .tile")
  for (var i = 0; i < gameBoard; i++){
     if gameBoard[i].attr("data-val") >= 2048
        gameWon = true  
      }

return gameWon

}

function freeSpot() {
 var freeSpots = [];
 for (var row = 0; row < 4; row++) {
   for (var col = 0; col < 4; col++) {
     var reference = ".tile[data-row=r" + row + "][data-col=c" + col + "]";
     // => .tile[data-row=r0][data-col=c0]
     var unoccupied = $(reference).length == 0;
     if(unoccupied)
       freeSpots.push({ row: row, col: col });
   }
 }

 return freeSpots[Math.floor( Math.random() * freeSpots.length )];
}

function add_tile(){
  var newTileHere = pick freeSpot()
  var newTileHere = 
  var tile = make tile(here)
  insert_tile()

}

pseudo:
when game starts: two random tiles populate board
is game over?
  true or false
  (like battleship -> start in false)
  game over: 
    lose:any empty spaces && no possible collisions?  
    win:tile value "2048" 
click event (arrow_keys)
  movetile function happens
  collisions result in new tile with increased 
  face value
    if tile adjacent in direction of arrow is identical
    in face value to the one next to it, the farthest tile is replaced with new tile 
     -> double face value
    any additional tiles behind that merge shift one position in same direction  
  new value from collision of tile in farthest most position
score updated to reflect any/all collisions (+=)
new random tile enters the board
  check for empty spaces
  randomly select value of 2 or 4 to random tile
  place random tile in random empty spot
start over - is game over? 






