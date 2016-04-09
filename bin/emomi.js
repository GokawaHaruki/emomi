#!/usr/bin/env node

'use strict';

const cli = require('meow')(`
  Usage
  $ emomi [keywords]

  Options
  -n, --copy-name   Copy a most likely emoji's name, if found.
  -e, --copy-emoji  Copy a most likely emoji, if found.
  -l, --repl        Start a REPL session.
  -h, --help        Display this help.
  -v, --version     Display the current version.
  -d, --debug       Show debug info.

Examples
  $ emomi happy -n  # Copy the first search result of 'happy'.
  $ emomi -e        # Copy a random emoji.
  $ emomi me -d     # Sometimes emojis cause blank output. Go debug mode.

`, {
  alias: {
    h: 'help',
    v: 'version',
    d: 'debug',
    n: 'copy-name',
    e: 'copy-emoji',
    l: 'repl'
  }
});

const emomi = require('../index');

const displayOne = (emoji) => ':' + emoji.name + ': ' + emoji.char;

const stringWidth = require('string-width');

const WIDTH_EACH_EMOJI = 12;
const WIDTH_PADDING = 2;
const WIDTH_MARGIN = 4;
const EMOJI_COUNT_EACH_LINE = 4;

const TEXT_PADDING = ' '.repeat(WIDTH_PADDING);
const WIDTH_EACH_TOTAL = WIDTH_EACH_EMOJI + WIDTH_PADDING + WIDTH_MARGIN;
const WIDTH_LINE = WIDTH_EACH_TOTAL * EMOJI_COUNT_EACH_LINE;
const displayAsMatrix = (emojis) => {
  const rows = [];
  let row = '';
  emojis.forEach((emoji) => {
    const one = displayOne(emoji);
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

const Promise = require('bluebird');
const copyPaste = require('copy-paste');
const copy = Promise.promisify(copyPaste.copy);
const copyEmoji = (emoji) =>
  cli.flags.e ? copy(emoji.char) :
  cli.flags.n ? copy(emoji.name) :
  Promise.resolve(null);

const display = (out) => (emojis) => {
  if (cli.flags.d) {
    out.log(emojis);
  }
  if (emojis.length) {
    out.log(displayAsMatrix(emojis));
    return copyEmoji(emojis[0]);
  } else {
    out.log('No matching emoji.');
  }
};

const exit = () => process.exit(0);
const rand = (array) => array[Math.floor(Math.random() * array.length)];

if (cli.flags.l) {
  const vorpal = require('vorpal')();
  vorpal
    .command('search <keywords...>', 'Search by keywords.')
    .action(function (args) {
      return emomi.search(args.keywords)
        .then(display(this));
    });
  vorpal
    .delimiter(cli.pkg.name + ' $')
    .show();
} else if (cli.input.length) {
  emomi.search(cli.input)
    .then(display(console))
    .then(exit);
} else {
  const emoji = rand(emomi.emojis);
  console.log(displayOne(emoji));
  copyEmoji(emoji)
    .then(exit);
}
