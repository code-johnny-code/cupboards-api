var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Return price of submitted item (@ preferred retailer if available)');
});

module.exports = router;
