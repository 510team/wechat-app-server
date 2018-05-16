module.exports = class extends think.Model {
  async addUser() {
    const userId = await this.add({name: 'xxx', email: 'test@gmail.com'});
    return userId;
  }
};
