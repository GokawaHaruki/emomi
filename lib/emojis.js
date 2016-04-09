'use strict';

const forEach = (object, fn) => {
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      fn(object[key], key);
    }
  }
};

const map = (object, fn) => {
  const array = [];
  forEach(object, (value, key) => {
    array.push(fn(value, key));
  });
  return array;
};

module.exports = map(require('emojilib').lib, (emoji, name) => {
  emoji.name = name;
  return emoji;
});
