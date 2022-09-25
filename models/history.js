const mongoose = require("mongoose");
const Joi = require("joi");

const historySchemam = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  moviesId: [
    {
      movieId: { type: String, required: true },
      addedOn: { type: Date, required: true },
    },
  ],
});
const History = mongoose.model("history", historySchemam);

function validateHistory(history) {
  const schema = Joi.object({
    movieId: Joi.objectId().required(),
  });
  return schema.validate(history);
}

exports.validate = validateHistory;
exports.History = History;
