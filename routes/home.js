const express = require('express');

const router = express.Router();

 //GET all the artists
 router.get('/', (req, res) => {res.send('Hello from Aisling Mc Loughlin!');
})

router.get('/Aisling', (req, res) =>
  res.send('hello, this is Aisling'));

module.exports = router;