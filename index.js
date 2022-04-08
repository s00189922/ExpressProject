const express = require('express')
const Joi = require('joi')

//importing router & telling app to use it
const artists = require('./routes/artists');
const home = require('./routes/home');

const app = express()
const port = 3000


// configure the middleware for parsing HTML requeest body

app.use(express.json());
app.use(express.urlencoded({extended: false})); //Parse URL-encoded bodies



app.use('/artists', artists);
app.use('/', home);



app.listen(port, () => console.log(`Express app listening on port ${port}!`))
