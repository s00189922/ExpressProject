const express = require('express')
const app = express()
const port = 3000

// configure the middleware for parsing HTML requeest body

app.use(express.json());
app.use(express.urlencoded({extended: false})); //Parse URL-encoded bodies

let art = [];

app.get('/', (req, res) => res.send('Hello from Aisling!'))

app.get('/artists', (req, res) => res.send('Art Work'));

app.post('/artists', (req, res) => {

    const artist = req.body;

   const artistNumber = artists.length;

    artists.push(artist);

    res.location(`/artists/${artistNumber}`);
    res.status(201);
    res.json(artist);


    res.send ('Artist has been added to the database');
    console.log(`Artist name is ${artist.name} number of artist(s) is ${artists.length}`);

});
//GET all the artists
app.get('/artists', (req, res) => {
    res.send(artists);
})
//GET a specific artist
app.get('/artists/:id', (req,res) => {

    let id = req.params.id;
     res.json(artists[id]);
 })
//DELETE a specific artist.
 app.delete('/artists/:id',(req, res) => {
    let id = req.params.id; 
    console.log(`removing artist ${artists[id].name}`)
    artists.splice(req.params.id, 1);
    res.send(artists);

  })

app.listen(port, () => console.log(`Express app listening on port ${port}!`))
