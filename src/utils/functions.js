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
};
