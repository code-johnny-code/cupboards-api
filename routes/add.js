require('dotenv').config()
const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

/* POST A NEW/UPDATED ITEM. */
// Expected params: item_id, name, upc, quantity, expiration, location, retailer, category, img_url
router.post('/', function(req, res, next) {
  const { item_Id, name, price, minimum, upc, quantity, expiration, location, retailer, category, img_url } = req.body;
  const { DB_URL, DB_NAME, DB_COLLECTION } = process.env;
  
  MongoClient.connect(DB_URL, function(err, db) {
    console.log('---MONGO CONNECTION INITIATED---');
    if (err) throw err;
    console.log('---MONGO CONNECTION OPEN---');
    var data = db.db(DB_NAME).collection(DB_COLLECTION);
    if (item_Id) {
      data.update({ "_id": ObjectId(item_Id) }, { $set: { name, price, minimum, quantity, expiration, location, retailer, category }}).then(result => {
        res.send(result);
      });
    }
    else {
      data.insert({name, price, minimum, upc, quantity, expiration, location, retailer, category, img_url})
      .then((result) => { res.send(result) })
    };

    db.close();
    console.log('---MONGO CONNECTION CLOSED---');
  });
});

module.exports = router;
