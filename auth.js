var passport = require('passport');
var fixtures = require('./fixtures');
var LocalStrategy = require('passport-local').Strategy;

var conn = require('./db')
  , User = conn.model('User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {

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
    User.findOne({id: username},
    function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })

  }
));

module.exports = passport;
