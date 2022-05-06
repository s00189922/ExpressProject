const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const validationMiddleware = require('../middleware/jwtvalidation');

// use object destructuring

const { Artwork, validate } = require('../models/artworks');

const router = express.Router();



    router.post('/', async(req, res) => {

        let result = validate(req.body)
      
        if (result.error)
        {
          res.status(400).json(result.error);
          return;
        }

        let artwork = new Artwork(req.body);
        try {

        artwork = await artwork.save();
        res.location(`/${artwork._id}`)
         .status(201)
         .json(artwork);
        }
        catch {
          res.status(500).json(result.error);
        }
        

    
    });
   
    router.get('/', async(req, res) => {
    
      const { title, pagenumber,pagesize,year,limit } = req.query;

      let filter = {}
    
      if (title) {
        filter.title = { $regex: `${title}`, $options: 'i' }; //the "i" makes it case insenstive
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
    
      
      const artworks = await Artwork.
        find(filter).
        limit(pageSizeNumber).
        sort({year : -1}). /*sort year in descending order. */
        skip((pageNumberNumber -1)*pageSizeNumber)
    
    
    
    
      res.json(artworks);
    })

    //GET a specific artwork
    router.get('/:id', validationMiddleware.validJWTNeeded, async (req,res) => {

      try {
    
        const artwork = await Artwork.findById(req.params.id);
        if (artwork) {
          res.json(artwork);
        }
        else {
          res.status(404).json('Not found');
        }
      }
      catch {
        res.status(404).json('Not found: id is weird');
      }
    
    })
    
    //DELETE a specific artwork.
    router.delete('/:id',async (req, res) => {

      try {
        const artwork = await Artwork.findByIdAndDelete(req.params.id)
        res.send(artwork)
      }
      catch {
        res.status(404).json(`artwork with that ID ${req.params.id} was not found`);
      }
    
    })
    
      //Updating artwork
      router.put('/:id',async(req, res) => {
    
        const result = validate(req.body)

        if (result.error) {
          res.status(400).json(result.error);
          return;
        }
      
        try {
      
          const artwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, { new: true });
          if (artwork) {
            res.json(artwork);
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