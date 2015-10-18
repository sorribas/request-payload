var StringDecoder = require('string_decoder').StringDecoder;

var requestPayload = function(req, opts, cb) {
  if (typeof opts === 'function') return requestPayload(req, {}, opts);

  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  var length = 0;
  
  req.on('data', function(data) {
    if (opts.limit && (length += data.length) > opts.limit) return req.destroy();
    buffer += decoder.write(data);
  });
  req.on('end', function() {
    cb(buffer + decoder.end());
  });
};

module.exports = requestPayload;
