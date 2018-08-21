const Base = require('./base.js');
const config = require('../config/config');
const request = require('../util/request');

module.exports = class extends Base {

    //计算每到题目的正确率
    async analysisAction() {
        const questions = await this.model('questions').findAllQuestions();
        think.logger.info('find all questions', questions);

        if (questions && questions.length > 0) {
            questions.forEach(async (question) => {
                const sum = await this.model('answer').findQuestionAnswerTimes(question.id);
                const rightTimes = await this.model('answer').findQAnswerRightTimes(question.id, question.answer);
                think.logger.info(question.id+" sum :",sum);
                think.logger.info(question.id+" rightTimes :",rightTimes);
                let accuracy = 0;
                if(sum>0){
                    accuracy = Math.round((rightTimes/sum)*100)/100;
                    await this.model('questions').updateAccuracy(question.id,accuracy);
                }
            })
        }
        return this.success();
    }
}