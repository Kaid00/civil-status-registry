const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// ENVIRONMENT
dotenv.config({ path: './config.env' });

// DB CONFIG
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

// ROUTERS
const viewRouter = require('./routes/viewRoutes')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/usersRoutes');
const marriageRouter = require('./routes/marriageRoutes');
const birthRouter = require('./routes/birthRoutes');


const app = express();

// 1) Global middleware

// CSP 
app.use((req, res, next) => {
 
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "default-src 'self' http://127.0.0.1:3000/api/users/login; font-src 'self' https:; img-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https:; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; connect-src http://localhost:3000; frame-src 'self' http://localhost:3000"
  )
  next();
})


// Set Security HTTP Headers
app.use(helmet());

// Limit request from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});
app.use('/', limiter);

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

// Body parser, reading data from body into req.body
app.use(express.json());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['born_on', 'surname', 'givenname'],
  })
);

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));


// ROUTES
app.use('/', viewRouter);
app.use('/api/users', usersRouter);
app.use('/api/certificates', marriageRouter, birthRouter);




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
