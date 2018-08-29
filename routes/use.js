const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

/* POST AN ITEM AND AMOUNT USED */
// Expected params: item_id, quantity
router.post('/', function(req, res, next) {
  const { itemId, quantity } = req.body;
  const { DB_URL, DB_NAME, DB_COLLECTION } = process.env;

  MongoClient.connect(DB_URL, {useNewUrlParser: true}, function(err, db) {
    console.log('---MONGO CONNECTION INITIATED---');
    if (err) throw err;
    console.log('---MONGO CONNECTION OPEN---');
    var data = db.db(DB_NAME).collection(DB_COLLECTION);
    if (itemId) {
      const quantityUsed = (quantity > 0) ? (quantity * -1) : quantity;
      data.update({ "_id": ObjectId(itemId) }, { $inc: { 'quantity': quantityUsed}}).then(result => {
        if (!result.result.nModified) { res.send({ 'error': 'Item not found' }) }
        res.send(result);
      });
    }
    else {
      res.send({
        'error': 'itemId is required'
      })
    };

    db.close();
    console.log('---MONGO CONNECTION CLOSED---');
  });
});

module.exports = router;
