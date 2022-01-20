const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log(`API DEVinBank version 1.0`);
  res.send('Welcome to API DEVinBank - version 1.0');
});

module.exports = router;
