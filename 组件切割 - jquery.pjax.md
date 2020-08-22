# 使用jQuery & jquery.pjax 对组件进行切割 ssr
```
layout.html 

 <div id="app">
        {% block content %}{% endblock  %}
    </div>

    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery.pjax/2.0.1/jquery.pjax.js"></script>

    <script>
        $(document).pjax('a', '#app');
    </script>
```

```
BooksController.js

async actionIndex(ctx, next) {
    const html = await ctx.render('books/pages/list');
    const { logger } = ctx;
    console.log(logger);
    if (ctx.request.header['x-pjax']) {
      //从其他页面跳转过来
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
      //直接请求
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
```

利用 pajx 替换 app 的内容