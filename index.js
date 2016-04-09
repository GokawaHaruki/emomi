module.exports = {
  config: {
    copyName: false,
    copyEmoji: false,
    debug: false
  },
  emojis: require('./lib/emojis'),
  search: require('./lib/search'),
  display: require('./lib/display'),
  displayOne: require('./lib/display-one'),
  displayAsMatrix: require('./lib/display-as-matrix'),
  copy: require('./lib/copy'),
  logger: console
};
