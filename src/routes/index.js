const express = require('express');
const routes = express.Router();
const indexRouter = require('./v1/index');
const usersRoutes = require('./v1/usersRoutes');

routes.use('/api', [indexRouter, usersRoutes]);

module.exports = routes;
