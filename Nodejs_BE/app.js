var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var cateRouter = require('./routes/cate');
var cors = require("cors");

// khai bao mongoo
const mongoose = require("mongoose");
require("./model/CategoryModel");
require("./model/ProductModel");
require("./model/UserModel");

// ket noi mongoo

mongoose.connect('mongodb://127.0.0.1:27017/Node_js', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));


var app = express();
var corsOptionsDelegate = function (req, callback) {
  var corsOptions = { origin: true };
  // if (whitelist.indexOf(req.header("Origin")) !== -1) {
  //     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  // } else {
  //     corsOptions = { origin: false }; // disable CORS for this request
  // }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.json({ limit: '50mb' }));
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', cateRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
