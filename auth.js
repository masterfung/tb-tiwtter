var passport = require('passport');
var fixtures = require('./fixtures');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  var conn = require('./db')
    , User = conn.model('User')

  User.findOne({id: id}, function(err, user) {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })



});

passport.use(new LocalStrategy(
  function(username, password, done) {
    var user;
    for (var i = 0; i< fixtures.users.length; i++) {
      if (fixtures.users[i].id === username) {
        user = fixtures.users[i];
      }
    }

    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!user.password || user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }
));

module.exports = passport;
