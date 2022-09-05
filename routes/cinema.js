const { Cinema, validate } = require("../models/cinema");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const cinema = await Cinema.find();
  res.send(cinema);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid Id");
  const cinema = await Cinema.findById(mongoose.Types.ObjectId(req.params.id));
  if (!cinema) return res.send("No such id exists");
  res.send(cinema);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let cinema = await Cinema.findOne({ name: req.body.name });
  if (cinema) return res.status(400).send("Cinema already exits.");

  cinema = new Cinema({ name: req.body.name });
  await cinema.save();
  res.send(cinema);
});

router.put("/:id", [auth, admin], async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid Id");
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let cinema = await Cinema.findOne({ name: req.body.name });
  if (cinema) return res.status(400).send("Cinema already exits.");

  cinema = await Cinema.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.params.id),
    { name: req.body.name },
    {
      new: true,
    }
  );
  if (!cinema) return res.send("No such id exists");

  res.send(cinema);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid Id");
  const cinema = await Cinema.findByIdAndRemove(
    mongoose.Types.ObjectId(req.params.id)
  );
  if (!cinema) return res.send("No such id exists");
  res.send(cinema);
});

module.exports = router;
