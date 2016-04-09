const Promise = require('bluebird');
const copyPaste = require('copy-paste');
const copy = Promise.promisify(copyPaste.copy);

module.exports = function (emoji) {
  return this.config.copyEmoji ? copy(emoji.char) :
    this.config.copyName ? copy(emoji.name) :
    Promise.resolve(null);
};
