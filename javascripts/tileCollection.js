function TileCollection(direction) {
  // direction will be keypress values -- 37: left, 39: right, 38: up, or 40: down
  this.direction = direction; // needed?

  if (direction == 37 || direction == 39) {
    this.collection_type = 'row';
    this.attr_name = 'data-col';
    this.letter = 'c';
    this.max_length = cols.length;
    this.generate = generateRow;
  } else if (direction == 38 || direction == 40) {
    this.collection_type = 'col';
    this.attr_name = 'data-row';
    this.letter = 'r';
    this.max_length = rows.length;
    this.generate = generateCol;
  }

  if (direction == 39 || direction == 40) {
    this.needs_reverse = true;
    this.shift = shiftRightOrDown;
  } else if (direction == 37 || direction == 38) {
    this.needs_reverse = false;
    this.shift = shiftLeftOrUp;
  }
}

TileCollection.prototype.move = function() {
  for (var i = 0; i < this.max_length; i++) {
    this.shift(this.combine(this.generate(i)), this.collection_type);
  }
}

TileCollection.prototype.combine = function(collection) {
  if (this.needs_reverse) {
    collection.reverse();
  }

  for (var i = 1; i < collection.length; i++) {
    if (collection[i].attr('data-val') === collection[i - 1].attr('data-val')) {
      // combine!
      updateValue(collection[i]);

      collection[i - 1].remove();  // removes adjacent tile from html
      collection.splice(i - 1, 1); // removes adjacent tile from collection array
      i += 1;
    }
  }

  if (this.needs_reverse) {
    collection.reverse();
  }

  return collection;
}
