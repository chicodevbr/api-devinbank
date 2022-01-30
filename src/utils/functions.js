const fs = require('fs');
const {
  eachMonthOfInterval,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  lastDayOfMonth,
  getMonth,
} = require('date-fns');

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

  getRangeDates(date) {
    const today = new Date();

    const startOfMonths = eachMonthOfInterval({
      start: new Date(date),
      end: new Date(today),
    });

    const endOfMonths = startOfMonths.map((item) =>
      lastDayOfMonth(new Date(item))
    );

    return {
      startOfMonths,
      endOfMonths,
    };
  },

  getStartMonth(date) {
    const today = new Date();

    const startDays = eachMonthOfInterval({
      start: new Date(date),
      end: new Date(today),
    });

    return startDays;
  },

  getEndMonth(date) {
    const today = new Date();
    const year = new Date().getFullYear();
    const firstDayOfMonth = new Date(year, today.getMonth(), 1);

    const endDays = eachMonthOfInterval({
      start: new Date(date),
      end: new Date(firstDayOfMonth),
    });

    return endDays;
  },

  getDateGetTime(date) {
    return new Date(date).getTime();
  },

  getMonthOfExpenses(data) {
    return data.map((item) => getMonth(new Date(item.date)));
  },
};
