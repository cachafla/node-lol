/*
 * Copyright (c) 2013, Andres Rodriguez. All rights reserved.
 */

var assert = require('assert-plus');
var Client = require('../lib/client');

var config = require('./config.json');
var lol;
var summonerId;
var summonerName = 'theartvandelay';
var fullName = 'The Art Vandelay';


exports.setUp = function (callback) {
	lol = new Client(config);
	callback();
};


exports.testSummonerByName = function(test) {
	var names = [ summonerName ];

	lol.summonerByName(names, function (err, summoners) {
		test.ifError(err);
		test.ok(summoners);
		test.ok(summoners[summonerName]);
		summonerId = summoners[summonerName].id;
		test.done();
	});
};


exports.testSummonerMasteries = function(test) {
	var ids = [ summonerId ];

	lol.summonerMasteries(ids, function (err, collection) {
		test.ifError(err);
		test.ok(collection);
		test.ok(collection[summonerId.toString()]);
		test.ok(collection[summonerId.toString()].pages);
		test.ok(collection[summonerId.toString()].summonerId);
		test.done();
	});
};


exports.testSummonerRunes = function(test) {
	var ids = [ summonerId ];

	lol.summonerRunes(ids, function (err, collection) {
		test.ifError(err);
		test.ok(collection);
		test.ok(collection[summonerId.toString()]);
		test.ok(collection[summonerId.toString()].pages);
		test.ok(collection[summonerId.toString()].summonerId);
		test.done();
	});
};


exports.testSummonerName = function(test) {
	var ids = [ summonerId ];

	lol.summonerName(ids, function (err, namesObject) {
		test.ifError(err);
		test.ok(namesObject);
		test.ok(namesObject[summonerId.toString()]);
		test.equal(namesObject[summonerId.toString()], fullName);
		test.done();
	});
};


exports.testSummoner = function(test) {
	var ids = [ summonerId ];

	lol.summoner(ids, function (err, summoners) {
		test.ifError(err);
		test.ok(summoners);
		test.ok(summoners[summonerId.toString()]);
		test.done();
	});
};


exports.tearDown = function (callback) {
	lol.client.close();
	callback();
};
