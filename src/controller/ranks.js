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
        const score = parseInt(this.post('score')) || 0;

        think.logger.info("updateScoreAction: score "+score);
        const scoreData = await this.model('ranks').getCurrentScore(
            this.ctx.state.userInfo.openid
        );


        const currentScore = scoreData.score;
        const totalScore = scoreData.total_score || 0;
        const currentTotalScore = totalScore + score;

        think.logger.info("updateScoreAction: currentScore "+currentScore);
        think.logger.info("updateScoreAction: totalScore "+totalScore);
        think.logger.info("updateScoreAction: currentTotalScore "+currentTotalScore);
        if (!currentScore) {
            await this.model('ranks').addScore(
                this.ctx.state.userInfo.openid,
                score,
                currentTotalScore
            );
        } else {
            if (score > currentScore) {
                await this.model('ranks').updateScore(
                    this.ctx.state.userInfo.openid,
                    score,
                    currentTotalScore
                );
            } else {
                await this.model('ranks').updateScore(
                    this.ctx.state.userInfo.openid,
                    currentScore,
                    currentTotalScore
                );
            }
        }
        result.success = true;
        return this.json(result);
    }
};
