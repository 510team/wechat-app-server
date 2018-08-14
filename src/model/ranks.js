module.exports = class extends think.Model {
    async getRanks(openid, offset, count) {
        const rankList = await this.model('user')
            .join('score ON user.openid=score.openid')
            .order('score DESC')
            .limit(offset, count)
            .select();
        const scoreData = await this.getCurrentScore(openid);
        const amount = await this.model('user').count('openid');
        const sql = `SELECT obj_new.rank FROM
                        (
                            SELECT
                            obj.score,
                            obj.openid,
                            @rank := @rank + 1 AS num_tmp,
                            @incrnum := CASE
                            WHEN @rowtotal = obj.score THEN
                            @incrnum
                            WHEN @rowtotal := obj.score THEN
                            @rank
                            END AS rank
                    FROM
                        (
                            SELECT
                            *
                            FROM
                            score
                            ORDER BY
                            score DESC
                        ) AS obj,
                        (
                            SELECT
                            @rank := 0 ,@rowtotal := NULL ,@incrnum := 0
                        ) r
                    ) AS obj_new WHERE obj_new.openid = '${openid}'`;
        const rank = await this.query(sql);
        console.log(rank, 'dsfsfsdfsdfsdfsfsdf');
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

    async addScore(openid, score, total_score) {
        await this.model('score').thenAdd(
            { openid: openid, score: score, total_score: total_score },
            { openid: openid }
        );
    }

    async updateScore(openid, score, total_score) {
        await this.model('score')
            .where({ openid: openid })
            .update({
                score: score,
                total_score: total_score
            });
    }
};
