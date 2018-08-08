module.exports = class extends think.Model {
    async getRanks(openid, offset, count) {
        const rankList = await this.model('user')
            .join('score ON user.openid=score.openid')
            .order('score DESC')
            .limit(offset, count)
            .select();
        const scoreData = await this.model('user')
            .join('score u ON user.openid=u.openid')
            .where({ 'u.openid': openid })
            .select();
        const amount = await this.model('user').count('openid');
        const sql = `SELECT
                    (SELECT COUNT(1) FROM score vi1 WHERE vi1.score > vi.score) + 1 AS rank,
                    vi.* FROM score vi WHERE vi.openid = '${openid}'`;
        const rank = await this.query(sql);
        const data = {
            rankList: rankList,
            amount: amount,
            rank: rank[0].rank,
            score: scoreData[0].score
        };
        return data;
    }
};
