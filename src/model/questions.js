module.exports = class extends think.Model {
    async getQuestions(offset, count) {
        const ids = {};
        let questionsArray = [];
        const min = await this.min('id');
        const max = await this.max('id');
        let randomId = Math.round(Math.random() * (max - min)) + min;
        let num = 0;
        let tryTimes = 0;
        while ( num < 10 ) {
            randomId = Math.round(Math.random() * (max - min)) + min;
            if (!ids[randomId]) {
                ids[randomId] = true;
                questionsArray.push(randomId);
                num++;
            }
            tryTimes++;
            if(tryTimes>100){
                break;
            }
        }
        think.logger.info('选中的ID是:',questionsArray);
        const questions = await this.where({ id: ['IN', questionsArray] }).select();
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

    async findAllQuestions(){
        return await this.select();
    }
    async updateAccuracy(id,accuracy){
        return  await this.where({id}).update({accuracy});
    }
};
