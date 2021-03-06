const express = require('express');
const { check } = require('express-validator');
const userRoutes = express.Router();
const userController = require('../../controllers/userController');

userRoutes.get('/users', userController.index);
userRoutes.get('/user/:id', userController.indexOne);
userRoutes.patch(
  '/user/:id',
  [check('name').not().isEmpty(), check('email').normalizeEmail().isEmail()],
  userController.updateUser
);

userRoutes.post(
  '/user',
  [check('name').not().isEmpty(), check('email').normalizeEmail().isEmail()],
  userController.createNewUser
);

userRoutes.delete('/user/:userId', userController.deleteUser);

module.exports = userRoutes;
