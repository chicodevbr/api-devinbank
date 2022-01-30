const { getData } = require('../utils/functions');

const getAllUsers = async () => {
  return await getData('user');
};

const getUserById = async (userId) => {
  const users = await getAllUsers();

  const findUser = await users.find((item) => item.id === userId);
  return findUser;
};

module.exports = {
  getAllUsers,
  getUserById,
};
