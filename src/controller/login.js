const Base = require('./base.js');
const config = require('../config/config');
const request = require('../util/request');
const SHA = require('../util/sha.js');
module.exports = class extends Base {
    async indexAction() {
        const code = this.ctx.param('code');
        const result = {
            success: false,
            errorMsg: ''
        }
        if (!code) {
            result.success = false;
            result.errorMsg = "请添加code参数";
            return this.json(result);
        }
        

        //含有rawData ,拿code ,appid,app_secret 换session_key,openid,然后写入缓存.code->{openId,sessionKey,rawData}
        const sessionData = await this.jscode2session(code);
        if (!sessionData.session_key) {
            result.success = false;
            result.errorMsg = sessionData.errmsg || "jscode2session出错";
            return this.json(result);
        }

       
        //签名正确写入缓存
        const userData = {
            openid: sessionData.openid,
            session_key:sessionData.session_key
        }
        await this.cache(code, userData);
        result.data = userData;
        result.success = true;
        return this.json(result);
    }

    async setUserAction() {
        const code = this.ctx.post('code');
        const signature = this.ctx.post('signature');
        const rawData = this.ctx.post('rawData');
        const result = {
            success: false,
            errorMsg: ''
        }
        if (!code) {
            result.success = false;
            result.errorMsg = "请添加code参数";
            return this.json(result);
        }
        if (!rawData) {
            result.success = false;
            result.errorMsg = "请添加rawData参数";
            return this.json(result);
        }
        if (!signature) {
            result.success = false;
            result.errorMsg = "请添加signature参数";
            return this.json(result);
        }
        //含有rawData ,拿code ,appid,app_secret 换session_key,openid,然后写入缓存.code->{openId,sessionKey,rawData}
        const sessionData =  await this.cache(code);
        if (!sessionData ||  !sessionData.session_key) {
            result.success = false;
            result.errorMsg = sessionData &&  sessionData.errmsg || "code在缓存中没有找到";
            return this.json(result);
        }
        const isSignOk = this.checkSignature(sessionData.session_key, rawData, signature);
        if (!isSingOk) {
            result.success = false;
            result.errorMsg = "签名校验出错";
        }
        //签名正确写入缓存
        const userData = {
            openid: sessionData.openid,
            ...rawData
        }
        await this.cache(code, userData);
        result.data = userData;
        result.success = true;
        return this.json(result);
    }
    checkSignature(sessionKey, rawData, signature) {
        const signature2 = SHA.sha1ByJSON(JSON.stringify(rawData) + sessionKey);
        return signature === signature2;
    }

    async jscode2session(code) {
        let ret = {};

        think.logger.info("[service][jscode2session] code ", code);

        try {
            ret = await request.send({
                url: "https://api.weixin.qq.com/sns/jscode2session",
                method: "get",
                data: {
                    appid: config.appID,
                    secret: config.appSecret,
                    js_code: code,
                    grant_type: 'authorization_code'
                }
            });
        } catch (error) {
            think.logger.error("[service][jscode2session] error", error);
        }
        think.logger.info("[service][jscode2session] return", ret);
        return ret;
    }
}