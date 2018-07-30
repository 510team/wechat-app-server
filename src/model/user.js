module.exports = class extends think.Model {
  async addUser(user) {
    const userId = await this.thenAdd({ openid:user.openid,code:user.code,session_key:user.session_key }, {openid: user.openid});
    return userId;
  }

  async updateUser(user) {
    const userInfo = JSON.parse(user.rawData);
    const userId = await this.where({openid: user.openid}).update({
      nick_name:userInfo.nickName,
      province:userInfo.province,
      language:userInfo.language,
      gender:userInfo.gender,
      country:userInfo.country,
      city:userInfo.city,
      avatar_url:userInfo.avatarUrl,
    });
    return userId;
  }

};
