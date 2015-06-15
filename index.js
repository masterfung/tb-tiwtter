var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var shortId = require('shortid');
var _ = require('lodash');
// var LocalStrategy = require('passport-local').Strategy;


var fixtures  = require('./fixtures');
var auth = require('./auth');
var routes = require('./routes');

var app = express();

app.use(bodyParser.json());
// app.use(passport.initialize());
// app.use(passport.session());


app.use('/', routes);


var server = app.listen(3000, "127.0.0.1", function () {
  console.log('App Listening @ http://127.0.0.1:3000');

});

module.exports = server;
