const express = require('express');
const router = express.Router();

/* POST AN ITEM AND AMOUNT USED */
// Expected params: item_id, quantity, location
router.post('/', function(req, res, next) {

  // TODO: Decrement the corresponding record for item @ location by posted quantity.

  res.send(req.body);
});

module.exports = router;
