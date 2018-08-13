const API = require('./api.js');
module.exports = class extends API {
    async indexAction() {
        let result = {
            success: false,
            errorMsg: ''
        };
        const model = this.model('level');
        const openid = this.ctx.param('open_id');
        const data = await model.currentLevel(openid);
        result = {
            ...data,
            success: true
        };
        return this.json(result);
    }
};
