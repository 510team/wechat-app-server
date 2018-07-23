const Base = require('./base.js');
var redis = require('redis');
var test = { a: 1 };
module.exports = class extends Base {
  indexAction() {
    return this.json({ status: 'ok' });
  }
};
