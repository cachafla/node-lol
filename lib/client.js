/*
 * Copyright (c) 2013, Andres Rodriguez. All rights reserved.
 */

var assert = require('assert-plus');
var restify = require('restify');
var format = require('util').format;

var BASE_PATH = '/api/lol/%s/%s/%s';

var CHAMPION_PATH = 'champion';
var CHAMPION_VERSION = 'v1.1';

var GAME_BY_SUMM_PATH = 'game/by-summoner/%s/recent';
var GAME_BY_SUMM_VERSION = 'v1.3';

var SUMM_BY_NAME_PATH = 'summoner/by-name/%s';
var SUMM_BY_NAME_VERSION = 'v1.3';

var SUMM_PATH = 'summoner/%s';
var SUMM_VERSION = 'v1.3';


function Client(options) {
    assert.object(options, 'options');
    assert.string(options.url, 'options.url');
    assert.string(options.region, 'options.region');
    assert.string(options.apiKey, 'options.apiKey');

    this.region = options.region;
    this.apiKey = options.apiKey;

    this.client = restify.createJsonClient({
        url: options.url
    });
}


/*
 * /api/lol/{region}/{version}/champion
 */
Client.prototype.champion = function champion(options, cb) {
	if (typeof (options) === 'function') {
		cb = options;
		options = undefined;
	}
	assert.func(cb, 'callback');

	var path = format(BASE_PATH, this.region, CHAMPION_VERSION, CHAMPION_PATH);
	var query = { api_key: this.apiKey };
	if (options && options.freeToPlay !== undefined) {
		query.freeToPlay = options.freeToPlay;
	}
	var opts = { path: path, query: query };

	this.client.get(opts, function (err, req, res, data) {
		if (err) {
			return cb(err);
		}

		assert.ok(data.champions);
		return cb(null, data.champions);
	});
};


/*
 * /api/lol/{region}/{version}/game/by-summoner/{summonerId}/recent
 */
Client.prototype.gameBySummoner = function gameBySummoner(id, cb) {
	assert.number(id, 'id');
	assert.func(cb, 'callback');

	var gamePath = format(GAME_BY_SUMM_PATH, id);
	var path = format(BASE_PATH, this.region, GAME_BY_SUMM_VERSION, gamePath);
	var query = { api_key: this.apiKey };
	var opts = { path: path, query: query };

	this.client.get(opts, function (err, req, res, data) {
		if (err) {
			return cb(err);
		}

		assert.ok(data.summonerId);
		assert.equal(data.summonerId, id);
		assert.ok(data.games);
		return cb(null, data.games);
	});
};


/*
 * /api/lol/{region}/{version}/summoner/by-name/{summonerNames}
 */
Client.prototype.summonerByName = function summonerByName(names, cb) {
	assert.arrayOfString(names, 'names');
	assert.func(cb, 'callback');

	names = names.map(function (name) {
		return name.toLowerCase().replace(/ /g, '');
	});

	var summPath = format(SUMM_BY_NAME_PATH, names.join(','));
	var path = format(BASE_PATH, this.region, SUMM_BY_NAME_VERSION, summPath);
	var query = { api_key: this.apiKey };
	var opts = { path: path, query: query };

	this.client.get(opts, function (err, req, res, data) {
		if (err) {
			return cb(err);
		}

		assert.ok(data);
		return cb(null, data);
	});
};


/*
 * /api/lol/{region}/{version}/summoner/{summonerIds}
 */
Client.prototype.summoner = function summoner(ids, cb) {
	assert.arrayOfNumber(ids, 'ids');
	assert.func(cb, 'callback');

	var summPath = format(SUMM_PATH, ids.join(','));
	var path = format(BASE_PATH, this.region, SUMM_VERSION, summPath);
	var query = { api_key: this.apiKey };
	var opts = { path: path, query: query };

	this.client.get(opts, function (err, req, res, data) {
		if (err) {
			return cb(err);
		}

		assert.ok(data);
		return cb(null, data);
	});
};


module.exports = Client;
