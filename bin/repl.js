const emomi = require('../index');
const vorpal = require('vorpal')();

module.exports = () => {
  vorpal
    .command('search <keywords...>', 'Search by keywords.')
    .action(function (args) {
      emomi.logger = this;
      return emomi.search(args.keywords)
      .then(emomi.display.bind(emomi));
    });
  return vorpal.delimiter('emomi >');
};
