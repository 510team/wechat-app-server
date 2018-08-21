module.exports = class extends think.Model {
    async addAnswer(openId, questionId, answer,duration) {
        return this.add({ open_id: openId, question_id: questionId, answer,duration });
    }
};
