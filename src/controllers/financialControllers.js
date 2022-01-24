const { v4: uuidv4 } = require('uuid');
const { getData, createOrUpdateData } = require('../utils/functions');
const xlsxPopulate = require('xlsx-populate');
const { getAllExpenses } = require('../services/financial');

module.exports = {
  async importExpensesData(req, res) {
    /**
     * #swagger.tags = ['Financial']
     * #swagger.description = 'Endpoint de importação de dados de despesas enviadas via xlsx.'
     */
    const { userId } = req.params;
    const xlsxBuffer = req.file.buffer;
    const xlsxData = await xlsxPopulate.fromDataAsync(xlsxBuffer);

    const rows = xlsxData.sheet(0).usedRange().value();
    const [firstRow] = rows;
    const keys = ['name', 'date', 'typeOfExpenses', 'amount'];
    const hasKeys = firstRow.every((item, index) => {
      return keys[index] === item;
    });
    const users = getData('user.json');
    const financial = getAllExpenses();

    try {
      const user = await users.find((item) => item.id === userId);

      if (!user) {
        throw new Error('Usuário não encontrado.');
      }

      if (!hasKeys || firstRow.length != 4) {
        throw new Error('Todas as colunas devem estar preeencidas.');
      }

      const filterRows = rows.filter((_, index) => index != 0);
      filterRows.map((row) => {
        const result = row.map((cell, index) => {
          return {
            [firstRow[index]]: cell ? cell : '',
          };
        });

        const objUser = Object.assign({
          id: uuidv4(),
          userId: userId,
          financialData: [],
        });

        const objExpenses = Object.assign(
          { expenseId: uuidv4() },

          ...result
        );

        objUser.financialData.push(objExpenses);

        financial.push(objUser);
      });
      createOrUpdateData('financial.json', financial);

      return res
        .status(200)
        .send({ message: 'Despesas cadastradas com sucesso.' });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  },

  async getExpensesByUserId(req, res) {
    /**
     * #swagger.tags = ['Financial']
     * #swagger.description = 'Endpoint que retorna todas as despesas por id de usuário.'
     */
    const { userId } = req.params;

    const expensesData = await getAllExpenses();

    try {
      const expensesDataByUserId = expensesData.filter(
        (item) => item.userId === userId
      );

      return res.status(200).json(expensesDataByUserId);
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  },
};
