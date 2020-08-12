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

### System.js
在不支持 mudule 的时候 非常有用，能将es6 的 module transform 到 es5 使用，但是需要配合 babel 全家桶才能使用。

@babel/plugin-transform-modules-systemjs
@babel/cli
@babel/core

- 配置.babelrc文件 
```
{
  "plugins":["@babel/plugin-transform-modules-systemjs"]
}
```

- 使用babel cli 编译对应的 文件

```
"client:build": "babel ./assets/script/index.js -o ./assets/script/index.bundle.js"
```

- 使用编译后的文件 
```
<script src="https://cdn.bootcss.com/systemjs/6.3.1/system.js"></script>
  <script type='nomodule'>
    console.log('this is nosupper module');
    System.import('/script/index.bundle.js')
      .then(res=>{
        console.log('使用System Module',res.default);
      })
  </script>
```

# rize + puppteer 页面测试