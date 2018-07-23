const Base = require('./base.js');
module.exports = class extends Base {
    async indexAction() {
        const openId = parseInt(this.ctx.post('open_id'));
        const questionId = parseInt(this.ctx.post('question_id'));
        const answer = this.ctx.post('answer');
        const result = { success: false, errorMsg: '' }
        if (!openId || !questionId || !answer) {
            result.errorMsg = '请输入参数';
        } else {
            const ret = await this.model('answer').addAnswer(openId, questionId, answer);
            if (ret >= 0) {
                result.success = true;
            }
        }
        return this.json(result);

    }
}
    ;
