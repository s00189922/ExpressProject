
const mongoose = require('mongoose');
const express = require('express');
const validationMiddleware = require('../middleware/jwtvalidation');

// use object destructuring

const { Ticket, validate } = require('../models/tickets');

const router = express.Router();


router.post('/', validationMiddleware.validJWTNeeded, async (req, res) => {

  let result = validate(req.body)

  if (result.error) {
    res.status(400).json(result.error);
    return;
  }


  let ticket = new Ticket(req.body);

  try {

    ticket = await ticket.save();
    res.location(`/${ticket._id}`)
      .status(201)
      .json(ticket);
  }
  catch {
    res.status(500).json(result.error);
  }


});

router.get('/', async (req, res) => {

  const { ticket_type, year, limit, pagenumber, pagesize } = req.query;

  let filter = {}

  if (ticket_type) {
    filter.ticket_type = { $regex: `${ticket_type}`, $options: 'i' };
  }

  // the year filter first needs to parse the year

  const yearNumber = parseInt(year)



  if (!isNaN(yearNumber)) {
    filter.date = yearNumber
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

  const tickets = await Ticket.
    find(filter).
    limit(pageSizeNumber).
    sort({ date : -1}).
    skip((pageNumberNumber -1)*pageSizeNumber)




  res.json(tickets);
})


router.get('/:id', validationMiddleware.validJWTNeeded, async (req, res) => {

  try {

    const ticket = await Ticket.findById(req.params.id);
    if (ticket) {
      res.json(ticket);
    }
    else {
      res.status(404).json('Not found');
    }
  }
  catch {
    res.status(404).json('Not found: id is weird');
  }

})


router.delete('/:id', validationMiddleware.validJWTNeeded, async (req, res) => {

  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id)
    res.send(ticket)
  }
  catch {
    res.status(404).json(`ticket with that ID ${req.params.id} was not found`);
  }

})

router.put('/:id', async (req, res) => {



  const result = validate(req.body)

  if (result.error) {
    res.status(400).json(result.error);
    return;
  }

  console.log(req.body);

  try {

    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (ticket) {
      res.json(ticket);
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