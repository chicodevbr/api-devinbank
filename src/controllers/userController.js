const { getData, createOrUpdateData } = require('../utils/functions');
const userService = require('../services/userService');

module.exports = {
  async index(req, res) {
    const users = getData('user.json');

    return res.status(200).json({ users: users });
  },

  async indexOne(req, res) {
    const { id } = req.params;
    try {
      const response = await userService.getUserById(id);
      return res.status(400).json(response);
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  },
};
