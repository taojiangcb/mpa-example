

const router = require('koa-simple-router');

const BookController = require('./BooksController');
const bookController = new BookController();

const IndexController = require('./IndexController');
const indexController = new IndexController();

const IndexVueController = require('./IndexVueController');
const indexVueController = new IndexVueController();

const ApiController = require('./ApiController');
const apiController = new ApiController();

module.exports = app => {
  app.use(router(_ => {
    _.get('/', indexController.actionIndex);
    _.get('/index.html', indexController.actionIndex);
    _.get('/book/list', bookController.actionIndex);
    _.get('/book/add', bookController.actionCreate);
    _.get('/api/list', apiController.actionIndex);
  }));
}