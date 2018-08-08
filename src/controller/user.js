const Api = require('./api.js');







module.exports = class extends Api {
    async findUserAction(code){
        const openid = this.ctx.state.userInfo.openid;
        const result = { success: false, errorMsg: '' }
        console.log('findUser',this.ctx.state.userInfo.openid);
        const userInfo = await this.model('user').findUser({
            openid: openid
        });
        result.success = true;
        result.userInfo = userInfo;
        think.logger.info("当前用户 ",  result);
        return this.json(result);
    }
}