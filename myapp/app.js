const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const db = require('./db/config');

const app = express();
const port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));  // 사물함 생성과정에서 hasOwnProperty 함수를 쓰기위해 변경
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret : 'OpenYearRound', // 암호화 하는 값인것 같습니다. 안 되면 'secret cat' 으로 변경해 주세요.
  resave : false,
  saveUninitialized : true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.error(err.stack);
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.send('잘못된 접근입니다.');
  res.render('error');
});
module.exports = app;
