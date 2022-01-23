const express = require('express');
const financialRoutes = express.Router();
const multer = require('multer');
const financialControllers = require('../../controllers/financialControllers');

const upload = multer();

financialRoutes.post(
  '/expenses/:userId',
  upload.single('file'),
  financialControllers.importExpensesData
);

module.exports = financialRoutes;
