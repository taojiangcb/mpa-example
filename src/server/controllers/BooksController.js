

import { Readable } from 'stream';
import cheerio from 'cheerio';

const Books = require('../models/Books');

class BookController {
  constructor() { }

  async actionIndex(ctx, next) {
    const html = await ctx.render('books/pages/list');
    const { logger } = ctx;
    console.log(logger);
    if (ctx.request.header['x-pjax']) {
      console.log('站内切换');
      logger && logger.logInfo('站内切换');
      ctx.satus = 200;
      ctx.type = 'html';
      const $ = cheerio.load(html);
      $('.pjaxcontent').each(function () {
        ctx.res.write($(this).html());
      })
      ctx.res.end();
    }
    else {
      console.log('直接刷新');
      logger && logger.logInfo('直接刷新');
      //进行bigpiple 处理
      function createSSRstreamPromise() {
        return new Promise((resolve, reject) => {
          const htmlStream = new Readable();
          htmlStream.push(html, "utf-8");
          htmlStream.push(null);
          ctx.satus = 200;
          ctx.type = 'html';
          htmlStream.on('error', err => reject(err)).pipe(ctx.res);
        })
      }
      await createSSRstreamPromise();
    }
  }

  async actionCreate(ctx, next) {
    console.log('actionCreate the books');
    ctx.body = await ctx.render('books/pages/create');
  }
}

module.exports = BookController;