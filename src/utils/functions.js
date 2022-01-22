const fs = require('fs');

function getData(file) {
  const data = JSON.parse(fs.readFileSync('src/database/' + file, 'utf-8'));
  return data;
}

function createOrUpdateData(fileName, data) {
  fs.writeFileSync('./src/database/' + fileName, JSON.stringify(data));
}

module.exports = {
  getData,
  createOrUpdateData,
};
