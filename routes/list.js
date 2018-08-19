require('dotenv').config()
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

/* GET ALL AVAILABLE ITEMS. */
router.get('/', function(req, res, next) {
  const { DB_URL, DB_NAME, DB_COLLECTION } = process.env;

  MongoClient.connect(DB_URL, {uri_decode_auth: true}, function(err, db) {
    console.log('---MONGO CONNECTION INITIATED---');
    if (err) throw err;
    console.log('---MONGO CONNECTION OPEN---');
    var data = db.db(DB_NAME).collection(DB_COLLECTION);
    data.find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
    });
    db.close();
    console.log('---MONGO CONNECTION CLOSED---');
  });
});

module.exports = router;
