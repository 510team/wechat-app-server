const Api = require('./api.js');
module.exports = class extends Api {
    async indexAction() {
        const result = {
            success: false,
            errorMsg: '',
            data: {}
        };
        const count = await this.model('signIn').signIn(this.ctx.state.userInfo.openid);
        result.success = true;
        result.data.has_sign_in = true;
        result.data.isAweek = count === 7 ;
        return this.json(result);
    }


    async canSignInAction() {
        const result = {
            success: false,
            errorMsg: ''
        };
        const can_sign_in = await this.model('signIn').canSignIn(this.ctx.state.userInfo.openid);
        result.success = true;
        result.can_sign_in = can_sign_in;
        return this.json(result);
    }

    async canShareAction() {
        const result = {
            success: false,
            errorMsg: ''
        };
        const can_share = await this.model('signIn').canShare(this.ctx.state.userInfo.openid);
        result.success = true;
        result.can_share = can_share;
        return this.json(result);
    }

    async shareAction() {
        const result = {
            success: false,
            errorMsg: ''
        };
        await this.model('signIn').share(this.ctx.state.userInfo.openid);
        result.success = true;
        result.can_share = false;
        return this.json(result);
    }

    async getPointAction() {
        const result = {
            success: false,
            errorMsg: ''
        };
        result.success = true;
        result.point = await this.model('signIn').getShare(this.ctx.state.userInfo.openid);
        return this.json(result);
    }

};
