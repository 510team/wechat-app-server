const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.json({ status: 'ok' });
  }
  async addAction() {
    const user = this.model('user');
    await user.add({nickName: 'test1'});
    this.success();
  }
};
