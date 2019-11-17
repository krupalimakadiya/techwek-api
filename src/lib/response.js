/* eslint-disable guard-for-in , no-restricted-syntax */
const debug = require('debug')('API:RequestResponse');
const _ = require('lodash');

exports.trimParams = (req, res, next) => {
  //  debug('req.method : %o ', req)
  // Trim query and post parameters
  if (req.query || req.body) {
    for (const i in req.query || req.body) {
      if (req.query[i]) {
        req.query[i] = req.query[i].trim();
      }
      if (req.body[i]) {
        req.body[i] = req.body[i].trim();
      }
    }
  }

  // debug('req.body : %o ', req.body);
  // debug('req.query : %o ', req.query);
  // debug('req.params: %o', req.params);
  next();
};

exports.handleSuccess = (req, res) => {
  const response = req.session.data || [];
  req.session.destroy();
  debug('Success response : %o ', response);
  return res.send(response);
};

exports.handleError = (err, req, res, next) => {
  if (!err) {
    return next();
  }
  const errorResponse = {
    error: _.merge({
      stack: err.stack,
    }, err.output && err.output.payload ? err.output.payload : err),
  };
  debug('error response : %o ', errorResponse);
  return res.status(err.output && err.output.statusCode ? err.output.statusCode : 500).json(errorResponse);
};
