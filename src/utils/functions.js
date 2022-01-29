const fs = require('fs');
const eachMonthOfInterval = require('date-fns/eachMonthOfInterval');

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

  getDateRange(start, end) {
    const today = new Date();
    const year = new Date().getFullYear();
    const firstDayOfMonth = new Date(year, today.getMonth() - 1, 1);

    const startDays = eachMonthOfInterval({
      start: new Date(start),
      end: new Date(today),
    });

    const endDays = eachMonthOfInterval({
      start: new Date(end),
      end: new Date(firstDayOfMonth),
    });

    return {
      startDays: startDays,
      endDays: endDays,
    };
  },
};
