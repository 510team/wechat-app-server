const Api = require('./api.js');
module.exports = class extends Api {
    async indexAction() {
        const result = {
            success: false,
            errorMsg: ''
        };
        const data = await this.model('background').getAllBackground();
        result.success = true;
        result.data = data;
        return this.json(result);
    }
    async updateBackgroundAction() {
        const result = {
            success: false,
            errorMsg: ''
        };
        const imgUrl = this.post();
        await this.model('background').setBackground(imgUrl.img);
        result.success = true;
        return this.json(result);
    }
};