module.exports = class extends think.Model {
  async getQuestions(offset, count) {
    const questions = await this.limit(offset, count).select();
    return questions;
  }
};
