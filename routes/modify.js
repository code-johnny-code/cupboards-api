require('dotenv').config()
const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

/* POST AN ITEM MODIFICATION. */
router.post('/shop', function(req, res, next) {
  const { item_Id, onList, toGet } = req.body;
  const { DB_URL, DB_NAME, DB_COLLECTION } = process.env;
  
  MongoClient.connect(DB_URL, {uri_decode_auth: true}, function(err, db) {
    console.log('---MONGO CONNECTION INITIATED---');
    if (err) throw err;
    console.log('---MONGO CONNECTION OPEN---');
    var data = db.db(DB_NAME).collection(DB_COLLECTION);
    if (item_Id) {
      data.update({ "_id": ObjectId(item_Id) }, { $set: { onList, toGet }}).then(result => {
        res.send(result);
      });
    }
    else {
      res.send({"error": "No Item ID provided"})
    };

    db.close();
    console.log('---MONGO CONNECTION CLOSED---');
  });
});

module.exports = router;
