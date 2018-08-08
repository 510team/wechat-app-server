module.exports = class extends think.Model {
    async getQuestions(offset, count) {
        const questions = await this.limit(offset, count).select();
        questions &&
            questions.map(question => {
                question.items = [];
                question.items.push({ key: 'A', value: question.A });
                question.items.push({ key: 'B', value: question.B });
                question.items.push({ key: 'C', value: question.C });
                question.items.push({ key: 'D', value: question.D });
                delete question.A;
                delete question.B;
                delete question.C;
                delete question.D;
                return question;
            });
        return questions;
    }
};
