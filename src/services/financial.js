const { getData, createOrUpdateData } = require('../utils/functions');

const getAllExpenses = async () => {
  return await getData('financial.json');
};

const getExpensesByUserId = async (userId) => {
  const data = await getData('financial.json');
  return await data.filter((item) => item.userId === userId);
};

const getExpensesByUserAndQuery = async (userId, query) => {
  const expensesData = await getExpensesByUserId(userId);
  console.log(expensesData[1].financialData);
  return await expensesData[0].financialData.filter(
    (item) => item.typeOfExpenses === query
  );
};
module.exports = {
  getAllExpenses,
  getExpensesByUserId,
  getExpensesByUserAndQuery,
};
