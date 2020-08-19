
const { extend } = require('loadsh');
const { resolve } = require('path');
// const ENV = {
//   DEV: 'development',
//   PROD: 'production'
// }

let config = {
  port: 8081,
  appPath: {
    view: resolve(__dirname, '../views'),
    assets: resolve(__dirname, '../assets'),
  }
}

if (process.env.NODE_ENV === 'development') {
  const localConfig = {
    port: 8081
  }
  config = extend(config, localConfig);
}

if (process.env.NODE_ENV === 'production') {
  const prodConfig = {
    port: 80
  }
  config = extend(config, prodConfig);
}

module.exports = config;