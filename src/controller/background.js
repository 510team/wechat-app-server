const Api = require('./api.js');
const fs = require('fs');

module.exports = class extends Api {
    async indexAction() {
        const result = {
            success: false,
            errorMsg: ''
        };
        const data = await this.model('background').getAllBackground();
        result.success = true;
        result.data = data;
        return this.json(result);
    }
    async updateBackgroundAction() {
        const result = {
            success: false,
            errorMsg: ''
        };
        const imgUrl = this.post();
        await this.model('background').setBackground(imgUrl.img);
        result.success = true;
        return this.json(result);
    }
    async uploadAction() {
        const result = {
            success: false,
            errorMsg: '',
            backgroundUrl: ''
        };
        const uploadFold = this.config('uploadFold');
        const url = uploadFold === 'www/static' ? '/static' : '/deploy/cdn';

        //处理后缀和文件名
        let finalFileName = new Date().getTime() + '.png';

        //读取文件
        const data = fs.readFileSync(this.file('file').path);
        if(data){
            const exists = fs.existsSync(uploadFold);
            if(!exists) {
                fs.mkdirSync(uploadFold);
            }
            //写入文件到uplaod
            fs.writeFileSync(uploadFold + '/' + finalFileName, data);
            await this.model('background').addBackground(this.ctx.state.userInfo.openid,finalFileName,uploadFold);
            result.backgroundUrl = url + '/' + finalFileName;
            result.success = true;
        }
        return this.json(result);
    }
    async getPrivilegeAction(){
        const result = {
            success: false,
            errorMsg: '',
            data: {}
        };
        result.data.hasPrivilege = false;
        return this.json(result);
    }
};