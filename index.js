
var statuses = require('statuses');

module.exports = function () {
  return function apiErrorHandler(err, req, res, next) {
    var status = err.status || err.statusCode || 500;
    if (status < 400) status = 500;
    res.statusCode = status;

    // internal server errors
    if (status >= 500) {
      console.error(err.stack);

      res.json({
        message: statuses[status],
        status: status,
      });
      return;
    }

    // client errors
    var body = {
      message: err.message,
      status: status,
    };

    if (err.code) body.code = err.code;
    if (err.name) body.name = err.name;
    if (err.type) body.type = err.type;

    res.json(body);
  }
}
