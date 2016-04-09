#!/usr/bin/env node

const cli = require('meow')(`
  Usage
  $ emomi [keywords]

  Options
  -n, --copy-name   Copy emoji's name, if exactly one found.
  -e, --copy-emoji  Copy emoji, if exactly one found.
  -l, --repl        Start a REPL session.

Examples
  $ emomi grinning -n

`, {
  alias: {
    n: 'copy-name',
    e: 'copy-emoji',
    l: 'repl'
  }
});

const emomi = require('../index');

const DEFAULT_PAD_CHAR = ' ';
const leftPad = (length, text, char) => text.length >= length ? text : ((char || DEFAULT_PAD_CHAR).repeat(length - text.length) + text);

const DEFAULT_EACH_LINE = 4;
const separate = (array, width) => {
  const matrix = [];
  width = width || DEFAULT_EACH_LINE;
  while (array.length) {
    matrix.push(array.splice(0, width));
  }
  return matrix;
};

const DEFAULT_EACH_WIDTH = 20;
const DEFAULT_MARGIN = 4;
const displayAsLine = (emojis) => emojis.map((emoji) => leftPad(DEFAULT_EACH_WIDTH, ':' + emoji.name + ': ' + emoji.char)).join(' '.repeat(DEFAULT_MARGIN));
const displayAsMatrix = (emojis) => separate(emojis).map(displayAsLine).join('\n');

if (cli.flags.l) {
  const vorpal = require('vorpal')();
  vorpal
    .command('search <keywords...>', 'Search by keywords.')
    .action(function (args) {
      return emomi.search(args.keywords)
        .then(displayAsMatrix)
        .then(this.log.bind(this));
    });
  vorpal
    .delimiter(cli.pkg.name + ' $')
    .show();
} else if (cli.input.length) {
  emomi.search(cli.input)
    .then(displayAsMatrix)
    .then(console.log.bind(console));
}
