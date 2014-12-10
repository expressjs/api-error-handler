
# api-error-handler

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![Gittip][gittip-image]][gittip-url]

An error handler for JSON APIs, meant to be used with [http-errors](https://github.com/jshttp/http-errors)-style errors.

## Example

```js
var errorHandler = require('api-error-handler');

var api = new express.Router();
api.get('/users/:userid', function (req, res, next) {

});

api.use(errorHandler());

app.use('/api', api);
```

## API

### .use(errorHandler([options]))

Currently no options.

### Errors

4xx errors are exposed to the client.
Properties exposed are:

- `message`
- `type`
- `name`
- `code`
- `status`

5xx errors are not exposed to the client.
Instead, they are given a generic `message` as well as the `type`.

[gitter-image]: https://badges.gitter.im/expressjs/api-error-handler.png
[gitter-url]: https://gitter.im/expressjs/api-error-handler
[npm-image]: https://img.shields.io/npm/v/api-error-handler.svg?style=flat-square
[npm-url]: https://npmjs.org/package/api-error-handler
[github-tag]: http://img.shields.io/github/tag/expressjs/api-error-handler.svg?style=flat-square
[github-url]: https://github.com/expressjs/api-error-handler/tags
[travis-image]: https://img.shields.io/travis/expressjs/api-error-handler.svg?style=flat-square
[travis-url]: https://travis-ci.org/expressjs/api-error-handler
[coveralls-image]: https://img.shields.io/coveralls/expressjs/api-error-handler.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/expressjs/api-error-handler
[david-image]: http://img.shields.io/david/expressjs/api-error-handler.svg?style=flat-square
[david-url]: https://david-dm.org/expressjs/api-error-handler
[license-image]: http://img.shields.io/npm/l/api-error-handler.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/api-error-handler.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/api-error-handler
[gittip-image]: https://img.shields.io/gratipay/jonathanong.svg?style=flat-square
[gittip-url]: https://gratipay.com/expressjs/
