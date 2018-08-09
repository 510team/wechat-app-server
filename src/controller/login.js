const Base = require('./base.js');
const config = require('../config/config');
const request = require('../util/request');
const SHA = require('../util/sha.js');
module.exports = class extends Base {
    async indexAction() {
        const code = this.ctx.param('code');
        think.logger.info("login code:"+code);

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
        let userInfo =  {};
        think.logger.info("sessionData:",sessionData);
        if(sessionData && sessionData.openid){
            userInfo = await this.model('user').findUser({openid:sessionData.openid});
        }
        //签名正确写入缓存
        const userData = {
            code,
            openid: sessionData.openid,
            session_key:sessionData.session_key,
            userInfo
        }
        think.logger.info("用户信息写入缓存 code:"+code,  userData);
        await this.cache(code, userData);
        await this.model('user').addUser({
            openid: userData.openid
        });
        result.data = userData;
        result.success = true;
        return this.json(result);
    }
   
    async setUserAction() {
        const signature = this.ctx.post('signature');
        const rawData = this.ctx.post('rawData');
        const headers = this.ctx.headers;
        const code = headers && headers['code'] || '';
        think.logger.info("setUser rawData:"+rawData);
        think.logger.info("setUser signature:"+signature);
        think.logger.info("setUser code:"+code);

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

        think.logger.info("code:"+code,  sessionData);

        if (!sessionData ||  !sessionData.session_key) {
            result.success = false;
            result.errorMsg = sessionData &&  sessionData.errmsg || "code在缓存中没有找到";
            think.logger.error("set User error:",  result.errorMsg);
            return this.json(result);
        }
        const isSignOk = this.checkSignature(sessionData.session_key, rawData, signature);
        if (!isSignOk) {
            result.success = false;
            result.errorMsg = "签名校验出错";
            think.logger.error("set User error:",  result.errorMsg);
            return this.json(result);
        }
        //签名正确写入缓存
        const userData = {
            code,
            openid: sessionData.openid,
            session_key:sessionData.session_key,
            userInfo:JSON.parse(rawData)
        }
        this.model('user').updateUser(userData);

        await this.cache(code, userData);
        think.logger.info("用户信息写入缓存 code:"+code,  userData);
        result.data = userData;
        result.success = true;
        return this.json(result);
    }
    checkSignature(sessionKey, rawData, signature) {
        
        const signature2 = SHA.sha1ByJSON(rawData + sessionKey);
        think.logger.info("checkSignature:");
        think.logger.info("sessionKey:",  sessionKey);
        think.logger.info("rawData:", typeof  rawData);
        think.logger.info("rawData:",  rawData);
        think.logger.info("signature:",  signature);
        think.logger.info("signature2:",  signature2);
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