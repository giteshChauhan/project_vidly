const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genres");
const { cinemaSchema } = require("./cinema");
const { contentTypeSchema } = require("./contentType");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
    unique: true,
  },
  thumbnailUrl: { type: String, required: true },
  genre: { type: genreSchema, required: true },
  cinema: { type: cinemaSchema, required: true },
  contentType: { type: contentTypeSchema, required: true },
  year: { type: Number, required: true, min: 1950, max: 2024 },
  rating: { type: Number, required: true, min: 0, max: 10 },
  yt_id: { type: String, required: true, length: 11 },
  imdb_id: { type: String, required: true },
});

const Movies = mongoose.model("movie", movieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    thumbnailUrl: Joi.string().required(),
    genreId: Joi.objectId().required(),
    cinemaId: Joi.objectId().required(),
    contentTypeId: Joi.objectId().required(),
    rating: Joi.number().min(0).max(10).required(),
    year: Joi.number().min(1950).max(2024).required(),
    yt_id: Joi.string().length(11).required(),
    imdb_id: Joi.string().min(9).max(10).required(),
  });
  return schema.validate(movie);
}

exports.Movies = Movies;
exports.validate = validateMovie;
