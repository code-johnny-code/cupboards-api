const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')

/* POST A UPC IN AN ATTEMPT TO RETRIEVE NAME. */
// Accepts: { "upc": string }
// Returns: results JSON
// Results include: Name, Description, Brand, Price, etc.
router.post('/', function(req, res, next) {
  const lookupURL = 'https://api.upcitemdb.com/prod/trial/lookup';
  fetch(lookupURL, {
    method: 'POST',
    body: JSON.stringify(req.body)
  }).then(res => res.json())
  .catch(error => res.send({ 'error': error }))
  .then(response => res.send(response));
});

module.exports = router;
