class AfterHtmlPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('AfterHtmlPlugin', compilation => {
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(
        'AfterHtmlPlugin',
        data => {
          // console.log('获取到的data：', data)
          const matched = /views\/([a-zA-Z]+)\/pages\/([a-zA-Z]+)\.html/.exec(data.plugin.options.filename)

          const filename = `${matched[1]}-${matched[2]}`
          console.log('匹配：', filename);

          data.assets.js = data.assets.js.filter(item => {
            return item.includes(filename)
          })

          data.assets.css = data.assets.css.filter(item => {
            return item.includes(filename)
          })

          const jsArray = data.assets.js.map(url => {
            return `<script src="${url}"></script>`
          })

          const cssArray = data.assets.css.map(url => {
            return `<link href="${url}" rel="stylesheet" />`
          })
          // todo: 排除掉不需要的js
          data.html = data.html.replace('<!--injectjs-->', jsArray.join(''))
          data.html = data.html.replace('<!--injectcss-->', cssArray.join(''))
        }
      )
    })
  }
}
// htmlWebpackPluginAfterHtmlProcessing
//   <!--injectjs-->

module.exports = AfterHtmlPlugin
