const { ContentType, validate } = require("../models/contentType");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const contentType = await ContentType.find();
  res.send(contentType);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid Id");
  const contentType = await ContentType.findById(
    mongoose.Types.ObjectId(req.params.id)
  );
  if (!contentType) return res.send("No such id exists");
  res.send(contentType);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let contentType = await ContentType.findOne({ name: req.body.name });
  if (contentType) return res.status(400).send("ContentType already exits.");

  contentType = new ContentType({ name: req.body.name });
  await contentType.save();
  res.send(contentType);
});

router.put("/:id", [auth, admin], async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid Id");
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let contentType = await ContentType.findOne({ name: req.body.name });
  if (contentType) return res.status(400).send("ContentType already exits.");

  contentType = await ContentType.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.params.id),
    { name: req.body.name },
    {
      new: true,
    }
  );
  if (!contentType) return res.send("No such id exists");

  res.send(contentType);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("Invalid Id");
  const contentType = await ContentType.findByIdAndRemove(
    mongoose.Types.ObjectId(req.params.id)
  );
  if (!contentType) return res.send("No such id exists");
  res.send(contentType);
});

module.exports = router;
