const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const validationMiddleware = require('../middleware/jwtvalidation');

// use object destructuring

const { Artist, validate } = require('../models/artists');

const router = express.Router();



    router.post('/', async(req, res) => {

        let result = validate(req.body)
      
        if (result.error)
        {
          res.status(400).json(result.error);
          return;
        }

        let artist = new Artist(req.body);
        try {

        artist = await artist.save();
        res.location(`/${artist._id}`)
         .status(201)
         .json(artist);
        }
        catch {
          res.status(500).json(result.error);
        }
        

    
    });
   
    router.get('/', async(req, res) => {
    
      const { first_name, pagenumber,pagesize,year,limit } = req.query;

      let filter = {}
    
      if (first_name) {
        filter.first_name = { $regex: `${first_name}`, $options: 'i' }; //the "i" makes it case insenstive
      }

     /*the year filter first needs to parse the year
     this makes sure that the query string value converts to an integer.*/

       const yearNumber = parseInt(year)
    
      if (!isNaN(yearNumber)) {
        filter.year_born = yearNumber
      }
    
      let limitNumber = parseInt(limit);
    
      if (isNaN(limitNumber)) {
        limitNumber = 0
      }
    
      let pageSizeNumber = parseInt(pagesize);
    
      if (isNaN(pageSizeNumber)) {
        pageSizeNumber = 0
      }
      let pageNumberNumber = parseInt(pagenumber);
    
      if (isNaN(pageNumberNumber)) {
        pageNumberNumber = 1
      }
    
      console.table(filter);
    
      
      const artists = await Artist.
        find(filter).
        limit(pageSizeNumber).
        sort({year_born : -1}). /*sort year_born in descending order. */
        skip((pageNumberNumber -1)*pageSizeNumber)
    
    
    
    
      res.json(artists);
    })

    //GET a specific artist
    router.get('/:id', validationMiddleware.validJWTNeeded, async (req,res) => {

      try {
    
        const artist = await Artist.findById(req.params.id);
        if (artist) {
          res.json(artist);
        }
        else {
          res.status(404).json('Not found');
        }
      }
      catch {
        res.status(404).json('Not found: id is weird');
      }
    
    })
    
    //DELETE a specific artist.
    router.delete('/:id',async (req, res) => {

      try {
        const artist = await Artist.findByIdAndDelete(req.params.id)
        res.send(artist)
      }
      catch {
        res.status(404).json(`artist with that ID ${req.params.id} was not found`);
      }
    
    })
    
      //Updating artist
      router.put('/:id',async(req, res) => {
    
        const result = validate(req.body)

        if (result.error) {
          res.status(400).json(result.error);
          return;
        }
      
        try {
      
          const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
          if (artist) {
            res.json(artist);
          }
          else {
            res.status(404).json('Not found');
          }
        }
        catch {
          res.status(404).json('Not found: id is weird');
        }
      
      })

      module.exports = router;