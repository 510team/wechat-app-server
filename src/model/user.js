module.exports = class extends think.Model {
  async addUser() {
    think.logger.info('user add User ..............');
    const userId = await this.add({ nickName: 'xxx' });
    return userId;
  }
};
