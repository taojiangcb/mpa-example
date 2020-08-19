
const { resolve } = require('path')
const argv = require('yargs-parser')(process.argv.slice(2));
const { merge } = require('webpack-merge');
// const webpack = require('webpack');
const HtmlWebPlugin = require('html-webpack-plugin');

const { sync } = require('glob');
const files = sync('./src/web/views/**/*.entry.js');

const mode = argv.mode || 'development';
const mergeConfig = require(`./config/webpack.${mode}.js`);

const AfterHtmlPlugin = require('./config/AfterHtmlPlugin')

let _entry = {};
let _plugins = [];

files.reduce((p, item, index) => {
  const fileName = item.replace(
    /\/([\w|-]+)(\.entry\.js)/g,
    (match, $1, $2, offset, str) => {
      p[$1] = str;
      const [dist, template] = $1.split('-');
      _plugins.push(new HtmlWebPlugin({
        template: `./src/web/views/${dist}/pages/${template}.html`,
        filename: `../views/${dist}/pages/${template}.html`,
        inject: false
      }))
    });
  return p;
}, _entry);

const webpackConfig = {
  mode: mode,
  watch: mode === 'development' ? true : false,
  entry: {
    ..._entry,
  },
  resolve: {

  },
  output: {
    path: resolve(__dirname, './dist/assets'),
    filename: 'script/[name].bundle.js'
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },

  resolve: {},
  externals: {
    jquery: 'jQuery',
  },
  
  plugins: [
    ..._plugins,
    new AfterHtmlPlugin(),
  ]
};

module.exports = merge(webpackConfig, mergeConfig); 