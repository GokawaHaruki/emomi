module.exports = function (emojis) {
  if (this.config.debug) {
    this.logger.log(emojis);
  }
  if (emojis.length === 0) {
    this.logger.log('No matching emoji.');
    return;
  }
  this.logger.log(this.displayAsMatrix(emojis));
  return this.copy(emojis[0]);
};
