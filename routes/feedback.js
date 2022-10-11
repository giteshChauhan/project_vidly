const { Feedback, validate } = require("../models/feedback");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/all", [auth, admin], async (req, res) => {
  const feedbacks = await Feedback.find().select(" -_id");
  if (!feedbacks) return res.status(200).send([]);
  res.status(200).send(feedbacks);
});

router.get("/", auth, async (req, res) => {
  const email = req.user.email;
  const feedback = await Feedback.find({ email });
  if (feedback) return res.status(200).send(feedback);
  res.status(200).send([]);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let feedback = await Feedback.findOneAndUpdate(
    { email: req.body.email },
    {
      $push: {
        feedbacks: { feedback: req.body.feedback, addedOn: Date.now() },
      },
    },
    { new: true }
  );
  if (!feedback) {
    feedback = new Feedback({
      email: req.body.email,
      ip: req.body.ip,
      feedbacks: [{ feedback: req.body.feedback, addedOn: Date.now() }],
    });
    await feedback.save();
  }
  return res.status(200).send(feedback.feedbacks);
});

module.exports = router;
