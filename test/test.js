var test = require('tape');
var http = require('http');
var request = require('request');
var onpayload = require('../');
var fs = require('fs');

var runTests = function() {
  test('basic test', function(t) {
    fs.createReadStream(__dirname + '/fixtures').pipe(request('http://localhost:3400', function(err, res, body) {
        t.equal(body, fs.readFile(__dirname + '/fixtures'));
        t.end();
    }));
  });

  test('test limit', function(t) {
    fs.createReadStream(__dirname + '/fixtures2').pipe(request('http://localhost:3400', function(err, res, body) {
        t.ok(err);
        t.equal(err.message, 'socket hang up');
        t.end();
    }));
  });

  test('end', function(t) {
    t.end();
    process.exit();
  });
};

var server = http.createServer(function(req, res) {
  onpayload(req, {limit: 10000}, function(payload) {
    res.end(payload);
  });
});

server.listen(3400, runTests);
