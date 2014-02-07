/*
 * Copyright (c) 2013, Andres Rodriguez. All rights reserved.
 */

var assert = require('assert-plus');
var restify = require('restify');
var format = require('util').format;

var BASE_PATH = '/api/lol/%s/%s/%s';

var CHAMPION_VERSION = 'v1.1';
var GAME_VERSION = 'v1.3';
var LEAGUE_VERSION = 'v2.3';
var STATS_VERSION = 'v1.2';
var SUMMONER_VERSION = 'v1.3';
var STATIC_VERSION = 'v1';

var CHAMPION_PATH = 'champion';
var GAME_BY_SUMM_PATH = 'game/by-summoner/%s/recent';
var LEAGUE_CHALLENGER_PATH = 'league/challenger';
var LEAGUE_BY_SUMM_ENTRY_PATH = 'league/by-summoner/%s/entry';
var LEAGUE_BY_SUMM_PATH = 'league/by-summoner/%s';
var STATS_SUMMARY_PATH = 'stats/by-summoner/%s/summary';
var STATS_RANKED_PATH = 'stats/by-summoner/%s/ranked';
var SUMM_MASTERIES_PATH = 'summoner/%s/masteries';
var SUMM_RUNES_PATH = 'summoner/%s/runes';
var SUMM_BY_NAME_PATH = 'summoner/by-name/%s';
var SUMM_NAME_PATH = 'summoner/%s/name';
var SUMM_PATH = 'summoner/%s';

// Static endpoints

var CHAMPIONS_PATH = 'champion';
var CHAMPION_BY_ID_PATH = 'champion/%s';
var ITEMS_PATH = 'item';
var ITEM_BY_ID_PATH = 'item/%s';
var MASTERIES_PATH = 'mastery';
var MASTERY_BY_ID_PATH = 'mastery/%s';
var RUNES_PATH = 'rune';
var RUNE_BY_ID_PATH = 'rune/%s';
var SPELLS_PATH = 'summoner-spell';
var SPELL_BY_ID_PATH = 'summoner-spell/%s';


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
	var path = format(BASE_PATH, this.region, GAME_VERSION, gamePath);
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

	var path = format(BASE_PATH, this.region, LEAGUE_VERSION,
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
	var path = format(BASE_PATH, this.region, LEAGUE_VERSION,
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
	var path = format(BASE_PATH, this.region, LEAGUE_VERSION, gamePath);
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
	var path = format(BASE_PATH, this.region, STATS_VERSION, statsPath);
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
	var path = format(BASE_PATH, this.region, STATS_VERSION, statsPath);
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
	var path = format(BASE_PATH, this.region, SUMMONER_VERSION, summPath);
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
	var path = format(BASE_PATH, this.region, SUMMONER_VERSION, summPath);
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
	var path = format(BASE_PATH, this.region, SUMMONER_VERSION, summPath);
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
	var path = format(BASE_PATH, this.region, SUMMONER_VERSION, summPath);
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
	var path = format(BASE_PATH, this.region, SUMMONER_VERSION, summPath);
	var query = { api_key: this.apiKey };
	var opts = { path: path, query: query };
	this._request(opts, cb);
};



/*
 * Static endpoints
 */


/*
 * /api/lol/static-data/{region}/{version}/champion
 */
Client.prototype.champions = function champions(options, cb) {
	if (typeof (options) === 'function') {
		cb = options;
		options = undefined;
	}
	assert.func(cb, 'callback');

	var path = format(BASE_PATH, 'static-data/' + this.region,
		STATIC_VERSION, CHAMPIONS_PATH);
	var query = { api_key: this.apiKey };
	if (options) {
		['locale', 'version', 'champData'].forEach(function (key) {
			if (options[key] !== undefined) {
				query[key] = options[key];
			}
		});
	}
	var opts = { path: path, query: query };
	this._request(opts, cb);
};


/*
 * /api/lol/static-data/{region}/{version}/champion/{id}
 */
Client.prototype.championById = function championById(id, options, cb) {
	assert.number(id, 'id');
	if (typeof (options) === 'function') {
		cb = options;
		options = undefined;
	}
	assert.func(cb, 'callback');

	var chamPath = format(CHAMPION_BY_ID_PATH, id);
	var path = format(BASE_PATH, 'static-data/' + this.region,
		STATIC_VERSION, chamPath);
	var query = { api_key: this.apiKey };
	if (options) {
		['locale', 'version', 'champData'].forEach(function (key) {
			if (options[key] !== undefined) {
				query[key] = options[key];
			}
		});
	}
	var opts = { path: path, query: query };
	this._request(opts, cb);
};


/*
 * /api/lol/static-data/{region}/{version}/item
 */
Client.prototype.items = function items(options, cb) {
	if (typeof (options) === 'function') {
		cb = options;
		options = undefined;
	}
	assert.func(cb, 'callback');

	var path = format(BASE_PATH, 'static-data/' + this.region,
		STATIC_VERSION, ITEMS_PATH);
	var query = { api_key: this.apiKey };
	if (options) {
		['locale', 'version', 'itemListData'].forEach(function (key) {
			if (options[key] !== undefined) {
				query[key] = options[key];
			}
		});
	}
	var opts = { path: path, query: query };
	this._request(opts, cb);
};


/*
 * /api/lol/static-data/{region}/{version}/item/{id}
 */
Client.prototype.itemById = function itemById(id, options, cb) {
	assert.number(id, 'id');
	if (typeof (options) === 'function') {
		cb = options;
		options = undefined;
	}
	assert.func(cb, 'callback');

	var itemPath = format(ITEM_BY_ID_PATH, id);
	var path = format(BASE_PATH, 'static-data/' + this.region,
		STATIC_VERSION, itemPath);
	var query = { api_key: this.apiKey };
	if (options) {
		['locale', 'version', 'itemListData'].forEach(function (key) {
			if (options[key] !== undefined) {
				query[key] = options[key];
			}
		});
	}
	var opts = { path: path, query: query };
	this._request(opts, cb);
};


/*
 * /api/lol/static-data/{region}/{version}/mastery
 */
Client.prototype.masteries = function masteries(options, cb) {
	if (typeof (options) === 'function') {
		cb = options;
		options = undefined;
	}
	assert.func(cb, 'callback');

	var path = format(BASE_PATH, 'static-data/' + this.region,
		STATIC_VERSION, MASTERIES_PATH);
	var query = { api_key: this.apiKey };
	if (options) {
		['locale', 'version', 'masteryData'].forEach(function (key) {
			if (options[key] !== undefined) {
				query[key] = options[key];
			}
		});
	}
	var opts = { path: path, query: query };
	this._request(opts, cb);
};


/*
 * /api/lol/static-data/{region}/{version}/mastery/{id}
 */
Client.prototype.masteryById = function masteryById(id, options, cb) {
	assert.number(id, 'id');
	if (typeof (options) === 'function') {
		cb = options;
		options = undefined;
	}
	assert.func(cb, 'callback');

	var itemPath = format(MASTERY_BY_ID_PATH, id);
	var path = format(BASE_PATH, 'static-data/' + this.region,
		STATIC_VERSION, itemPath);
	var query = { api_key: this.apiKey };
	if (options) {
		['locale', 'version', 'masteryData'].forEach(function (key) {
			if (options[key] !== undefined) {
				query[key] = options[key];
			}
		});
	}
	var opts = { path: path, query: query };
	this._request(opts, cb);
};


module.exports = Client;
