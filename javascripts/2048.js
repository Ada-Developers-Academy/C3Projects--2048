$(document).ready(function() {
  console.log('ready!');
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];

    if(arrow_keys.indexOf(event.which) > -1) { // meaning the key that was pressed is in the array
      var tile = $('.tile');                   // all of the tiles
      moveTile(tile, event.which);             // move all of the tiles in the arrow direction
      event.preventDefault();                  // prevent default arrow key browser movement
    }
  });
});

function moveTile(tile, direction) {
  // var new_tile_value = tile.attr("data-val") * 2;
  // tile.attr("data-val", new_tile_value);
  // tile.text(new_tile_value);

  switch(direction) {
    case 38: //up
      var tiles = $('.tile');

      for (i = 0; i < tiles.length; i ++) {
        var active_tile = tiles[i];

        var data_row_num = parseInt(active_tile.getAttribute('data-row')[1]);
        var data_col_num = parseInt(active_tile.getAttribute('data-col')[1]);

        for(j = data_row_num ; j >= 0; j--) {
          var next_row_num = j - 1;
          var next_tile = $('.tile[data-row="r' + next_row_num + '"][data-col="c' + data_col_num + '"]');

          if (next_tile.length === 0 && next_row_num >= 0 && next_row_num <= 3) { // so the next tile doesn't exist
            $(active_tile).attr('data-row', "r" + next_row_num); // move the tile to that position
          }
        }
      }
      break;

    case 40: //down

      // for each row
      for (i = 3; i >= 0; i--) {
        var tiles = $('.tile[data-row="r' + i);

        for (i = 0; i < tiles.length; i ++) {
          var active_tile = tiles[i];

          var data_row_num = parseInt(active_tile.getAttribute('data-row')[1]);
          var data_col_num = parseInt(active_tile.getAttribute('data-col')[1]);

          for(j = data_row_num ; j < 4; j++) {
            var next_row_num = j + 1;
            var next_tile = $('.tile[data-row="r' + next_row_num + '"][data-col="c' + data_col_num + '"]');

            if (next_tile.length === 0 && next_row_num >= 0 && next_row_num <= 3) { // so the next tile doesn't exist
              $(active_tile).attr('data-row', "r" + next_row_num); // move the tile to that position
            }
          }
        }
      }

      // tile.attr("data-row","r3");
      break;
    case 37: //left
      tile.attr("data-col","c0");
      break;
    case 39: //right
      tile.attr("data-col","c3");
      break;
  } // end switch

  addTile();

} // end moveTile

// extend ability to remove values from arrays, because reasons
Array.prototype.remove = function(value) {
  // console.log(this.indexOf(value));


    if (this.indexOf(value)!== -1) {
       this.splice(this.indexOf(value), 1);
       return true;
   } else {
      return false;
   }
};

function addTile() {
  var present_tiles = (document.getElementsByClassName("tile")); // find all tiles
  var positions = [];
  for (var i = 0; i < present_tiles.length; i++) { // pull each tile position into array pair ["r0", "c0"]
    var row = present_tiles[i].getAttribute("data-row");
    var col = present_tiles[i].getAttribute("data-col");
    var position_pair = row + "," + col;
    positions.push(position_pair); // push into 2D array [["r0", "c0"], ["r0", "c1"]]
  } // now have positions of all present tiles (changes after each move)


  var grid_options = ["r0,c0", "r0,c1", "r0,c2", "r0,c3", "r1,c0", "r1,c1", "r1,c2", "r1,c3", "r2,c0", "r2,c1", "r2,c2", "r2,c3", "r3,c0", "r3,c1", "r3,c2", "r3,c3"];

  // iterate through list of all possible positions, remove those currently on board
  for (var j = 0; j < positions.length; j++) {
    console.log(positions[j]);
    grid_options.remove(positions[j]); // this isn't working
  }
  console.log(positions);
  console.log(grid_options.length);

  // randomly pick a position to place a tile from remaining array
  // plug those values into a newly created div's attributes

}
