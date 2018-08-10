const Api = require('./api.js');
module.exports = class extends Api {
  async indexAction() {
    const offset = parseInt(this.ctx.param('offset')) || 0;
    const count = parseInt(this.ctx.param('count')) || 10;
    const result = { success: true, errorMsg: '' }
    const questions = await this.model('questions').getQuestions(offset, count);
    result.data = questions;
    return this.json(result);
  }
}
;
