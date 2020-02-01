
var statuses = require('statuses');

var isProduction = process.env.NODE_ENV === 'production';

module.exports = function (options) {
	var opts = options || {}

	if (typeof opts.showStack === 'undefined') {
		// if showStack is not set, set it to false when in production
		// otherwise, if not set and not in production, set it to true
		opts.showStack = !isProduction
		}
	if (typeof opts.showStack !== 'boolean') {
			throw new Error('Expected boolean value for showStack option')
		}

  return function apiErrorHandler(err, req, res, next) {
    var status = err.status || err.statusCode || 500;
    if (status < 400) status = 500;
    res.statusCode = status;

    var body = {
      status: status
    };

    if (opts.showStack) body.stack = err.stack;

    // internal server errors
    if (status >= 500) {
      console.error(err.stack);
      body.message = statuses[status];
      res.json(body);
      return;
    }

    // client errors
    body.message = err.message;

    if (err.code) body.code = err.code;
    if (err.name) body.name = err.name;
    if (err.type) body.type = err.type;

    res.json(body);
  }
}
