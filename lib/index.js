/*
 * Copyright (c) 2013, Andres Rodriguez. All rights reserved.
 */


var Client = require('./client');

exports.createClient = function (options) {
    return new Client(options);
};
