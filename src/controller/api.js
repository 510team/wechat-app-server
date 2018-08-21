module.exports = class extends think.Controller {
    async __before() {
        const result = {
            success: false,
            errorMsg: '',
            errorCode: ''
        };
        const headers = this.ctx.headers;
        const code = (headers && headers['code']) || '';
        think.logger.info('code:' + code);
        if (code) {
            const sessionData = await this.cache(code);
            if (sessionData && sessionData.openid) {
                this.ctx.state.userInfo = sessionData;
                think.logger.info(sessionData);
            } else {
                result.success = false;
                result.errorMsg = 'code参数错误，没有找到用户信息';
                result.errorCode = '100';
                think.logger.error(result);
                return this.json(result);
            }
        } else {
            result.success = false;
            result.errorMsg = '没有code，请传code参数';
            result.errorCode = '100';
            think.logger.error(result);
            return this.json(result);
        }
    }
};
