const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

dotenv.config({ path: './config.env' });
// DB
const DB = 'mongodb://localhost:27017/civil-registry';
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database connected');
  });

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const marriageRouter = require('./routes/marriage');
const birthRouter = require('./routes/birth');

const app = express();
// 1) Global middleware
// Set Security HTTP Headers
app.use(helmet());

// Limit request from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});
app.use('/', limiter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/certificates', marriageRouter, birthRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
