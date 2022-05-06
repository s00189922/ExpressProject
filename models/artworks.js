const mongoose = require('mongoose');
const Joi = require('joi');

const artworkSchema = new mongoose.Schema({
    title: String,
    artist: String,
    year: Number,
    value: Number,
    medium: String,
    tags: [String]
})

const Artwork = mongoose.model('Artwork', artworkSchema);

//this will take an object and return a result 

function validateArtwork(artwork) {
    const schema = Joi.object({
        title: Joi.string().min(3).required(), //title must exist and it must have a minimum of 3 characters. 
        artist: Joi.string().min(3).required(),
        year: Joi.number().integer().min(1500),
        value: Joi.number(),
        medium: Joi.string()
    })
    return schema.validate(artwork);
}

exports.Artwork = Artwork;
exports.validate = validateArtwork;