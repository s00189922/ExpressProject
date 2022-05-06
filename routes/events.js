const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const validationMiddleware = require('../middleware/jwtvalidation');

// use object destructuring

const { Event, validate } = require('../models/events');

const router = express.Router();

    router.post('/', async(req, res) => {

        let result = validate(req.body)
      
        if (result.error)
        {
          res.status(400).json(result.error);
          return;
        }

        let event = new Event(req.body);
        try {

        event = await event.save();
        res.location(`/${event._id}`)
         .status(201)
         .json(event);
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
        filter.start_date = yearNumber
      }

      if (!isNaN(yearNumber)) {
        filter.end_date = yearNumber
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
    
      
      const events = await Event.
        find(filter).
        limit(pageSizeNumber).
        sort({start_date : -1, end_date : -1}). /*sort years in descending order. */
        skip((pageNumberNumber -1)*pageSizeNumber)
    
    
    
    
      res.json(events);
    })

    //GET a specific event
    router.get('/:id', validationMiddleware.validJWTNeeded, async (req,res) => {

      try {
    
        const event = await Event.findById(req.params.id);
        if (event) {
          res.json(event);
        }
        else {
          res.status(404).json('Not found');
        }
      }
      catch {
        res.status(404).json('Not found: id is weird');
      }
    
    })
    
    //DELETE a specific event.
    router.delete('/:id',async (req, res) => {

      try {
        const event = await Event.findByIdAndDelete(req.params.id)
        res.send(event)
      }
      catch {
        res.status(404).json(`event with that ID ${req.params.id} was not found`);
      }
    
    })
    
      //Updating event
      router.put('/:id',async(req, res) => {
    
        const result = validate(req.body)

        if (result.error) {
          res.status(400).json(result.error);
          return;
        }
      
        try {
      
          const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
          if (event) {
            res.json(event);
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