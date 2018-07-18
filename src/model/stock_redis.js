module.exports = class extends think.Model {
  async checkStock(sid) {
    const stock = await this.where({ id: sid }).find();
    if (stock.sale >= stock.count) {
      throw new Error('已经没有库存了');
    }
    return stock;
  }

  saleStock(stock) {
    return this.where({ id: stock.id, version: stock.version }).increment({ 'sale': 1, version: 1 });
  }
};
