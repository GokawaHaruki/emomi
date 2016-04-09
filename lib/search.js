const Promise = require('bluebird');
const emojis = require('./emojis');

const has = (haystack, needle) => haystack.indexOf(needle) > -1;
const inter = (s1, s2) => s1.filter((value) => has(s2, value));

module.exports = (keywords) => new Promise((resolve) => {
  const results = [];
  emojis.forEach((emoji) => {
    const rank =
      Number(has(keywords, emoji.name)) * 100 +
      Number(has(keywords, emoji.category)) * 10 +
      inter(keywords, emoji.keywords).length;
    if (rank > 0) {
      results.push({emoji, rank});
    }
  });
  resolve(results.sort((a, b) => b.rank - a.rank).map((result) => result.emoji));
});
