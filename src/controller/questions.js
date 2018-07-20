const Base = require('./base.js');
module.exports = class extends Base {
  async indexAction() {
    const offset = parseInt(this.ctx.param('offset')) || 0;
    const count = parseInt(this.ctx.param('count')) || 10;
    const ret = await this.model('questions').getQuestions(offset, count);
    return this.json(ret);
  }
}
;
