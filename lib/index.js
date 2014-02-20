/*
 * Copyright (c) 2013, Andres Rodriguez. All rights reserved.
 */


var Client = require('./client');
var theClient;

exports.createClient = function (options) {
	theClient = new Client(options);
    return theClient;
};

exports.close = function() {
	theClient.close();
};
