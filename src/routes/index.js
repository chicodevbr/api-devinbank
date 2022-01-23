const express = require('express');
const routes = express.Router();
const indexRouter = require('./v1/index');
const usersRoutes = require('./v1/usersRoutes');
const financialRoutes = require('./v1/financialRoutes');

routes.use('/api/v1', [indexRouter, usersRoutes, financialRoutes]);

module.exports = routes;
