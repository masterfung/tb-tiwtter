var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session  = require('express-session');

var fixtures  = require('./fixtures');
var passport = require('./auth');
var routes = require('./routes');

var config = require('./config');

var app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

var server = app.listen(config.get('server:port'), config.get('server:host'), function () {
  console.log('App Listening @ running');
});

module.exports = server;
