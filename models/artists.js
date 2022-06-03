const mongoose = require('mongoose');
const Joi = require('joi');

//information which is being stored about an artist

const artistSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone_number: Number,
    gender: String,
    nationality: String,
    year_born: Number,
    tags: [String]
})

const Artist = mongoose.model('Artist', artistSchema);

//this will take an object and return a result 

function validateArtist(artist) {
    const schema = Joi.object({
        first_name: Joi.string().min(3).required(), //name must exist and it must have a minimum of 3 characters. 
        last_name: Joi.string().min(3).required(),
        email: Joi.string(),
        phone_number: Joi.number(),
        gender: Joi.string(),
        nationality: Joi.string(),
        year_born: Joi.number().integer().min(1500),
        tags: Joi.array().items(Joi.string())
    })
    return schema.validate(artist);
}

exports.Artist = Artist;
exports.validate = validateArtist;
