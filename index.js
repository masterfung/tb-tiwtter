var express = require('express');
var fixtures  = require('./fixtures');

var app = express();

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

var server = app.listen(3000, "127.0.0.1", function () {
  console.log('App Listening @ http://127.0.0.1:3000');

});

module.exports = server;
