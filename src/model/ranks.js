module.exports = class extends think.Model {
    async getRanks(code, offset, count) {
        let user = {};
        let index = 0;
        const ranks = await this.model('user').join('score ON user.openid=score.openid').limit(offset, count).select();
        for(let i = 0; i < ranks.length; i++){
            if(ranks[i].code === code){
                user = ranks[i];
                index = i;
                break;
            }
        }
        const data = {
            rankList: ranks,
            user: {...user, index}
        };
        return data;
    }
};
