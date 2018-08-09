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
            currentRank: data.rank,
            score: data.score
        };
        result.success = true;
        return this.json(result);
    }

    async updateScoreAction() {
        const result = {
            success: false,
            errorMsg: ''
        };
        const score = parseInt(this.ctx.param('score')) || 0;
        const currentScore= await this.model('ranks').getCurrentScore(this.ctx.state.userInfo.openid);
        console.log('currentRank',currentScore);
        console.log('score',score);
        if(score > currentScore){
            await this.model('ranks').updateScore(this.ctx.state.userInfo.openid,score);
        }
        result.success = true;
        return this.json(result);
    }
};
