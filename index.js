var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session  = require('express-session');

var fixtures  = require('./fixtures');
var passport = require('./auth');
var routes = require('./routes');

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

var server = app.listen(3000, "127.0.0.1", function () {
  console.log('App Listening @ http://127.0.0.1:3000');

});

module.exports = server;
