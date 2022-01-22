const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const { getData, createOrUpdateData } = require('../utils/functions');

//const userService = require('../services/userService');

module.exports = {
  async index(req, res) {
    /**
     * #swagger.tags = ['User']
     * #swagger.description = 'Endpoint que retorna lista com todos os usuários cadastrados.'
     */
    const users = getData('user.json');

    return res.status(200).json({ users: users });
  },

  async indexOne(req, res) {
    /**
     * #swagger.tags = ['User']
     * #swagger.description = 'Endpoint que pesquisa e devolve usuário por ID.'
     */
    const { id } = req.params;
    const users = getData('user.json');

    try {
      const user = await users.find((item) => item.id === id);

      if (!user) {
        throw new Error('Usuário não encontrado.');
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  },

  async createNewUser(req, res) {
    /**
     * #swagger.tags = ['User']
     * #swagger.description = 'Endpoint para cadastrar novo usuário.'
     */
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

  async updateUser(req, res) {
    /**
      #swagger.tags = ['User']
      #swagger.description = 'Endpoint que atualiza usuário cadastrado.'
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Dados necessarios para atualizar usuário.',
                required: true,
                schema: { $ref: "#/definitions/UpdateUser" }
            }
     
     */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({
        message:
          'Preencha todos os campos antes de enviar os dados/Verifique seu email.',
      });
    }
    const { id } = req.params;
    const users = await getData('user.json');

    const data = req.body;

    const hasUser = await users.find((u) => u.id === id);

    try {
      if (!hasUser) {
        return res.status(422).send({
          message: 'Usuário não encontrado.',
        });
      }

      const updateUser = await users.map((item) => {
        if (item.id === id) {
          return { ...item, ...data };
        } else {
          return { ...item };
        }
      });

      createOrUpdateData('user.json', updateUser);

      return res
        .status(200)
        .send({ message: 'Cadastro atualizado com sucesso', user: data });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  },
};
