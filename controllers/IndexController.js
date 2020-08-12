const Books = require('../models/Books');

class IndexController {
  constructor() { 

  }

  async actionIndex(ctx, next) {
    ctx.body = await ctx.render('index',{
      data:'this is vue data'
    });
    // const book = new Books();
    // const result = await book.getData();
    // ctx.body = result;
    // ctx.body = "I'm a index page";
  }
}

module.exports = IndexController;