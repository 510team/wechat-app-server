const request = require('superagent');
const handler = (method, sTime, requestUrl, data, resolve, reject) => {
    return (err, res) => {
        if (err) {
            think.logger.info('api response:error' + JSON.stringify(err));
            resolve({
                Error: err,
                ErrMsg: 'proxy error',
                ErrNo: 2000,
                method: method,
                time: Date.now() - sTime,
                url: requestUrl,
                data: data
            });
        } else {
            try {
                const data = JSON.parse(res.text);
                if (data) {
                    if (
                        !data.result_code ||
                        data.result_code !== 'success' ||
                        res.text.length < 1000
                    ) {
                        think.logger.info(
                            'api response:' + JSON.stringify(data)
                        );
                    } else {
                        think.logger.info('api response:' + ' success!!');
                    }
                }
                resolve(data);
            } catch (e) {
                reject(e);
            }
        }
    };
};
// 日志
const logInfo = (requestUrl, method, data, cookie) => {
    const logArray = [];
    logArray.push('url:[' + requestUrl + ']');
    logArray.push('method:[' + method + ']');
    logArray.push('data:[' + JSON.stringify(data) + ']');
    logArray.push('cookie:[' + cookie + ']');
    think.logger.info('api request:' + logArray.join(','));
};
module.exports = {
    send(options = {}) {
        const requestUrl =  (options.url || '');
        const sTime = Date.now();
        const method = options.method;
        const data = options.data || {};
        const cookie = options.cookie || '';
        const type = 'form';
        const timeout = 10000;
        // 日志
        logInfo(requestUrl, method, data, cookie);
        let params = method == 'post' ? 'send' : 'query';
        if (method === 'post') {
            return new Promise((resolve, reject) => {
                let req = request.post(requestUrl);
                // 文件上传 需要： attach，field
                if (
                    options.type &&
                    options.type.indexOf('multipart/form-data') > -1
                ) {
                    req = req.attach('file', options.file.file.path);
                    Object.keys(data).forEach(item => {
                        req = req.field(item, data[item] || '');
                    });
                } else {
                    req = req.send(data);
                }
                req.type(type)
                    .set('Cookie', cookie)
                    .timeout(timeout)
                    .end(
                        handler(
                            method,
                            sTime,
                            requestUrl,
                            data,
                            resolve,
                            reject
                        )
                    );
            });
        } else {
            return new Promise((resolve, reject) => {
                request[method](requestUrl)
                    [params](data)
                    .set('Cookie', cookie)
                    .timeout(timeout)
                    .end(
                        handler(
                            method,
                            sTime,
                            requestUrl,
                            data,
                            resolve,
                            reject
                        )
                    );
            });
        }
    }
};
