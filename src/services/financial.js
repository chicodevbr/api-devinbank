const { getData, createOrUpdateData } = require('../utils/functions');

const getAllExpenses = async () => {
  return await getData('financial.json');
};

module.exports = {
  getAllExpenses,
};
