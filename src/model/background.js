module.exports = class extends think.Model {
    async getAllBackground() {
        let lists = await this.where({ mark: 0 }).getField('img');
        //mark == 1 表示当前背景
        let curPic = await this.where({ mark: 1, canShow: 1 }).find();
        think.logger.info('All backgrounds:', lists);
        think.logger.info('Now background is :', curPic.img);
        return {
            lists,
            cur: curPic.img
        };
    }
    async setBackground(imgUrl) {
        if (imgUrl == '') return;
        const img = imgUrl.match(/\/static\/.*/)[0];
        think.logger.info('setBackground: ' + img);
        await this.where({ mark: 1 }).update({ mark: 0 });
        await this.where({ img: img }).update({ mark: 1 });
    }
    async addBackground(openid,finalFileName,uploadFold){
        const url = uploadFold === 'www/static' ? '/static' : 'https://cdn.adazhang.com/';
        await this.where({ mark: 1 }).update({ mark: 0 });
        await this.add({ openid: openid, img:`${url}/${finalFileName}`, mark: 1 });
    }
    async hasPrivilege(openid){
        const url = uploadFold === 'www/static' ? '/static' : 'https://cdn.adazhang.com/';
        return true;
    }
};
