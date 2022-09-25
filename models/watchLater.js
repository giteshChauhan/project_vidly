const mongoose = require("mongoose");
const Joi = require("joi");

const watchLaterSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  moviesId: [
    {
      movieId: { type: String, required: true },
      addedOn: { type: Date, required: true },
    },
  ],
  oldMoviesId: [
    {
      movieId: { type: String, required: true },
      addedOn: { type: Date, required: true },
      removedOn: { type: Date, default: null },
    },
  ],
});

const WatchLater = mongoose.model("watchLater", watchLaterSchema);

const validateWatchLater = (watchLater) => {
  const schema = Joi.object({
    movieId: Joi.objectId().required(),
  });
  return schema.validate(watchLater);
};

exports.validate = validateWatchLater;
exports.WatchLater = WatchLater;
