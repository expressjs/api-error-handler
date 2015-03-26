
var statuses = require('statuses');


module.exports = function (options) {
	return function apiErrorHandler(err, req, res, next) {
		var stack = true;
		var opts = options || {};
		opts.noStackEnvs = opts.hasOwnProperty('noStackEnvs')? opts.noStackEnvs: 'production'; // allow for empty string (stack for all)
		if(typeof(opts.noStackEnvs) != 'string')
			throw new Error('noStackEnvs option must be a string')

		opts.noStackEnvs.split(',').forEach(function(env) {
			if(env.trim() == process.env.NODE_ENV.toLowerCase())
				stack = false;
		})

		var status = err.status || err.statusCode || 500;
		if (status < 400) status = 500;
		res.statusCode = status;

		var body = {
			status: status
		};

		if (stack) body.stack = err.stack;

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
