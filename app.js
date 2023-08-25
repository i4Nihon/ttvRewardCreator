const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const crypto = require('crypto');
const  session = require('cookie-session')
const passport = require("passport");
const favicon = require('serve-favicon')
const vhost = require('vhost')

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth');
const addRewardRouter = require('./routes/addReward');
const editRewardRouter = require('./routes/editReward');
const deleteRewardRouter = require('./routes/deleteReward');
const tokenRouter = require('./routes/token');
const homeRouter = require('./routes/home')

const configFile = require("./config");
const config = Object.keys(configFile)


const app = express();

const secretKey = crypto.randomBytes(64).toString('hex');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('config', config);

// Serializacja i deserializacja użytkownika (dla sesji)
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')))

app.use(session({ secret: secretKey, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/addreward', addRewardRouter);
app.use('/editreward', editRewardRouter);
app.use('/deletereward', deleteRewardRouter);
app.use('/home', homeRouter)
app.use(vhost('gettoken.ttvrewardavocado.pl', tokenRouter))
app.use('/token', tokenRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
