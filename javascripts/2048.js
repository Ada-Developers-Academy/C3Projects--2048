$(document).ready(function() {
  console.log('ready!');
  $('body').keydown(function(event){
    var arrow_keys = [37, 38, 39, 40];

    if(arrow_keys.indexOf(event.which) > -1) { // meaning the key that was pressed is in the array
      var tile = $('.tile');                   // all of the tiles
      moveTile(tile, event.which);             // move all of the tiles in the arrow direction
      event.preventDefault();                  // prevent default arrow key browser movement
    }
  })
})

function moveTile(tile, direction) {
  // var new_tile_value = tile.attr("data-val") * 2;
  // tile.attr("data-val", new_tile_value);
  // tile.text(new_tile_value);

  switch(direction) {
    case 38: //up

      // for each row (starting at the top)
      for(i = 0; i <= 3; i++) {
        var tiles = $('.tile[data-row="r' + i +'"]');

        for (j = 0; j < tiles.length; j ++) {
          var active_tile = tiles[j];

          var data_row_num = parseInt(active_tile.getAttribute('data-row')[1]);
          var data_col_num = parseInt(active_tile.getAttribute('data-col')[1]);

          for(k = data_row_num ; k >= 0; k--) {
            var next_row_num = k - 1; 
            var next_tile = $('.tile[data-row="r' + next_row_num + '"][data-col="c' + data_col_num + '"]');

            if (next_tile.length == 0 && next_row_num >= 0 && next_row_num <= 3) { // so the next tile doesn't exist
              $(active_tile).attr('data-row', "r" + next_row_num); // move the tile to that position
            }
          }
        }
      }
      break;

    case 40: //down

      // for each row (starting at the bottom)
      for (i = 3; i >= 0; i--) {
        var tiles = $('.tile[data-row="r' + i +'"]');

        for (j = 0; j < tiles.length; j ++) {
          var active_tile = tiles[j];

          var data_row_num = parseInt(active_tile.getAttribute('data-row')[1]);
          var data_col_num = parseInt(active_tile.getAttribute('data-col')[1]);

          for(k = data_row_num ; k < 4; k++) {
            var next_row_num = k + 1; 
            var next_tile = $('.tile[data-row="r' + next_row_num + '"][data-col="c' + data_col_num + '"]');

            if (next_tile.length == 0 && next_row_num >= 0 && next_row_num <= 3) { // so the next tile doesn't exist
              $(active_tile).attr('data-row', "r" + next_row_num); // move the tile to that position
            }
          }
        }
      }
      break;

    case 37: //left
      tile.attr("data-col","c0");
      break;
    case 39: //right
      tile.attr("data-col","c3");
      break;
  }
}
