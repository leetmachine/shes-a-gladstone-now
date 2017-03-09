var express = require('express');
var expressHbs = require('express-handlebars');
var Handlebars = require('handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var flash = require('connect-flash');
var helmet = require('helmet');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(helmet());

//mongoose.connect('localhost:27017/wedding-website');

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var mongodbUri = 'mongodb://leetmachine:Mxolch846!@ds121980.mlab.com:21980/wedding-website';

mongoose.connect(mongodbUri, options);

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 180 * 60 * 1000}
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.session = req.session;
  next();
});

app.use(flash());

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

Handlebars.registerHelper('disabled', function(item, options){
  if(item.qty <= 0) {
    return "disabled";
  } else {
    return "";
  }
});


Handlebars.registerHelper('soldoutDesc', function(item, options){
  if(item.qty <= 0) {
    return "<p class=\"gotham-thin\">SOLD OUT</p>";
  } else {
    return "<p class=\"gotham-thin\">" + item.description +"</p>";
  }
});


module.exports = app;
