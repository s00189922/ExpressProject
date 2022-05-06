const Joi = require('joi');
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: String,
    year_written: Number,
    edition: String,
    price: Number,
    nested: { author : { name : String, nationality : String}},
    tags: [String]
})

const Ticket = mongoose.model('Ticket', ticketSchema);

function validateTicket(ticket) {
    const schema = Joi.object({
        ticket_type: Joi.string().min(3),
        event_type: Joi.string().min(4),
        date: Joi.number().integer().min(2025),
        price: Joi.number(),
        tags: Joi.array().items(Joi.string())
    })
    return schema.validate(ticket);
}

exports.Ticket = Ticket;
exports.validate = validateTicket;