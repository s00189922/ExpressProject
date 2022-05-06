const express = require('express')
const Joi = require('joi')
const mongoose = require('mongoose');
const cors = require('cors');
const https = require('https')
const cookieParser = require('cookie-parser')

//const fs = require('fs'); /*****************SSL CODE****************/


//importing router/routes & telling app to use it
const artists = require('./routes/artists');
const artworks = require('./routes/artworks');
const tickets = require('./routes/tickets');
const events = require('./routes/events');
const home = require('./routes/home');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();
const port = 3000

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

const corsOptions = {
  origin: 'https://localhost:4200',
  credentials: true // for cookies
}

// configure the middleware for parsing HTML requeest body

app.use(express.json());
app.use(express.urlencoded({extended: false})); //Parse URL-encoded bodies
app.use(cors(corsOptions));
app.use(cookieParser());

// the routes
app.use('/artists', artists);
app.use('/artworks', artworks);
app.use('/tickets', tickets);
app.use('/events', events);
app.use('/users', users);
app.use('/auth', auth);
app.use('/', home);

/*****************SSL CODE****************/
// const serverOptions = {
//   key: fs.readFileSync("ssl/key.pem"),
//   cert: fs.readFileSync("ssl/cert.pem")
// };

// https.createServer(serverOptions,app).listen(8080,() =>
// console.log(`listening on 8080, don't forget the https`));
/*****************SSL CODE****************/


app.listen(port, () => console.log(`Express app listening on port ${port}!`))

