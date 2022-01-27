const fs = require('fs');

module.exports = {
  async getData(fileName) {
    return JSON.parse(
      await fs.readFileSync(`./src/database/${fileName}.json`),
      'utf8'
    );
  },

  async createOrUpdateData(fileName, data) {
    await fs.writeFileSync(
      `src/database/${fileName}.json`,
      JSON.stringify(data)
    );
  },

  formatDate(date) {
    return date.replace(/(\d+[/])(\d+[/])/, '$2$1');
  },

  getDateToTime(date) {
    date = date.replace(/(\d+[/])(\d+[/])/, '$2$1');
    return new Date(date).getTime();
  },

  sumValues(total, item) {
    return total + item.amount;
  },

  getTimeStartDaysAndEndDays(today) {
    const actualMonth = today.getMonth();
    const actualYear = new Date().getFullYear();

    const months = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ];

    const inputDays = [];
    const outputDays = [];

    months.map(() => {
      inputDays.push(new Date(actualYear, actualMonth, 1).getTime());
      outputDays.push(new Date(actualYear, actualMonth + 1, 0).getTime());
    });

    return {
      start: inputDays,
      end: outputDays,
    };
  },
};
