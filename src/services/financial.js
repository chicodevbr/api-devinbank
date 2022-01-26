const { getData, formatDate } = require('../utils/functions');
const { getUserById } = require('../services/user');
const xlsxPopulate = require('xlsx-populate');
//const { v4: uuidv4 } = require('uuid');

const getAllExpenses = async () => {
  return await getData('financial');
};

const getExpensesByUserId = async (userId) => {
  const data = await getData('financial');
  return await data.filter((item) => item.userId === userId);
};

const getExpensesById = async (expenseId) => {
  const data = await getData('financial');
  return await data.filter((item) => item.expenseId === expenseId);
};

const findExpenseById = async (expenseId) => {
  const data = await getData('financial');
  return await data.find((item) => item.expenseId === expenseId);
};

const removeExpenses = async (expenseId) => {
  const data = await getData('financial');
  return await data.filter((item) => item.expenseId !== expenseId);
};

const getWithFinancialData = async (id) => {
  const user = await getUserById(id);

  const expensesByUserId = await getExpensesByUserId(id);

  console.log(expensesByUserId);

  const objUser = Object.assign({
    userId: user.id,
    name: user.name,
    financialData: expensesByUserId,
  });

  return objUser;
};

const getExpensesFilteredByQuery = async (userId, query) => {
  const expensesByUserId = await getExpensesByUserId(userId);

  return await expensesByUserId.filter((item) => item.typeOfExpenses === query);
};

const getExpensesByUserAndQuery = async (userId, query) => {
  const user = await getUserById(userId);

  const expenseDataByUserId = await getExpensesFilteredByQuery(userId, query);

  const objUser = Object.assign({
    userId: user.id,
    name: user.name,
    financialData: expenseDataByUserId,
  });

  return objUser;
};

const getTotalAmountExpensesByUser = async (start, end, data) => {
  const startDate = new Date(formatDate(start)).getTime();
  const endDate = new Date(formatDate(end)).getTime();

  console.log(startDate);
  console.log(endDate);
};

module.exports = {
  getAllExpenses,
  getExpensesByUserId,
  getExpensesByUserAndQuery,
  getExpensesById,
  removeExpenses,
  findExpenseById,
  getWithFinancialData,
  getExpensesFilteredByQuery,
  getTotalAmountExpensesByUser,
};
