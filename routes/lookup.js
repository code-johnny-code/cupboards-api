const express = require('express');
const router = express.Router();

/* POST A UPC IN AN ATTEMPT TO RETRIEVE NAME. */
router.post('/', function(req, res, next) {

  // TODO: Return an object with UPC and retrieved names. Return null where no name found.
  res.send('Look up item details using UPC');
});

module.exports = router;
