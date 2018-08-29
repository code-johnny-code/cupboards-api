const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
const { MongoClient } = require('mongodb');

/* RETRIEVE ITEM DETAILS USING WALMART API KEY AND UPC */
router.get('/:apiKey/:upc', function(req, res, next) {
  let name, retailer, exists;
  const { DB_URL, DB_NAME, DB_COLLECTION } = process.env;

  MongoClient.connect(DB_URL, {useNewUrlParser: true}, function(err, db) {
    console.log('---MONGO CONNECTION INITIATED---');
    if (err) throw err;
    console.log('---MONGO CONNECTION OPEN---');
    var data = db.db(DB_NAME).collection(DB_COLLECTION);
    data.find({ upc: req.params.upc }).toArray(function(err, result) {
      if (err) throw err;
      if (result.length) {
        exists = true;
        name = result[0].name;
        retailer = result[0].retailer;
        price = result[0].price;

        const payload = {
          items: [{
            name: name,
            retailer: retailer,
            salePrice: price
          }]
        }
        db.close();
        console.log('---MONGO CONNECTION CLOSED---');
        res.send(payload)
      }
    })
  });
  if (!exists) {
    const lookupURL = `https://api.walmartlabs.com/v1/items?apiKey=${req.params.apiKey}&upc=${req.params.upc}`;
    fetch(lookupURL).then(res => res.json())
    .catch(error => res.send({ 'error': error }))
    .then(response => {
      res.send(response)
    });
  }
});

module.exports = router;
