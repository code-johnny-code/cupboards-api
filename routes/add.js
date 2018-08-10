require('dotenv').config()
const express = require('express');
const router = express.Router();
const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Add an item');
});

module.exports = router;
