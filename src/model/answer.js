module.exports = class extends think.Model {
    async addAnswer(openId, questionId, answer,duration) {
        return await this.add({ open_id: openId, question_id: questionId, answer,duration });
    }

    async findQuestionAnswerTimes(questionId){
        return await this.where({question_id: questionId}).count();
    }

    async findQAnswerRightTimes(questionId,answer){
        return await this.where({question_id: questionId,answer:answer}).count();
    }

};
