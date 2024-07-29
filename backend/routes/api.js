const express = require('express');
const router = express.Router();

router.get('/data', (req, res) => {
  res.send('This is the data route');
});

module.exports = router;
