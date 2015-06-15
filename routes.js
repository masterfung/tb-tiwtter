var express = require('express');
var passport = require('passport');
var router = express.Router();

app.get('/api/tweets', function (req, res) {
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

app.get('/api/tweets/:tweetId', function(req, res) {
  var tweet = _.find(fixtures.tweets, 'id', req.params.tweetId);

  if (!tweet) {
    return res.sendStatus(404)
  }

  return res.send({tweet: tweet})

});

app.delete('/api/tweets/:tweetId', function(req, res) {
  var tweetNum = req.params.tweetId;

  var deleteTweet = null;

  for (var i = 0; i < fixtures.tweets.length; i++) {
    if (fixtures.tweets[i].id === tweetNum) {
      deleteTweet = fixtures.tweets[i];
      fixtures.tweets.splice(i, 1);
    }
  }

  console.log(deleteTweet);

  if (!deleteTweet) {
    return res.sendStatus(404);
  }

  return res.sendStatus(200);
});

app.get('/api/users/:userId', function (req, res) {
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

app.post('/api/users', function(req, res) {
  var id, name, email, password;

  var user = req.body.user.id;

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

  return res.sendStatus(200);


});

app.post('/api/tweets', function(req, res) {
  var userId, text;
    if (req.body.tweet) {
      userId = req.body.tweet.userId,
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


module.exports = router;