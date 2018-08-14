module.exports = class extends think.Model {
    async getRanks(openid, offset, count) {
        const rankList = await this.model('user')
            .join('score ON user.openid=score.openid')
            .order('score DESC')
            .limit(offset, count)
            .select();
        const scoreData = await this.getCurrentScore(openid);
        const amount = await this.model('user').count('openid');
        const sql = `SELECT
                    (SELECT COUNT(1) FROM score vi1 WHERE vi1.score > vi.score) + 1 AS rank,
                    vi.* FROM score vi WHERE vi.openid = '${openid}'`;
        const rank = await this.query(sql);
        const data = {
            rankList: rankList,
            amount: amount,
            rank: (rank[0] && rank[0].rank) || 1,
            score: scoreData.score || 0
        };
        return data;
    }

    async getCurrentScore(openid) {
        const scoreData = await this.model('user')
            .join('score u ON user.openid=u.openid')
            .where({ 'u.openid': openid })
            .select();
        return scoreData[0] || {};
    }

    async addScore(openid,score,total_score) {
        await this.model('score').thenAdd({ openid: openid, score: score, total_score: total_score }, { openid: openid });
    }

    async updateScore(openid,score,total_score){
        await this.model('score').where({ openid: openid }).update({
            score: score,
            total_score: total_score
        });
    }


};
