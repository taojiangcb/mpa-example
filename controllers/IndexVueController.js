const Books = require('../models/Books');

class IndexVueController {
  constructor() { 
  }

  async actionIndex(ctx, next) {
    ctx.body = await ctx.render('index-view')
    // const book = new Books();
    // const result = await book.getData();
    // ctx.body = result;
    // ctx.body = "I'm a index page";
  }
}

module.exports = IndexVueController;