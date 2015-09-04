function TileCollection(direction) {
  // direction will be keypress values -- 37: left, 39: right, 38: up, or 40: down
  this.direction = direction; // needed?

  if (direction == 37 || direction == 39) {
    this.collection_type = 'row';
    this.attr_name = 'data-col';
    this.max_length = cols.length;
    this.generate = generateRow;
  } else if (direction == 38 || direction == 40) {
    this.collection_type = 'col';
    this.attr_name = 'data-row';
    this.max_length = rows.length;
    this.generate = generateCol;
  }

  if (direction == 39 || direction == 40) {
    this.needs_reverse = true;
  } else if (direction == 37 || direction == 38) {
    this.needs_reverse = false;
  }
}

TileCollection.prototype.move = function() {
  for (var i = 0; i < this.max_length; i++) {
    this.shift_tiles(this.combine(this.generate(i)));
  }
}

TileCollection.prototype.combine = function(collection) {
  if (this.needs_reverse) { collection.reverse(); }

  for (var i = 1; i < collection.length; i++) {
    if (collection[i].attr('data-val') === collection[i - 1].attr('data-val')) {
      updateValue(collection[i]);  // combine!

      collection[i - 1].remove();  // removes adjacent tile from html
      collection.splice(i - 1, 1); // removes adjacent tile from collection array
    }
  }

  if (this.needs_reverse) { collection.reverse(); }

  return collection;
}

TileCollection.prototype.shift_tiles = function(collection) {
  if (this.needs_reverse) {
    for (var i = 1, j = collection.length - 1; i <= collection.length; i++, j--) {
      collection[j].attr(this.attr_name, (this.max_length - i).toString());
    }
  } else {
    for (var i = 0; i < collection.length; i++) {
      collection[i].attr(this.attr_name, (i).toString());
    }
  }
}
