const mysql = require('think-model-mysql');
/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
  type: 'mysql',
  common: {
    logConnect: true,
    logSql: true,
    logger: msg => think.logger.info(msg)
  },
  mysql: {
    handle: mysql,
    database: 'wechat_app',
    // prefix: 'think_',
    connectionLimit: 100,
    encoding: 'utf8mb4',
    charset: 'utf8mb4',
    host: '',
    port: '3306',
    user: 'root',
    password: '123456',
    dateStrings: true
  }
};
