console.log('webpack 的开发环境')
const CopyPlugin = require('copy-webpack-plugin');
const { resolve } = require('path');
module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: resolve(__dirname, '../src/web/views/layouts'), to: resolve(__dirname, '../dist/views/layouts') },
        { from: resolve(__dirname, '../src/web/components'), to: resolve(__dirname, '../dist/components') },
      ]
    })
  ]
}