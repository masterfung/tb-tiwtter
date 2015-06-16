var express = require('express');
var passport = require('./auth');
var router = express.Router();
var shortId = require('shortId');
var _ = require('lodash');

var fixtures = require('./fixtures');


function ensureAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.sendStatus(403);
};

router.get('/api/tweets', function (req, res) {
  var userId = req.query.userId;

  if (!userId) {
    return res.sendStatus(400);
  }

  var tweets = [];
  for (var i = 0; i < fixtures.tweets.length; i++) {
    if (fixtures.tweets[i].userId === userId) {
      tweets.push(fixtures.tweets[i]);
    }
  }

  var tweetsSorted = tweets.sort(function(t1, t2) {
    if (t1.created > t2.created) {
      return -1;
    } else if (t1.created === t2. created) {
      return 0;
    } else {
      return 1;
    }
  });

  return res.send({
    tweets: tweetsSorted
  });
});

router.get('/api/tweets/:tweetId', function(req, res) {
  var tweet = _.find(fixtures.tweets, 'id', req.params.tweetId);

  if (!tweet) {
    return res.sendStatus(404);
  }

  return res.send({tweet: tweet});

});

router.delete('/api/tweets/:tweetId', ensureAuthentication, function(req, res) {

  var deleteTweets;

  var verify = _.pluck(_.where(fixtures.tweets, {'id': req.params.tweetId, 'userId': req.user.id}), 'userId');

  if (verify[0] === req.user.id) {
    deleteTweets = _.remove(fixtures.tweets, 'id', req.params.tweetId)
  }

  if (!deleteTweets) {
    return res.sendStatus(403);
  }

  return res.sendStatus(200);
});

router.get('/api/users/:userId', function (req, res) {
  var userId = req.params.userId;
  var user = null;

  for (var i = 0; i < fixtures.users.length; i++) {
    if (fixtures.users[i].id === userId) {
      user = fixtures.users[i];
    }
  }

  if (!user) {
    return res.sendStatus(404);
  }

  return res.send({
    user: user
  });
});

router.post('/api/users', function(req, res) {
  var id, name, email, password;

  var user = req.body.user;

  if (req.body.user) {
    id = req.body.user.id;
    name = req.body.user.name;
    email = req.body.user.email;
    password = req.body.user.password;
  }


  for (var i = 0; i < fixtures.users.length; i++) {
    if (fixtures.users[i].id === user) {
      return res.sendStatus(409);
    }
  }

  fixtures.users.push({
    id: id,
    name: name,
    email: email,
    password: password,
    followingIds: []
  })

  req.login(user, function(err) {
    if (err) {
      return res.sendStatus(500);
    }
    return res.sendStatus(200);
  });

});

router.post('/api/auth/logout', function(req, res) {
  req.session.destroy(function (err) {
    return res.sendStatus(200);
});
});

router.post('/api/tweets', ensureAuthentication, function(req, res) {
  var userId, text;

  if (req.body.tweet) {
    userId = req.user.id,
    text = req.body.tweet.text
  }

  var tweetMessage = {
    id: shortId.generate(),
    text: text,
    created: Date.now() / 1000,
    userId: userId
  }

  fixtures.tweets.push(tweetMessage);

  return res.json({tweet: tweetMessage});
});

router.post('/api/auth/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.sendStatus(500);
    }
    if (!user) {
      return res.sendStatus(403);
    }
    req.login(user, function(err) {
      if (err) {
        return res.sendStatus(500);
      }
      return res.send({user: user})
    });
  })(req, res);
});

module.exports = router;
