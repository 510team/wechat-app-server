module.exports = class extends think.Model {
    async currentLevel(openid) {
        // 查找当前用户的得分
        const userScoreInfo = await this.model('score')
            .where({ openid: openid })
            .find();
        const result = {};
        if (!think.isEmpty(userScoreInfo)) {
            const currentScore = userScoreInfo.score;

            // 查找当前等级
            const currentLevel = await this.model('level')
                .where(
                    `lowest_score<=${currentScore} AND highest_score>=${currentScore}`
                )
                .find();

            // 查找下一个等级
            const nextLevel = await this.model('level')
                .where(`grade=${currentLevel.grade + 1}`)
                .find();
            result.current_level = currentLevel;
            result.next_level = nextLevel;
            result.score_info = userScoreInfo;
        }

        return result;
    }
};
