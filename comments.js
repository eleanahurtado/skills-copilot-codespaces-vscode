// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get comments from file
app.get('/comments', function (req, res) {
  fs.readFile('comments.json', 'utf8', function(err, data) {
    res.end(data);
  });
});

// Post comments to file
app.post('/comments', function (req, res) {
  fs.readFile('comments.json', 'utf8', function(err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
      res.end(JSON.stringify(comments));
    });
  });
});

// Start web server
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});