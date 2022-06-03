
const mongoose = require('mongoose');
const Joi = require('joi');

//information which is being stored about an event

const eventSchema = new mongoose.Schema({
    title: String,
    event_name: String,
    start_date: Number,
    end_date: Number,
    tags: [String]
})

const Event = mongoose.model('Event', eventSchema);

//this will take an object and return a result 

function validateEvent(event) {
    const schema = Joi.object({
        title: Joi.string().min(2).required(), //name must exist and it must have a minimum of 3 characters. 
        artist_name: Joi.string().min(2).required(),
        end_date: Joi.number(),
        start_date: Joi.number().integer().min(2020), //Minimum 2020
        tags: Joi.array().items(Joi.string())
    })
    return schema.validate(event);
}

exports.Event = Event;
exports.validate = validateEvent;