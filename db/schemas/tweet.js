var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({
  userId: { type: String,	required: true },
  created: { type: Number,	required: true, default: Date.now()/1000 },
  text: { type: String,	required: true}
});


module.exports = tweetSchema;
