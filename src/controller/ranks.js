const Base = require('./base.js');
module.exports = class extends Base {
    async indexAction() {
        const result = {
            success: false,
            errorMsg: ''
        }
        const offset = parseInt(this.ctx.param('offset')) || 0;
        const count = parseInt(this.ctx.param('count')) || 10;
        const code = this.ctx.param('code');
        const data = await this.model('ranks').getRanks(code, offset, count);
        result.data = {
            rankList: data.rankList,
            user: data.user,
            amount: 21
        };
        result.success = true;
        return this.json(result);
    }
}
;
