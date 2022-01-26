const { getData } = require('../utils/functions');

const getAllUsers = async () => {
  return await getData('user');
};

const getUserById = async (userId) => {
  const users = await getAllUsers();

  return await users.find((item) => item.id === userId);
};

module.exports = {
  getAllUsers,
  getUserById,
};
