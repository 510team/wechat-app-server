const Base = require('./base.js');
var redis = require('redis');
var test = { a: 1 };
module.exports = class extends Base {
  indexAction() {
    return this.json({ status: 'ok' });
  }
  async saleAction() {
    const sid = this.ctx.param('sid');
    const stockModel = this.model('stock');
    const stockOrderModel = this.model('stock_order');
    if (sid) {
      const stock = await stockModel.checkStock(sid);
      think.logger.info('stock', stock);
      const data = await stockModel.saleStock(stock);
      think.logger.info('data', data);
      if (data === 1) {
        const id = await stockOrderModel.createStock(stock);
        return this.json({ id });
      }
    }
    // return this.json({ status: 'ok' });
  }
  testobjectAction() {
    test.a++;
    think.logger.info('test', test);
    return this.json(test);
  }
  async testAction() {
    this.ctx.state.requestId = Math.random() + new Date().getTime(); ;
    const client = redis.createClient();
    const { promisify } = require('util');
    const getAsync = promisify(client.get).bind(client);
    const res = await getAsync('foo');
    console.log('requestId', this.ctx.state.requestId);
    return this.json({ res });
  }
};
