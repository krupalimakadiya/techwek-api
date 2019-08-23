
'use strict';
/**
 * This file contains utility used by the app.
 *
 */
//var debug = require('debug')('NODE:utils');
var _ = require('lodash');

exports.url = function (req) {
  return req.protocol + '://' + req.get('host');
};