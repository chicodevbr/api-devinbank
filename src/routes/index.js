const express = require('express');
const routes = express.Router();
const indexRouter = require('./v1/index');

routes.use('/api', [indexRouter]);

module.exports = routes;
