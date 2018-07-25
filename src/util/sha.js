const crypto = require('crypto');
module.exports = {
    sha1ByJSON(content){
        const hash = crypto.createHash('sha1')
        hash.update(content);
        return hash.digest('hex');
    }
}