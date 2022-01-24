const { getData, createOrUpdateData } = require('../utils/functions');

const getAllUsers = async () => {
  return await getData('user.json');
};

module.exports = {
  getAllUsers,
};
