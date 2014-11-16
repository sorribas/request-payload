var requestPayload = function(req, opts, cb) {
  if (typeof opts === 'function') return requestPayload(req, {}, opts);

  var buffer = '';
  var length = 0;
  
  req.setEncoding('utf-8');
  req.on('data', function(data) {
    if (opts.limit && (length += Buffer.byteLength(data)) > opts.limit) return req.destroy();
    buffer += data;
  });
  req.on('end', function() {
    cb(buffer);
  });
};

module.exports = requestPayload;
