const express = require('express');
const router = express.Router();

/* POST UPC TO RETRIEVE CURRENT PRICE. */
// Expected params: UPC, retailer
router.post('/', function(req, res, next) {
  res.send(req.body);
});

module.exports = router;
