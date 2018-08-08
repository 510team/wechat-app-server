const Api = require('./api.js');
module.exports = class extends Api {
    async indexAction() {
        const result = {
            success: false,
            errorMsg: ''
        };
        const offset = parseInt(this.ctx.param('offset')) || 0;
        const count = parseInt(this.ctx.param('count')) || 10;
        const data = await this.model('ranks').getRanks(
            this.ctx.state.userInfo.openid,
            offset,
            count
        );
        think.logger.info(this.ctx.state);
        result.data = {
            rankList: data.rankList,
            user: this.ctx.state.userInfo.userInfo,
            amount: data.amount,
            currentRank: data.rank || 1,
            score: data.score || 0
        };
        result.success = true;
        return this.json(result);
    }
};
