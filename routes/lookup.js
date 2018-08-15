const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')

/* RETRIEVE ITEM DETAILS USING WALMART API KEY AND UPC */
router.get('/:apiKey/:upc', function(req, res, next) {
  const lookupURL = `https://api.walmartlabs.com/v1/items?apiKey=${req.params.apiKey}&upc=${req.params.upc}`;
  fetch(lookupURL).then(res => res.json())
  .catch(error => res.send({ 'error': error }))
  .then(response => res.send(response));
});

module.exports = router;
