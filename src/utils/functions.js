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
};
