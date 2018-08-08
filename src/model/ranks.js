module.exports = class extends think.Model {
    async getRanks(offset, count) {
        const ranks = await this.model('user').join('score ON user.openid=score.openid').order('score DESC').limit(offset, count).select();
        const score = await this.model('user').join('score ON user.openid=score.openid').select();
        const amount = await this.model('user').count('openid');
        const data = {
            rankList: ranks,
            amount: amount
        };
        return data;
    }
};
