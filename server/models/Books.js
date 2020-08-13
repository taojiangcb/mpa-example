
/**
 * fileoverview 实现Books数据模型
 * @author jiangtao
 */
class Books {
  /**
   * Books的类获取后台有关于数据类
   */

  /**
   * @constructor
   * @param (object) app koa2 的上下文
   */
  constructor(app) {
    this.app = app;
  }

  /**
   * 
   * @param {*} options 配置项
   * @example 
   *  return new Promise
   *  getData(options)
   */
  getData(options) {
    return Promise.resolve("数据请求成功。。");
  }
}

module.exports = Books;