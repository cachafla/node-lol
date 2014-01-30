/*
 * Copyright (c) 2013, Andres Rodriguez. All rights reserved.
 */

var assert = require('assert-plus');
var Client = require('../lib/client');

var config = require('./config.json');
var lol;
var summonerId = 39256584;

exports.setUp = function (callback) {
	lol = new Client(config);
	callback();
};


exports.testGameBySummoner = function(test) {
	lol.gameBySummoner(summonerId, function (err, games) {
		test.ifError(err);
		test.ok(games);
		test.ok(games.length);
		test.done();
	});
};


exports.tearDown = function (callback) {
	lol.client.close();
	callback();
};
