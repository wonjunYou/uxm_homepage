var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session')
var passport = require('passport');

var indexRouter = require('./routes/index');
var memberRouter = require('./routes/member');
var usersRouter = require('./routes/users');
var noticeRouter = require('./routes/notice');
var photoRouter = require('./routes/photo');
var photoDetailRouter = require('./routes/photo_detail');
var publicationRouter = require('./routes/publication');
var publicationDetailRouter = require('./routes/publication_detail');
var projectRouter = require('./routes/project');
var signInRouter = require('./routes/signin');
var app = express();

var passportConfig = require('./lib/passport-config'); //passport 로그인

//mongodb 연결
const mongoose = require('mongoose');
const connection_string =
	'mongodb+srv://uxm_admin:uxm572127@cluster0.ye6no.mongodb.net/uxmedia?retryWrites=true&w=majority';
mongoose.connect(connection_string, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(methodOverride('_method', {methods: ['POST', 'GET']}));

const sessionStore = new session.MemoryStore();
const sessionId = 'uxm.sid';
const sessionSecret =  'uxmedia'
// session을 사용할 수 있도록.
app.use(session({
  name: sessionId,
  resave: true,
  saveUninitialized: true,
  store: sessionStore,
  secret: sessionSecret
}));
//passport
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;  // passport는 req.user로 user정보 전달
	res.locals.flashMessages = req.flash();
	next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/member', memberRouter);
app.use('/users', usersRouter);
app.use('/project', projectRouter);
app.use('/notice', noticeRouter);
app.use('/photo', photoRouter);
app.use('/photo_detail', photoDetailRouter);
app.use('/publication', publicationRouter);
app.use('/publication_detail', publicationDetailRouter);
app.use('/signin', signInRouter);

//첨부파일
// app.use(function(req,res,next){
// 	res.locals.isAuthenticated = req.isAuthenticated();
// 	res.locals.currentUser = req.user;
// 	res.locals.util = util;
// 	next();
// })

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
