/*
 * Copyright (c) 2013, Andres Rodriguez. All rights reserved.
 */

var assert = require('assert-plus');
var Client = require('../lib/client');

var config = require('./config.json');
var lol;
var summonerId = 5908;

exports.setUp = function (callback) {
	lol = new Client(config);
	callback();
};


exports.testGameBySummoner = function(test) {
	lol.gameBySummoner(summonerId, function (err, obj) {
		test.ifError(err);
		test.ok(obj);
		test.ok(obj.summonerId);
		test.equal(obj.summonerId, summonerId);
		test.ok(obj.games);
		test.ok(obj.games.length);
		test.done();
	});
};


exports.tearDown = function (callback) {
	lol.close();
	callback();
};
