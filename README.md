request-payload
===============

[![build status](https://secure.travis-ci.org/sorribas/request-payload.png)](http://travis-ci.org/sorribas/request-payload)

Get the payload of an HTTP request. Supports limiting the size of the payload.

## Install

```
npm install request-payload
```

## Usage

Example

```js
var http = require('http');
var payload = require('request-payload');

http.createServer(function(req, res) {
  payload(req, function(body) {
    console.log(body);
    res.end('awesome!');
  });
}).listen(3000);
```

The following example uses the `limit` option, which allows you to limit the size of the payload
to prevent users from overcharging your server. The limit is passed as number of bytes.

```js
var http = require('http');
var payload = require('request-payload');

http.createServer(function(req, res) {
  payload(req, {limit: 10000}, function(body) {
    console.log(body);
    res.end('awesome!');
  });
}).listen(3000);
```
##License

MIT License. View LICENSE.txt for more details.
