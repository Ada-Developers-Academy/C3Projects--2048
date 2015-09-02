function scaleIn(obj) {
  addRemoveClass(obj, 'scaleIn');
}

function pop(obj) {
  addRemoveClass(obj, 'popper');
}

function addRemoveClass(obj, className) {
  obj.addClass(className)
  .on('animationend', function() {
    $(this).removeClass('delayFadeIn');
  });
}
