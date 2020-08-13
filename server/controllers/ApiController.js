const Books = require('../models/Books');

class ApiController {
  constructor() { }

  async actionIndex(ctx, next) {
    const book = new Books();
    const result = await book.getData();
    ctx.body = result;
  }
}

module.exports = ApiController;