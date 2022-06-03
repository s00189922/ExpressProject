const Joi = require('joi');
const mongoose = require('mongoose');

//information which is being stored about a user

const userSchema = new mongoose.Schema({
        first_name: String,
        last_name: String,
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        },
);

//this will take an object and return a result 

function validateUser(user) {
    const schema = Joi.object({
        first_name: Joi.string(),
        last_name: Joi.string(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
