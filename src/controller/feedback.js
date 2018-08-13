const Api = require('./api.js');
module.exports = class extends Api {
    async indexAction() {
        const result = {
            success: false,
            errorMsg: ''
        };
        await this.model('feedback').addFeedback(this.ctx.state.userInfo.openid,this.post("content"));
        result.success = true;
        return this.json(result);
    }
};
