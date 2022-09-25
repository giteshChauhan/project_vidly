const express = require("express");
const mongoose = require("mongoose");
const { WatchLater, validate } = require("../models/watchLater");
const router = express.Router();

router.get("/", async (req, res) => {
  const userId = req.user._id;
  const watchLater = await WatchLater.findOne({
    userId,
  });
  if (!watchLater) return res.status(200).send([]);
  res.status(200).send(watchLater.moviesId);
});

router.post("/", async (req, res) => {
  const userId = req.user._id;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let watchLater = await WatchLater.findOne({ userId });

  if (!watchLater) {
    watchLater = new WatchLater({
      userId,
      moviesId: [{ movieId: req.body.movieId, addedOn: Date.now() }],
    });
    await watchLater.save();
    return res.status(200).send(watchLater.moviesId);
  }

  watchLater = await WatchLater.findOne({
    userId,
    "moviesId.movieId": req.body.movieId,
  });

  if (!watchLater) {
    watchLater = await WatchLater.findOneAndUpdate(
      { userId },
      {
        userId,
        $push: {
          moviesId: { movieId: req.body.movieId, addedOn: Date.now() },
        },
      },
      { new: true }
    );
    return res.status(200).send(watchLater.moviesId);
  }
  res.status(400).send("Movie already exists");
});

router.delete("/:movieId", async (req, res) => {
  const userId = req.user._id;
  if (!mongoose.isValidObjectId(req.params.movieId))
    return res.status(400).send("Invalid Id");

  const watchLater = await WatchLater.findOneAndUpdate(
    { userId, "moviesId.movieId": req.params.movieId },
    {
      $pull: {
        moviesId: { movieId: req.params.movieId },
      },
    },
    { new: false }
  );

  if (!watchLater) return res.status(404).send("No such movie");
  const movie = watchLater.moviesId.filter(
    (movie) => movie.movieId === req.params.movieId
  );
  await WatchLater.findOneAndUpdate(
    userId,
    {
      userId,
      $push: {
        oldMoviesId: {
          movieId: req.params.movieId,
          addedOn: movie[0].addedOn,
          removedOn: Date.now(),
        },
      },
    },
    { new: true }
  );
  res.status(200).send("Success");
});

module.exports = router;
