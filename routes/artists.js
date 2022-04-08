const express = require('express');
const Joi = require('joi');

const router = express.Router();

let artists = [
    {
        "ID":1,
        "FirstName":"Eugene",
        "LastName":"Delacroix"
    },
    {
        "ID":2,
        "FirstName":"Georges",
        "LastName":"Seurat"
    },
    {
        "ID":3,
        "FirstName":"Claude",
        "ArtistLastName":"Monet"
    }
    
    ];

    router.post('/', (req, res) => {

        const newArtistId = artists.length;
    
        const artist = { artistId: newArtistId, ...req.body };
      
        const result = validateArtist(req.body)
      
        if (result.error)
        {
          res.status(400).json(result.error);
          return;
        }
    
        artists.push(artist);
    
        res.location(`/artists/${artistNumber}`);
        res.status(201);
        res.json(artist);
    
    
     
        console.log(`Artist name is ${artist.name} number of artist(s) is ${artists.length}`);
    
    });
   
    router.get('/', (req, res) => {
        res.json(artists);
      })

    //GET a specific artist
    router.get('/:id', (req,res) => {
    
        const id = req.params.id;
        const artist = artists.find(a => a.artistId == parseInt(req.params.id))
    
        if (!artist) {
            res.status(404);
            res.json({error: 'not found'});
            return
        }
    
         res.json(artist);
     })
    
    //DELETE a specific artist.
    router.delete('/:id',(req, res) => {
        const id = req.params.id;
        const artist = artists.find(a => a.artistId == parseInt(req.params.id))
    
        
        if(!artist) {
            res.status(404).json('artist with that ID {id} was not found');
            return;
        }
        const index = artists.indexOf(artist);
    
        artists.splice(index, 1);
        res.send(artist);
    
      })
    
      //Updating artist
      router.put('/:id', (req, res) => {
    
        const id = req.params.id;
      
        const result = validateArtist(req.body)
      
        if (result.error)
        {
          res.status(400).json(result.error);
          return;
        }
    
        const artist = artists.find(a => a.artistId == parseInt(req.params.id))
    
      if (!artist) {
        res.status(404).json(`artist with that ID {req.params.id} was not found`);
        return;
      }
    
      console.log(`changing artist ${artist.name}`);
      artist.name = req.body.name;
      artist.quantity = req.body.quantity;
    
      res.send(artist);
    
    })
    
    //this will take an object and return a result 
    
    function validateArtist(artist) {
        const schema = Joi.object({
        FirstName: Joi.string().min(3).required(), //name must exist and it must have a minimum of 3 characters. 
        LastName: Joi.string().min(3).required(),
          //quantity: Joi.number().integer().min(0)
        })
        return schema.validate(artist);
      }
      module.exports = router;