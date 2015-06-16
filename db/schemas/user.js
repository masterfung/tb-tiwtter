var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  id: { type: String,	required: true, unique: true },
  name: { type: String,	required: true },
  email: { type: String,	required: true, unique: true },
  password: { type: String,	required: true},
  followingIds: { type: [String],	required: true, default: [] }
});

module.exports = userSchema;
