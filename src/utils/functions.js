const fs = require('fs');

function getData(file) {
  const data = JSON.parse(fs.readFileSync('src/database/' + file, 'utf-8'));
  return data;
}

function createOrUpdateData(file, data) {
  fs.writeFileSync('src/database' + file, JSON.stringify(data));
}

module.exports = {
  getData,
  createOrUpdateData,
};
