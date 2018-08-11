const express = require('express');
const router = express.Router();

/* GET ALL AVAILABLE ITEMS. */
router.get('/', function(req, res, next) {

  // Return all items along with the id (the id is sent along when adding to tell if the item is already in the db)

  res.send('List all items in cupboards');
});

module.exports = router;
