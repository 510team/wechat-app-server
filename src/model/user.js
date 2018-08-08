module.exports = class extends think.Model {
    async addUser(user) {
        const userId = await this.thenAdd({ openid: user.openid }, { openid: user.openid });
        return userId;
    }
    async findUser(user) {
        console.log('findUser', user);
        const userInfo = await this.where({ openid: user.openid }).find();
        return {
            nickName: userInfo.nick_name,
            province: userInfo.province,
            language: userInfo.language,
            gender: userInfo.gender,
            country: userInfo.country,
            city: userInfo.city,
            avatarUrl: userInfo.avatar_url,
            openid:userInfo.openid
        }
    }
    async updateUser(user) {
        const userInfo = user.userInfo;
        const userId = await this.where({ openid: user.openid }).update({
            nick_name: userInfo.nickName,
            province: userInfo.province,
            language: userInfo.language,
            gender: userInfo.gender,
            country: userInfo.country,
            city: userInfo.city,
            avatar_url: userInfo.avatarUrl,
            openid:userInfo.openid
        });
        return userId;
    }

};
