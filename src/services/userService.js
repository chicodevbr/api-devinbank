const { getData } = require('../utils/functions');

module.exports = {
  async getUserById(id) {
    const users = getData('user.json');
    try {
      const user = users.find((item) => {
        item.id === id;

        if (!user) {
          throw new Error('Sem usuários para este ID.');
        }
        return user;
      });
    } catch (error) {
      console.log(error.message);
      return { error: error.message };
    }
  },
};
