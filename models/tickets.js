const Joi = require('joi');
const mongoose = require('mongoose');

//information which is being stored about a ticket

const ticketSchema = new mongoose.Schema({
    title: String,
    year_written: Number,
    edition: String,
    price: Number,
    nested: { author : { name : String, nationality : String}},
    tags: [String]
})

const Ticket = mongoose.model('Ticket', ticketSchema);

//this will take an object and return a result 

function validateTicket(ticket) {
    const schema = Joi.object({
        ticket_type: Joi.string().min(3), //must exist and it must have a minimum of 3 characters. 
        event_type: Joi.string().min(4),  //must exist and it must have a minimum of 4 characters. 
        date: Joi.number().integer().min(2025), //Minimum 2025
        price: Joi.number(),
        tags: Joi.array().items(Joi.string())
    })
    return schema.validate(ticket);
}

exports.Ticket = Ticket;
exports.validate = validateTicket;