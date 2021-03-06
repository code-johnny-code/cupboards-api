require('dotenv').config()
const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

/* DELETE ITEM USING MONGO RECORD ID */
router.post('/', function(req, res, next) {
  const { DB_URL, DB_NAME, DB_COLLECTION } = process.env;
  const { item_Id } =  req.body;
  MongoClient.connect(DB_URL, {uri_decode_auth: true}, function(err, db) {
    console.log('---MONGO CONNECTION INITIATED---');
    if (err) throw err;
    console.log('---MONGO CONNECTION OPEN---');
    var data = db.db(DB_NAME).collection(DB_COLLECTION);
    if (item_Id) {
      data.update({ "_id": ObjectId(item_Id) }, { $set: { deleted: true }}).then(result => {
        res.send(result);
      });
    }
    else {
      res.send({'error': 'Record not found'});
    };

    db.close();
    console.log('---MONGO CONNECTION CLOSED---');
  });
  })

module.exports = router;
