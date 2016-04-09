# Emomi

Yet another emoji helper.

## Install

```
$ npm install -g emomi
```

## Usage

```
$ emomi -h

Yet another emoji helper.

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
  $ emomi happy cat # View all happy cats.
  $ emomi happy -n  # Copy the first search result of 'happy'.
  $ emomi -e        # Copy a random emoji.
  $ emomi me -d     # Sometimes emojis cause blank output. Go debug mode.
```

## Known Issues

Some special emojis cause output problems, like blank output or ugly typesetting.

## Contribute

Feel free to open issues or send PRs.
