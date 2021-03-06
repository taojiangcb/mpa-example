const errorHandler = {
  error(app, logger) {
    app.use(async (ctx, next) => {
      try { await next(); }
      catch (error) {
        logger.error(error);
        ctx.status = ctx.status || 500;
        ctx.body = '服务500 错误'
      }
    })

    app.use(async (ctx, next) => {
      await next();
      if (404 == ctx.status) {
        ctx.status = 200;
        ctx.body = `<script type="text/javascript" src="http://qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js"></script>`;
      }
    });
  }
}
module.exports = errorHandler;