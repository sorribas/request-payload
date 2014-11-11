var test = require('tape');
var http = require('http');
var request = require('request');
var onpayload = require('./');
var fs = require('fs');

var runTests = function() {
  test('basic test', function(t) {
    fs.createReadStream('./fixtures').pipe(request('http://localhost:3400', function(err, res, body) {
        t.equal(body, fs.readFile('./fixtures'));
        t.end();
    }));
  });

  test('end', function(t) {
    t.end();
    process.exit();
  });
};

var server = http.createServer(function(req, res) {
  onpayload(req, function(payload) {
    res.end(payload);
  });
});

server.listen(3400, runTests);
