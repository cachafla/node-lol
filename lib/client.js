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

var LEAGUE_CHALLENGER_PATH = 'league/challenger';
var LEAGUE_CHALLENGER_VERSION = 'v2.3';

var LEAGUE_BY_SUMM_ENTRY_PATH = 'league/by-summoner/%s/entry';
var LEAGUE_BY_SUMM_ENTRY_VERSION = 'v2.3';

var LEAGUE_BY_SUMM_PATH = 'league/by-summoner/%s';
var LEAGUE_BY_SUMM_VERSION = 'v2.3';

var STATS_SUMMARY_PATH = 'stats/by-summoner/%s/summary';
var STATS_SUMMARY_VERSION = 'v1.2';

var STATS_RANKED_PATH = 'stats/by-summoner/%s/ranked';
var STATS_RANKED_VERSION = 'v1.2';

var SUMM_MASTERIES_PATH = 'summoner/%s/masteries';
var SUMM_MASTERIES_VERSION = 'v1.3';

var SUMM_RUNES_PATH = 'summoner/%s/runes';
var SUMM_RUNES_VERSION = 'v1.3';

var SUMM_BY_NAME_PATH = 'summoner/by-name/%s';
var SUMM_BY_NAME_VERSION = 'v1.3';

var SUMM_NAME_PATH = 'summoner/%s/name';
var SUMM_NAME_VERSION = 'v1.3';

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
 * Request wrapper
 */
Client.prototype._request = function _request(opts, cb) {
	this.client.get(opts, function (err, req, res, data) {
		if (err) {
			return cb(err);
		}

		assert.ok(data);
		return cb(null, data);
	});
};


/*
 * /api/lol/{region}/{version}/champion
 */
Client.prototype.close = function close() {
	this.client.close();
};


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
	this._request(opts, cb);
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
	this._request(opts, cb);
};


/*
 * /api/lol/{region}/{version}/league/challenger
 */
Client.prototype.leagueChallenger = function leagueChallenger(type, cb) {
	assert.string(type, 'type');
	assert.func(cb, 'callback');

	var path = format(BASE_PATH, this.region, LEAGUE_CHALLENGER_VERSION,
		LEAGUE_CHALLENGER_PATH);
	var query = { api_key: this.apiKey, type: type };
	var opts = { path: path, query: query };
	this._request(opts, cb);
};


/*
 * /api/lol/{region}/{version}/league/by-summoner/{summonerId}/entry
 */
Client.prototype.leagueBySummonerEntry =
function leagueBySummonerEntry(id, cb) {
	assert.number(id, 'id');
	assert.func(cb, 'callback');

	var gamePath = format(LEAGUE_BY_SUMM_ENTRY_PATH, id);
	var path = format(BASE_PATH, this.region, LEAGUE_BY_SUMM_ENTRY_VERSION,
		gamePath);
	var query = { api_key: this.apiKey };
	var opts = { path: path, query: query };
	this._request(opts, cb);
};


/*
 * /api/lol/{region}/{version}/league/by-summoner/{summonerId}
 */
Client.prototype.leagueBySummoner = function leagueBySummoner(id, cb) {
	assert.number(id, 'id');
	assert.func(cb, 'callback');

	var gamePath = format(LEAGUE_BY_SUMM_PATH, id);
	var path = format(BASE_PATH, this.region, LEAGUE_BY_SUMM_VERSION, gamePath);
	var query = { api_key: this.apiKey };
	var opts = { path: path, query: query };
	this._request(opts, cb);
};


/*
 * /api/lol/{region}/{version}/stats/by-summoner/{summonerId}/summary
 */
Client.prototype.statsSummary = function statsSummary(id, season, cb) {
	assert.number(id, 'id');
	if (typeof (season) === 'function') {
		cb = season;
		season = undefined;
	}
	assert.optionalString(season, 'season');
	assert.func(cb, 'callback');

	var statsPath = format(STATS_SUMMARY_PATH, id);
	var path = format(BASE_PATH, this.region, STATS_SUMMARY_VERSION, statsPath);
	var query = { api_key: this.apiKey };
	if (season !== undefined) {
		query.season = season;
	}
	var opts = { path: path, query: query };
	this._request(opts, cb);
};


/*
 * /api/lol/{region}/{version}/stats/by-summoner/{summonerId}/ranked
 */
Client.prototype.statsRanked = function statsRanked(id, season, cb) {
	assert.number(id, 'id');
	if (typeof (season) === 'function') {
		cb = season;
		season = undefined;
	}
	assert.optionalString(season, 'season');
	assert.func(cb, 'callback');

	var statsPath = format(STATS_RANKED_PATH, id);
	var path = format(BASE_PATH, this.region, STATS_RANKED_VERSION, statsPath);
	var query = { api_key: this.apiKey };
	if (season !== undefined) {
		query.season = season;
	}
	var opts = { path: path, query: query };
	this._request(opts, cb);
};


/*
 * /api/lol/{region}/{version}/summoner/{summonerIds/masteries
 */
Client.prototype.summonerMasteries = function summonerMasteries(ids, cb) {
	assert.arrayOfNumber(ids, 'ids');
	assert.func(cb, 'callback');

	var summPath = format(SUMM_MASTERIES_PATH, ids.join(','));
	var path = format(BASE_PATH, this.region, SUMM_MASTERIES_VERSION, summPath);
	var query = { api_key: this.apiKey };
	var opts = { path: path, query: query };
	this._request(opts, cb);
};


/*
 * /api/lol/{region}/{version}/summoner/{summonerIds/runes
 */
Client.prototype.summonerRunes = function summonerRunes(ids, cb) {
	assert.arrayOfNumber(ids, 'ids');
	assert.func(cb, 'callback');

	var summPath = format(SUMM_RUNES_PATH, ids.join(','));
	var path = format(BASE_PATH, this.region, SUMM_RUNES_VERSION, summPath);
	var query = { api_key: this.apiKey };
	var opts = { path: path, query: query };
	this._request(opts, cb);
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
	this._request(opts, cb);
};


/*
 * /api/lol/{region}/{version}/summoner/{summonerIds}/name
 */
Client.prototype.summonerName = function summonerName(ids, cb) {
	assert.arrayOfNumber(ids, 'ids');
	assert.func(cb, 'callback');

	var summPath = format(SUMM_NAME_PATH, ids.join(','));
	var path = format(BASE_PATH, this.region, SUMM_NAME_VERSION, summPath);
	var query = { api_key: this.apiKey };
	var opts = { path: path, query: query };
	this._request(opts, cb);
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
	this._request(opts, cb);
};


module.exports = Client;
