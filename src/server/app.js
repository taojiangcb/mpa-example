const Koa = require('koa');
const { port, appPath } = require('./config');
const initRouters = require('./controllers');
const render = require('koa-swig');
const serve = require('koa-static');
const co = require('co');
const log4js = require('log4js');
const errorMiddleware = require('./middlewares/errorMiddleware');

const { historyApiFallback } = require('koa2-connect-history-api-fallback');
const app = new Koa();

log4js.configure({
  appenders: { cheese: { type: 'file', filename: './logs/yd.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');
logger.error('错误日志监听成功');

errorMiddleware.error(app, logger);

app.use(serve(appPath.assets));
initRouters(app);

/*** 指定swig的模板*/
app.context.render = co.wrap(render({
  root: appPath.view,     //指定目录   
  autoescape: true,       
  cache: process.env.NODE_ENV ? false : 'memory', // disable, set to false
  ext: 'html',
  varControls: ["[[", ']]'],                      //修改模板的参数注入
  writeBody: false
}))

//利用historyApiFallback 进行404虚路由重定向处理
app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }));

app.listen(port, () => {
  console.log('server started');
})