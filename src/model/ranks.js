module.exports = class extends think.Model {
    async getRanks(openid, offset, count) {
        const scoreData = await this.getCurrentScore(openid);
        const amount = await this.model('user').count('openid');
        const sql = `SELECT * FROM
                        (
                            SELECT
                                obj.score,
                                obj.name,
                                obj.nick_name,
                                obj.avatar_url,
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
                                  score1.score,
                                  level.name,
                                  user.nick_name,
                                  user.avatar_url,
                                  user.openid 
                                FROM user  LEFT JOIN score as score1 ON user.openid=score1.openid LEFT JOIN level ON level.lowest_score<=score1.score AND level.highest_score>=score1.score ORDER BY score DESC
                              ) AS obj,
                              (
                                SELECT
                                @rank := 0 ,@rowtotal := NULL ,@incrnum := 0
                        ) r
                    ) AS obj_new `;
        const rankList = await this.query(sql + `limit ${offset}, ${count}`);
        const rank = await this.query(sql + `WHERE obj_new.openid = '${openid}'`);

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
