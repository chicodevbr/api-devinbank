const express = require('express');
const { check } = require('express-validator');
const userRoutes = express.Router();
const userController = require('../../controllers/userController');

userRoutes.get('/users', userController.index);
userRoutes.get('/user/:id', userController.indexOne);
userRoutes.post(
  '/new-user',
  [check('name').not().isEmpty(), check('email').normalizeEmail().isEmail()],
  userController.createNewUser
);

module.exports = userRoutes;
