'use strict';

var express = require('express');

var blogRoutes = require('./BlogRoutes');
var router = express.Router();

//test Route
router.use('/blog', blogRoutes);

module.exports = router;