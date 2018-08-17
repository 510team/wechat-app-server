const Api = require('./api.js');
module.exports = class extends Api {
    async indexAction() {
        const openId = this.ctx.state.userInfo.openid;
        const questionId = parseInt(this.ctx.param('question_id'));
        const answer = this.ctx.param('answer');
        const duration = this.ctx.param('duration');
        const result = { success: false, errorMsg: '' }
        if (!openId || !questionId || !answer) {
            result.errorMsg = '请输入参数';
        } else {
            const ret = await this.model('answer').addAnswer(openId, questionId, answer,duration);
            if (ret >= 0) {
                result.success = true;
                result.data = ret;
            }
        }
        return this.json(result);

    }
}