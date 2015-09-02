function scaleIn(obj) {
  addRemoveClass(obj, 'scaleIn');
}

function pop(obj) {
  addRemoveClass(obj, 'popper');
}

function delayFadeIn(obj) {
  addRemoveClass(obj, 'delayFadeIn');
}

function winnerTile(obj) {
  addRemoveClass(obj, 'winning');
}

function addRemoveClass(obj, className) {
  obj.addClass(className)
  .on('animationend', function() {
    $(this).removeClass('delayFadeIn');
  });
}
