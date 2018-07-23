module.exports = class extends think.Model {
    async getQuestions(offset, count) {
        const questions = await this.limit(offset, count).select();
        questions && questions.map((question) => {
            question.items = [];
            question.items.push(question.A);
            question.items.push(question.B);
            question.items.push(question.C);
            question.items.push(question.D);
            delete question.A;
            delete question.B;
            delete question.C;
            delete question.D;
            return question;
        });
        return questions;
    }
};
