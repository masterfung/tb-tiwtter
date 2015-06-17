var mongoose = require('mongoose');
var config = require('../config');
var User = require('./schemas/user');
var Tweet = require('./schemas/tweet');

console.log(config.get('database:name'));

var connection = mongoose.createConnection(config.get('database:host'), config.get('database:name'), config.get('database:port'));

connection.on('error', console.error.bind(console, 'Connection error'));

connection.once('open', function () {
	console.log("Connection with database succeeded.");
});

module.exports = connection;
