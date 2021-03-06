var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv-safe').config();

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var orderRouter = require('./routes/order');
var productRouter = require('./routes/product');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/order', orderRouter);
app.use('/product', productRouter);

module.exports = app;
