const moment = require("moment");
const express = require("express");
const router = express.Router();
const { validate, History } = require("../models/history");

router.get("/", async (req, res) => {
  const userId = req.user._id;
  const history = await History.findOne({ userId });
  if (!history) return res.status(200).send([]);
  res.status(200).send(history.moviesId);
});

router.post("/", async (req, res) => {
  const userId = req.user._id;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let history = await History.findOne({ userId });
  if (!history) {
    history = new History({
      userId,
      moviesId: [{ movieId: req.body.movieId, addedOn: Date.now() }],
    });
    await history.save();
    return res.status(200).send(history.moviesId);
  }
  const movies = history.moviesId.filter(
    (movie) =>
      movie.movieId === req.body.movieId &&
      moment(movie.addedOn).format("l") === moment(Date.now()).format("l")
  );
  if (movies.length === 0) {
    history = await History.findOneAndUpdate(
      { userId },
      {
        userId,
        $push: {
          moviesId: { movieId: req.body.movieId, addedOn: Date.now() },
        },
      },
      { new: true }
    );
  }
  res.status(200).send(history.moviesId);
});

module.exports = router;
