function scaleIn(tile) {
  tile.addClass('scaleIn')
  .on('animationend',
    function () { $(this).removeClass('scaleIn'); }
  );
}

function pop(tile) {
  $(tile)
  .addClass("popper")
  .on("animationend",
    function() { $(this).removeClass("popper"); }
  );
}
