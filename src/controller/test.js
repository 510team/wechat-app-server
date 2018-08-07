const Api = require('./api.js');
module.exports = class extends Api {
  async indexAction() {
    return this.json({
        success:'true'
    });
  }
}