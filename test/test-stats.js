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


exports.testStatsSummaryNoSeason = function(test) {
	lol.statsSummary(summonerId, function (err, summary) {
		test.ifError(err);
		test.ok(summary);
		test.ok(summary.length);
		test.done();
	});
};


exports.testStatsSummaryWithSeason = function(test) {
	lol.statsSummary(summonerId, 'SEASON3', function (err, summary) {
		test.ifError(err);
		test.ok(summary);
		test.ok(summary.length);
		test.done();
	});
};


exports.testStatsRanked = function(test) {
	lol.statsRanked(summonerId, 'SEASON3', function (err, summary) {
		test.ifError(err);
		test.ok(summary);
		test.ok(summary.champions);
		test.done();
	});
};


exports.tearDown = function (callback) {
	lol.client.close();
	callback();
};
