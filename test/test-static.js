/*
* Copyright (c) 2013, Andres Rodriguez. All rights reserved.
*/

var assert = require('assert-plus');
var Client = require('../lib/client');

var config = require('./config.json');
var lol;
var leeSin = 64;
var rabadon = 3089;
var bandit = 4352;
var APquint = 5235;

exports.setUp = function (callback) {
    lol = new Client(config);
    callback();
};


exports.testChampions = function(test) {
    lol.champions({ locale: 'es_ES' }, function (err, champions) {
        test.ifError(err);
        test.ok(champions);
        test.ok(champions.data);
        test.equal(champions.type, 'champion');
        test.done();
    });
};


exports.testChampionById = function(test) {
    lol.championById(leeSin, { champData: 'all' }, function (err, lee) {
        test.ifError(err);
        test.ok(lee);
        test.equal(lee.name, 'Lee Sin');
        test.done();
    });
};


exports.testItems = function(test) {
    lol.items({ locale: 'es_ES' }, function (err, items) {
        test.ifError(err);
        test.ok(items);
        test.done();
    });
};


exports.testItemById = function(test) {
    lol.itemById(rabadon, { itemListData: 'all' }, function (err, deathcap) {
        test.ifError(err);
        test.ok(deathcap);
        test.done();
    });
};


exports.testMasteries = function(test) {
    lol.masteries({ locale: 'es_ES' }, function (err, masteries) {
        test.ifError(err);
        test.ok(masteries);
        test.done();
    });
};


exports.testItemById = function(test) {
    lol.masteryById(bandit, { masteryData: 'all' }, function (err, mastery) {
        test.ifError(err);
        test.ok(mastery);
        test.done();
    });
};


exports.testRealm = function(test) {
    lol.realm(function (err, realm) {
        test.ifError(err);
        test.ok(realm);
        test.done();
    });
};


exports.testRuneById = function(test) {
    lol.runeById(APquint, { runeListData: 'all' }, function (err, quint) {
        test.ifError(err);
        test.ok(quint);
        test.done();
    });
};


exports.testRunes = function(test) {
    lol.runes({ locale: 'es_ES' }, function (err, runes) {
        test.ifError(err);
        test.ok(runes);
        test.done();
    });
};


exports.tearDown = function (callback) {
    lol.close();
    callback();
};
