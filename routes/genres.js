const { Genre, validate } = require("../models/genres");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid Id");
  const genre = await Genre.findById(mongoose.Types.ObjectId(req.params.id));
  if (!genre) return res.send("No such id exists");
  res.send(genre);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name });
  await genre.save();
  res.send(genre);
});

router.put("/:id", [auth, admin], async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid Id");
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.params.id),
    { name: req.body.name },
    {
      new: true,
    }
  );
  if (!genre) return res.send("No such id exists");

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid Id");
  const genre = await Genre.findByIdAndRemove(
    mongoose.Types.ObjectId(req.params.id)
  );
  if (!genre) return res.send("No such id exists");
  res.send(genre);
});

module.exports = router;
