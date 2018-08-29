
var error = require('http-errors');
var request = require('supertest');
var express = require('express');
var assert = require('assert');

var handler = require('..');

describe('API Error Handler', function () {
  it('5xx', function (done) {
    var app = express();
    app.use(function (req, res, next) {
      next(error(501, 'lol'));
    });
    app.use(handler());

    request(app.listen())
    .get('/')
    .expect(501)
    .end(function (err, res) {
      assert.ifError(err);

      var body = res.body;
      assert.equal(body.message, 'Not Implemented');
      assert.equal(body.status, 501);
      done();
    })
  })

  it('4xx', function (done) {
    var app = express();
    app.use(function (req, res, next) {
      next(error(401, 'lol', {
        type: 'a',
        code: 'b'
      }));
    });
    app.use(handler());

    request(app.listen())
    .get('/')
    .expect(401)
    .end(function (err, res) {
      assert.ifError(err);

      var body = res.body;
      assert.equal(body.message, 'lol');
      assert.equal(body.status, 401);
      assert.equal(body.type, 'a');
      assert.equal(body.code, 'b');
      done();
    })
  })

  it('exposeAdditionalProperties', function (done) {
    var app = express();
    app.use(function (req, res, next) {
      next(error(401, { foobar: 123 }));
    });
    app.use(handler({ exposeAdditionalProperties: true }));

    request(app.listen())
    .get('/')
    .expect(401)
    .end(function (err, res) {
      assert.ifError(err);

      var body = res.body;
      assert.equal(body.foobar, 123);
      assert.equal(body.status, 401);
      done();
    })
  })
})
