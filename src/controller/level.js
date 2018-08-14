const API = require('./api.js');
module.exports = class extends API {
    async indexAction() {
        let result = {
            success: false,
            errorMsg: ''
        };
        const model = this.model('level');
        const openId = this.ctx.state.userInfo.openid;
        const data = await model.currentLevel(openId);
        result = {
            ...data,
            success: true
        };
        return this.json(result);
    }
};
