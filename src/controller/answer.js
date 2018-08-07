const Api = require('./api.js');
module.exports = class extends Api {
    async indexAction() {
        const openId = this.ctx.state.userInfo.openid;
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
