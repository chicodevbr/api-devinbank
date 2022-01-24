const express = require('express');
const financialRoutes = express.Router();
const multer = require('multer');
const financialControllers = require('../../controllers/financialControllers');

const upload = multer();

financialRoutes.get(
  '/expenses/:userId',
  financialControllers.getExpensesByUserId
);
financialRoutes.get(
  '/filter-expenses/:userId',
  financialControllers.getExpensesFilteredByUserIdAndQuery
);
financialRoutes.post(
  '/expenses/:userId',
  upload.single('file'),
  financialControllers.importExpensesData
);

module.exports = financialRoutes;
