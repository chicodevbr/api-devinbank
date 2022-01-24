const { getData, createOrUpdateData } = require('../utils/functions');

const getAllExpenses = async () => {
  return await getData('financial.json');
};

const getExpensesByUserId = async (userId) => {
  const data = await getData('financial.json');
  return await data.filter((item) => item.userId === userId);
};
module.exports = {
  getAllExpenses,
  getExpensesByUserId,
};
