const { v4: uuidv4 } = require('uuid');
const { createOrUpdateData } = require('../utils/functions');
const xlsxPopulate = require('xlsx-populate');
const { getUserById } = require('../services/user');
const {
  getAllExpenses,
  getExpensesByUserId,
  getExpensesByUserAndQuery,
  findExpenseById,
  removeExpenses,
  getWithFinancialData,
} = require('../services/financial');

module.exports = {
  async importExpensesData(req, res) {
    /*
          #swagger.consumes = ['multipart/form-data']
          #swagger.tags = ['Financial']   
          #swagger.parameters['file'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
              description: 'Some description...',
              accept: '/',
        } */
    const { userId } = req.params;
    const xlsxBuffer = req.file.buffer;
    const xlsxData = await xlsxPopulate.fromDataAsync(xlsxBuffer);

    const rows = xlsxData.sheet(0).usedRange().value();
    const [firstRow] = rows;
    const keys = ['name', 'date', 'typeOfExpenses', 'amount'];
    const hasKeys = firstRow.every((item, index) => {
      return keys[index] === item;
    });

    if (!hasKeys || firstRow.length != 4) {
      throw new Error('Todas as colunas devem estar preeencidas.');
    }

    const filterRows = rows.filter((_, index) => index != 0);

    try {
      const financial = await getAllExpenses();

      filterRows.map((row) => {
        const result = row.map((cell, index) => {
          return {
            [firstRow[index]]: cell ? cell : '',
          };
        });

        const objExpenses = Object.assign(
          { expenseId: uuidv4(), userId: userId },

          ...result
        );

        financial.push(objExpenses);
      });
      createOrUpdateData('financial', financial);
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }

    return res
      .status(200)
      .send({ message: 'Despesas cadastradas com sucesso.' });
  },

  async getExpensesByUserId(req, res) {
    /**
     * #swagger.tags = ['Financial']
     * #swagger.description = 'Endpoint que filtra despesas por id de usuário.'
     */
    const { userId } = req.params;

    try {
      const result = await getWithFinancialData(userId);

      return res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  },

  async getExpensesFilteredByUserIdAndQuery(req, res) {
    /**
     * #swagger.tags = ['Financial']
     * #swagger.description = 'Endpoint que filtra despesas id de usuário.'
     */
    const { userId } = req.params;
    const { query } = req.query;

    console.log(query);

    try {
      const data = await getExpensesByUserAndQuery(userId, query);

      return res.status(200).json(data);
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    /**
     * #swagger.tags = ['Financial']
     * #swagger.description = 'Endpoint para deletar endpoint por userId.'
     */

    const { userId, expenseId } = req.params;

    const hasUser = await getUserById(userId);
    const hasExpense = await findExpenseById(expenseId);
    try {
      if (!hasUser) {
        return res.status(400).send({ message: 'Usuário não encontrado' });
      }

      if (!hasExpense) {
        return res.status(400).send({ message: 'Despesa não encontrada' });
      }

      const removeExpenseData = await removeExpenses(expenseId);

      createOrUpdateData('financial', removeExpenseData);
      res.status(200).json('Despesa deletada.');
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  },
};
