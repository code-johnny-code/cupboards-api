const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const CryptoJS = require("crypto-js");

/* POST AN ITEM AND AMOUNT USED */
// Expected params: item_id, quantity
router.post('/', function(req, res, next) {
  const { apiKey, username, password } = req.body;
  console.log(req.body);
  const { DB_URL, DB_NAME, API_VERIFY, UI_VERIFY, ENCRYPTION_ALG, ENCRYPTION_KEY } = process.env;
  if (apiKey === UI_VERIFY) {
    MongoClient.connect(DB_URL, {uri_decode_auth: true}, function(err, db) {
      console.log('---MONGO CONNECTION INITIATED---');
      if (err) throw err;
      console.log('---MONGO CONNECTION OPEN---');
      var data = db.db(DB_NAME).collection('users');
      data.find({'username': username}).toArray(function(err, result) {
        if (err) throw err;
        if (result.length) {
          const { check } = result[0];
          const encrypted = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
          const uiKey = API_VERIFY;
          const authenticated = (check === encrypted)
          res.send({uiKey, authenticated});
        }
      });
      db.close();
      console.log('---MONGO CONNECTION CLOSED---');
    });
  }
  else {
    res.send('UNAUTHORIZED')
  }
});

module.exports = router;
