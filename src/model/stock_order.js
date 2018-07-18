module.exports = class extends think.Model {
  async createStock(stock) {
    const insertId = await this.add({ sid: stock.id, name: stock.name });
    return insertId;
  }
};
