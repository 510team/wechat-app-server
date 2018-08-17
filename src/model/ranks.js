module.exports = class extends think.Model {
    async getRanks(openid, offset, count) {
        const rankList = await this.model('user')
            .join('score ON user.openid=score.openid').join('level ON level.lowest_score<=score.score AND level.highest_score>=score.score')
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
        // 查找当前等级
        const currentLevel = await this.model('level')
            .where(
                `lowest_score<=${scoreData.score} AND highest_score>=${scoreData.score}`
            )
            .find();
        const data = {
            rankList: rankList,
            amount: amount,
            rank: (rank[0] && rank[0].rank) || 1,
            score: scoreData.score || 0,
            level: currentLevel.name
        };
        return data;
    }

    async getCurrentScore(openid) {
        const scoreData = await this.model('score')
            .where({ 'openid': openid })
            .find();
        console.log(scoreData,'scoreData')

        return scoreData || {};
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
