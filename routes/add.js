require('dotenv').config()
const express = require('express');
const router = express.Router();

/* POST A NEW/UPDATED ITEM. */
// Expected params: item_id, name, upc, quantity, expiration, location, retailer, category, img_url
router.post('/', function(req, res, next) {
  const { item_id, name, upc, quantity, expiration, location, retailer, category, img_url } = req.body;
  
  // TODO: 
  // if (item_id) { check location, increment quantity }
  // else { create/save a new record }
  
  res.send(req.body);
});

module.exports = router;
