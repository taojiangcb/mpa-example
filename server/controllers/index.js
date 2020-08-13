

const router = require('koa-simple-router');

const BookController = require('./BooksController');
const bookController = new BookController();

const IndexController = require('./IndexController');
const indexController = new IndexController();

const IndexVueController = require('./IndexVueController');
const indexVueController = new IndexVueController();

// const ApiController = require('./ApiController');
// const api = new ApiController();

module.exports = app => {
  app.use(router(_ => {
    _.get('/', indexController.actionIndex);
    // _.get('/', indexVueController.actionIndex);
    // _.get('/html', indexController.actionIndex);
    // _.get('/book/', bookController.actionIndex);
    _.get('/api/book',bookController.actionIndex);
    _.post('/name/:id', (ctx, next) => {
    })
  }));
}