const express = require("express");
const mongoose = require("mongoose");
const { Movies, validate } = require("../models/movies");
const { Genre } = require("../models/genres");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movies.find();
  res.send(movies);
});

router.get("/:id", [auth, admin], async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid Id");
  const movie = await Movies.findById(req.params.id).select(
    "title year rating genre.name genre._id yt_id imdb_id -_id"
  );
  if (!movie) return res.send("No such ID exists");
  res.send(movie);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");

  const movie = new Movies({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    year: req.body.year,
    rating: req.body.rating,
    yt_id: req.body.yt_id,
    imdb_id: req.body.imdb_id,
  });
  await movie.save();
  res.send(movie);
});

router.put("/:id", [auth, admin], async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid Id");
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(mongoose.Types.ObjectId(req.body.genreId));
  if (!genre) res.status(400).send("Invalid genre ID");

  const movie = await Movies.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.params.id),
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      rating: req.body.rating,
      year: req.body.year,
      yt_id: req.body.yt_id,
      imdb_id: req.body.imdb_id,
    },
    { new: true }
  );
  if (!movie) res.status(400).send("Invalid movie ID");
  res.send(movie);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid Id");
  const movie = await Movies.findByIdAndRemove(req.params.id);
  if (!movie) return res.status(400).send("Invalid movie ID");
  res.send(movie);
});

module.exports = router;
