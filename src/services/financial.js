const { getData, sumValues, getDateToTime } = require('../utils/functions');
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

const getTotalAmountExpensesByUser = async (userId, search, start, end) => {
  if (!search && !start && !end) {
    const data = await getExpensesByUserId(userId);

    const total = data.reduce(sumValues, 0);

    return { ...data, total: total };
  }

  const startDate = getDateToTime(start);
  const endDate = getDateToTime(end);

  if (!search) {
    const data = await getExpensesByUserId(userId);

    const dataFiltered = await data.filter(
      (expense) =>
        getDateToTime(expense.date) >= startDate &&
        getDateToTime(expense.date) <= endDate
    );
    const total = dataFiltered.reduce(sumValues, 0);

    return { ...dataFiltered, total: total };
  } else {
    const data = await getExpensesFilteredByQuery(userId, search);
    const dataFiltered = await data.filter(
      (expense) =>
        getDateToTime(expense.date) >= startDate &&
        getDateToTime(expense.date) <= endDate
    );
    const total = dataFiltered.reduce(sumValues, 0);

    return { ...dataFiltered, total: total };
  }
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
