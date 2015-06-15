var passport = require('passport');
var fixtures = require('./fixtures');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  fixtures.users.findById(id, function (err, user) {
    if (!user) {
      done(null, false);
    } else {
      done(err, user.id);
    }
  });
});

module.exports = passport;
