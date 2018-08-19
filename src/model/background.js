module.exports = class extends think.Model {
    async getAllBackground() {
        let lists = await this.where({mark:0}).getField('img');
        //mark == 1 表示当前背景
        let curPic = await this.where({mark:1}).find()
        // let ids = list.map(item => {
        // return item.id;
        // });
        // let data = await this.where({id: ['IN', ids]}).select()
        return {
            lists,
            cur : curPic.img
        };
    }
    async setBackground(imgUrl) {
        if (imgUrl == '') return;
        await this.where({ mark: 1 }).update({mark:0})
        await this.where({img:imgUrl}).update({mark:1})
    }
};
