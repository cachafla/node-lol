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


exports.testLeagueBySummoner = function(test) {
	lol.leagueBySummoner(summonerId, function (err, leagues) {
		test.ifError(err);
		test.ok(leagues);
		test.ok(leagues.length);
		test.done();
	});
};


exports.tearDown = function (callback) {
	lol.close();
	callback();
};
