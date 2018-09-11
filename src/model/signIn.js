module.exports = class extends think.Model {
    async signIn(openid) {
        let count = 1;
        let point = 20;
        let lastSignInRecord = await this.model('signIn').where({ openid: openid }).order('sign_time DESC').limit(0,1).select();
        let maxPointRecord = await this.getShare(openid);
        console.log('maxPointRecord',maxPointRecord);
        if(lastSignInRecord.length){
            if(new Date().setHours(0,0,0,0) - (new Date(lastSignInRecord[0].sign_time).getTime()) > 60 * 60 * 24 * 1000){
                count = 1;
            }else{
                count = lastSignInRecord[0].count === 7 ? 1 : lastSignInRecord[0].count + 1;
            }
            point = count === 6 ? 100 : 20
        }
        await this.model('signIn').add({ openid: openid,count : count});
        await this.model('point').add({ openid: openid,point : point, total_point: maxPointRecord + point});
        return count;
    }
    async canSignIn(openid){
        let can_sign_in = false;
        let lastSignInRecord = await this.model('signIn').where({ openid: openid }).order('sign_time DESC').limit(0,1).select();
        if(lastSignInRecord.length){
            const lastSignTime = lastSignInRecord[0].sign_time.split(" ")[0];
            const lastSignYear = +lastSignTime.split("-")[0];
            const lastSignMonth = +lastSignTime.split("-")[1];
            const lastSignDay = +lastSignTime.split("-")[2];
            const nowTime = new Date();
            const nowYear = nowTime.getFullYear();
            const nowMonth = nowTime.getMonth() + 1;
            const nowDay = nowTime.getDate();
            if(lastSignYear === nowYear){
                if(lastSignMonth === nowMonth){
                    if(nowDay !== lastSignDay){
                        can_sign_in = true;
                    }
                }else{
                    can_sign_in = true;
                }
            }else{
                can_sign_in = true;
            }
        }else{
            can_sign_in = true;
        }
        return can_sign_in;
    }
    async canShare(openid){
        let can_share = false;
        let lastShareRecord = await this.model('point').where({ openid: openid, point: 30 }).order('sign_time DESC').limit(0,1).select();
        if(lastShareRecord.length){
            if((new Date(lastShareRecord[0].sign_time).getTime() - new Date().setHours(0,0,0,0)) < 0){
                can_share = true;
            }
        }else{
            can_share = true;
        }
        return can_share;
    }
    async share(openid) {
        let point = 0;
        let maxPointRecord = await this.getShare(openid);
        return await this.model('point').add({ openid: openid, point : 30, total_point: maxPointRecord + 30});
    }

    async getShare(openid) {
        return this.model('point').where({ openid: openid }).max('total_point') || 0;
    }
};
