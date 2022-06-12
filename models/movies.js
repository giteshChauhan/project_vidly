const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genres');

const movieSchema = new mongoose.Schema({
    title: {type:String,minlength:3,maxlength:30,required:true,unique:true},
    genre: {type:genreSchema,required:true},
    numberInStock:{type:Number,required:true,min:0,max:1000},
    dailyRentalRate:{type:Number,required:true,min:0,max:255}
});

const Movies = mongoose.model('movie',movieSchema);

function validateMovie(movie){
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });
    return schema.validate(movie);
}

exports.Movies = Movies;
exports.validate = validateMovie;