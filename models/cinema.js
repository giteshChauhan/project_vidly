const mongoose = require("mongoose");
const Joi = require("joi");

const cinemaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 12,
  },
});

const Cinema = mongoose.model("cinema", cinemaSchema);

function validateCinema(cinema) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(cinema);
}

exports.Cinema = Cinema;
exports.cinemaSchema = cinemaSchema;
exports.validate = validateCinema;
