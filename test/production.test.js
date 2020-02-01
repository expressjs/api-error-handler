var path = require('path')
var error = require('http-errors');
var request = require('supertest');
var express = require('express');
var assert = require('assert');

var handler

describe('Production behavior', function() {

	before(function() {
		// reset the require cache for this module, so we can reset NODE_ENV 
		delete require.cache[path.join(__dirname, '../index.js')]
		process.env.NODE_ENV = 'production'
		handler = require('..');
	})
	it('NODE_ENV === production', function() {
		assert.equal(process.env.NODE_ENV, 'production')
	})
	it('hides stack by default in production', function(done) {
var app = express();
    app.use(function (req, res, next) {
      next(error(401));
    });
    app.use(handler());

    request(app.listen())
    .get('/')
    .end(function (err, res) {
      assert.ifError(err);

      var body = res.body;
			assert.equal(body.stack, undefined);
			done()
			})
		})
	it('hides stack when showStack is false', function(done) {
var app = express();
    app.use(function (req, res, next) {
      next(error(401));
    });
    app.use(handler({ showStack: false}));

    request(app.listen())
    .get('/')
    .end(function (err, res) {
      assert.ifError(err);

      var body = res.body;
			assert.equal(body.stack, undefined);
			done()
			})
		})
	it('shows stack in production when showStack is true', function(done) {
var app = express();
    app.use(function (req, res, next) {
      next(error(401));
    });
    app.use(handler({showStack: true}));

    request(app.listen())
    .get('/')
    .end(function (err, res) {
      assert.ifError(err);

      var body = res.body;
			assert.notStrictEqual(body.stack, undefined);
			assert.strictEqual(process.env.NODE_ENV, 'production')
			done()
			})
		})
})
