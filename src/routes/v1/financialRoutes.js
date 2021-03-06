const express = require('express');
const financialRoutes = express.Router();
const multer = require('multer');
const financialControllers = require('../../controllers/financialControllers');

const upload = multer();

financialRoutes.get(
  '/expenses/:userId',
  financialControllers.getExpensesFilteredByUserIdAndQuery
);

financialRoutes.get(
  '/expenses-by-user/:userId',
  financialControllers.getExpensesByUserId
);

financialRoutes.post(
  '/expenses/:userId',
  upload.single('file'),
  financialControllers.importExpensesData
);

financialRoutes.delete(
  '/expenses/:userId/:expenseId',
  financialControllers.delete
);

module.exports = financialRoutes;
