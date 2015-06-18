var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({
  userId: { type: String,	required: true },
  created: { type: Number,	required: true, default: Date.now()/1000 },
  text: { type: String,	required: true}
});

tweetSchema.methods.toClient = function() {
  var tweet = {
    id: this._id,
    userId: this.userId,
    created: this.created,
    text: this.text
  }
  return tweet;
};

module.exports = tweetSchema;
