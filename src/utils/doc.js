const doc = {
  info: {
    version: '1.0.0',
    title: 'API DEVinBank',
    description: 'Welcome to API DEVinBank || Conta 365 - version 1.0.0',
  },
  host: 'https://devinbank.herokuapp.com',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Index',
      description:
        'Endpoint de boas-vindas com informações a respeito das versões da API.',
    },
    {
      name: 'User',
      description: 'Endpoints de informações e cadastros de usuários.',
    },
    {
      name: 'Financial',
      description: 'Endpoints de transações financeiras.',
    },
  ],
  definitions: {
    User: {
      id: 1,
      name: 'Jhon Doe',
      email: 'email@email.com',
    },
    Expenses: {
      id: 1,
      userId: 2,
      financialData: [
        {
          id: 1,
          price: 9.9,
          typesOfExpenses: 'Food',
          date: '1969-12-31',
          name: "Food's Expenses.",
        },
      ],
    },
    UpdateUser: {
      $name: 'Jhon Doe',
      $email: 'jhondoe@doe.com',
    },
    AddTransaction: {
      $price: 21.9,
      $typeOfExpenses: 'Food',
      $date: '1969-12-31T03:00:00.000Z',
      $name: `Food's Expenses`,
    },
  },
};
module.exports = doc;
