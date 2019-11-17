const express = require('express');

const blogRoutes = require('./BlogRoutes');

const router = express.Router();

router.use('/blog', blogRoutes);

module.exports = router;
