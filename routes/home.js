const express = require('express');

const router = express.Router();

 //GET all the artists
 router.get('/', (req, res) => {res.send('Hello from Aisling Mc Loughlin!');
})

module.exports = router;