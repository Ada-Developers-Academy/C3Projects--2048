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

function animateAddedValue(num) {
  $('.added_to_score').remove();
  var div = $("<div>");
  div.text('+ ' + num);
  div.addClass('added_to_score').on('animationend', function() { div.remove(); });
  $('.score').append(div);
}
