const express = require('express');
const routes = express.Router();
const indexRouter = require('./v1/index');
const usersRoutes = require('./v1/usersRoutes');

routes.use('/api/v1', [indexRouter, usersRoutes]);

module.exports = routes;
