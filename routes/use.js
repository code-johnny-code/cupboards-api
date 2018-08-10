var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Decrement the submitted item by the submitted quantity');
});

module.exports = router;
