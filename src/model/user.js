module.exports = class extends think.Model {
  async addUser() {
    console.log(this.name);
    const userId = await this.add({name: 'xxx', email: 'test@gmail.com'});
    return userId;
  }
};
