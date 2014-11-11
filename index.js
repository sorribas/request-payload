var utf8Stream = require('utf8-stream');
var pump = require('pump');
var Writable = require('stream').Writable;

var requestPayload = function(req, opts, cb) {
  if (typeof opts === 'function') return requestPayload(req, {}, opts);
  var u8 = utf8Stream();

  var buffer = '';
  var length = 0;
  var writable = new Writable();
  writable._write = function(chunk, enc, cb) {
    length += chunk.length;
    buffer += chunk;
    cb();
  };
  writable._
  writable.destroy = function() {
    this.emit('close');
  };

  pump(req, u8, writable, function() {
    cb(buffer);
  });
};

module.exports = requestPayload;
