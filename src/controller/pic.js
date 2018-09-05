const data = require('../data/gifPics');

module.exports = class extends think.Controller {
    async indexAction() {
        return this.json(data)
    }
}