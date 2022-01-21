const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
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

  async createNewUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({
        message:
          'Preencha todos os campos antes de enviar os dados/Verifique seu email.',
      });
    }

    const { name, email } = req.body;
    const users = getData('user.json');

    const hasUser = users.find((u) => u.email === email);

    if (hasUser) {
      return res.status(422).send({
        message: 'Email já existe em nossa base de dados.',
      });
    }

    const newUser = [
      ...users,
      {
        id: uuidv4(),
        name,
        email,
      },
    ];
    createOrUpdateData('user.json', newUser);
    return res.status(201).send({ message: 'Usuário cadastrado com sucesso.' });
  },
};
