'use strict';

const stringWidth = require('string-width');

const WIDTH_EACH_EMOJI = 12;
const WIDTH_PADDING = 2;
const WIDTH_MARGIN = 4;
const EMOJI_COUNT_EACH_LINE = 4;

const TEXT_PADDING = ' '.repeat(WIDTH_PADDING);
const WIDTH_EACH_TOTAL = WIDTH_EACH_EMOJI + WIDTH_PADDING + WIDTH_MARGIN;
const WIDTH_LINE = WIDTH_EACH_TOTAL * EMOJI_COUNT_EACH_LINE;

module.exports = function (emojis) {
  const rows = [];
  let row = '';
  emojis.forEach((emoji) => {
    const one = this.displayOne(emoji);
    if (stringWidth(row + one) >= WIDTH_LINE) {
      rows.push(row);
      row = '';
    } else {
      row += one + TEXT_PADDING;
      row += ' '.repeat(WIDTH_EACH_TOTAL - (stringWidth(row) % WIDTH_EACH_TOTAL));
    }
  });
  return rows.join('\n');
};
