# MPA
  服务器渲染模式，后端通过模板渲染界面并且在渲染的时候可以注入相关的数据吐给前端js

# koa-simple-router
  一个简单的 koa 路由插件
```
const router = require('koa-simple-router');

module.exports = app => {
  app.use(router(_ => {
    _.get('/', indexVueController.actionIndex);
    // _.get('/html', indexController.actionIndex);
    // _.get('/book/', bookController.actionIndex);
    _.get('/api/book',bookController.actionIndex);
    _.post('/name/:id', (ctx, next) => {
    })
  }));
}
```

# koa2-connect-history-api-fallback
koa2的一个中间件，用于处理vue-router使用history模式返回index.html，让koa2支持SPA应用程序。

```
$ npm install --save 'koa2-connect-history-api-fallback'
```

```
const Koa = require('koa');
const { historyApiFallback } = require('koa2-connect-history-api-fallback');
// 或者当你使用 ES6 语法，你可以这样
import { historyApiFallback } from 'koa2-connect-history-api-fallback';
// 或者
import historyApiFallback from 'koa2-connect-history-api-fallback';
 
const app = new Koa();
 
// handle fallback for HTML5 history API
app.use(historyApiFallback({ whiteList: ['/api'] }));
 
// other middlewares
app.use(...);
```