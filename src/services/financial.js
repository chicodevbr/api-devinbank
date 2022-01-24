const { getData, createOrUpdateData } = require('../utils/functions');

const getAllExpenses = async () => {
  return await getData('financial');
};

const getExpensesByUserId = async (userId) => {
  const data = await getData('financial');
  return await data.filter((item) => item.userId === userId);
};

const getExpensesByUserAndQuery = async (userId, query) => {
  const expensesData = await getExpensesByUserId(userId);
  const expensesFilteredByQuery = expensesData.financialData((item) => {
    const filteredByQuery = Object.keys(query).filter((key) => {
      return (
        query[key] &&
        item[key] &&
        String(
          item[key]
            .toLocaleLowerCase()
            .includes(String(query[key].toLocaleLowerCase()))
        )
      );
    });
    return filteredByQuery.length > 0;
  });

  return expensesFilteredByQuery.length > 0
    ? expensesFilteredByQuery
    : expensesData.financialData;
};
module.exports = {
  getAllExpenses,
  getExpensesByUserId,
  getExpensesByUserAndQuery,
};
