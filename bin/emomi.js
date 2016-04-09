#!/usr/bin/env node

'use strict';

const cli = require('meow')(`
  Usage
  $ emomi [keywords]

  Options
  -n, --copy-name   Copy a most likely emoji's name, if found.
  -e, --copy-emoji  Copy a most likely emoji, if found. This overrides \`-n\`.
  -l, --repl        Start a REPL session.
  -h, --help        Display this help.
  -v, --version     Display the current version.
  -d, --debug       Show debug info.

Examples
  $ emomi happy cat # View all happy cats.
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
emomi.config.debug = cli.flags.d;
emomi.config.copyName = cli.flags.n;
emomi.config.copyEmoji = cli.flags.e;

const exit = () => process.exit(0);

if (cli.flags.l) {
  require('./repl')().show();
} else if (cli.input.length) {
  emomi.search(cli.input)
    .then(emomi.display.bind(emomi))
    .then(exit);
} else {
  const rand = (array) => array[Math.floor(Math.random() * array.length)];
  const emoji = rand(emomi.emojis);
  console.log(emomi.displayOne(emoji));
  emomi.copy(emoji)
    .then(exit);
}
