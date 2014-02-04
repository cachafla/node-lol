/*
 * Copyright (c) 2013, Andres Rodriguez. All rights reserved.
 */

var assert = require('assert-plus');
var Client = require('../lib/client');

var config = require('./config.json');
var lol;
var summonerId;

exports.setUp = function (callback) {
	lol = new Client(config);
	callback();
};


exports.testAllChampions = function(test) {
	lol.champion(function (err, obj) {
		test.ifError(err);
		test.ok(obj);
		test.ok(obj.champions);
		test.ok(obj.champions.length);
		test.done();
	});
};


exports.testFreeChampions = function(test) {
	lol.champion({ freeToPlay: true }, function (err, obj) {
		test.ifError(err);
		test.ok(obj);
		test.ok(obj.champions);
		test.ok(obj.champions.length);
		var any = obj.champions[0];
		test.ok(any.freeToPlay);
		test.done();
	});
};


exports.tearDown = function (callback) {
	lol.close();
	callback();
};
