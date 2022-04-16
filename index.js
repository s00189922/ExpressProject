const express = require('express')
const Joi = require('joi')
const mongoose = require('mongoose');
const cors = require('cors');

//importing router & telling app to use it
const artists = require('./routes/artists');
const home = require('./routes/home');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();
const port = 3000

// configure the middleware for parsing HTML requeest body

const connectionString = 'mongodb://127.0.0.1:27017/artists2022'

mongoose.connect(connectionString, {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
}).
catch ( error => {
  console.log('Database connection refused' + error);
  process.exit(2);
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("DB connected")
});


// app.get('/', (req, res) => {

//     res.send('Hello World isn\'t life great from aisling!');
//   })
  
//   app.get('/addArtist/:name', (req, res) => {
  
//     const aArtist = new Artist({ first_name: req.params.first_name });
  
//     aArtist.save()
//       .then((result) => res.send(`${req.params.first_name} was saved`))
//       .catch((err) =>
//         console.error(err));
//   });
  

app.use(express.json());
app.use(express.urlencoded({extended: false})); //Parse URL-encoded bodies
app.use(cors());

// the routes
app.use('/', home);
app.use('/artists', artists);
app.use('/users', users);
app.use('/auth', auth);


app.listen(port, () => console.log(`Express app listening on port ${port}!`))
