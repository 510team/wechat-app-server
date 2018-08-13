module.exports = class extends think.Model {
    async addFeedback(openid, content) {
        const contentId = await this.add({ openid: openid, content: content});
        return contentId;
    }
};
