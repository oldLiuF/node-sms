import router from './routes/index'
import express from 'express'
import passport from 'passport'
// import session from 'express-session'
// import connectMysql from 'express-mysql-session'
// import dbConf from './config/db'
// import multer from 'multer'

var path = require('path')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var app = express()
app.use(passport.initialize())
// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json()) // 格式化 body 内容
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(multer())

app.use(cookieParser()) // 格式化 cookie
app.use(express.static(path.join(__dirname, 'public')))

/* const MySqlStore = connectMysql(session)

app.use(session({
  secret: 'oldLiu', // 用来对session id相关的cookie进行签名
  resave: false, // 是否每次都重新保存会话
  saveUninitialized: false, // 是否自动保存未初始化的会话
  store: new MySqlStore(dbConf),
  cookie: {
    secure: false, // 只有 https 可以使用 cookie
    maxAge: 2 * 60 * 1000 // 最大存储时间
  }
})) */

app.all('*', (req, res, next) => {
  console.log(req.session)
  res.header('Access-Control-Allow-Credentials', true) // 可以带cookies
  next()
})

router(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// app.on('data', )

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500).send(err.message)
  // res.render('error')
})

module.exports = app
