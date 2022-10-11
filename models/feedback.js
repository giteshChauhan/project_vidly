const mongoose = require("mongoose");
const Joi = require("joi");

const feedbackSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 11,
    maxlength: 255,
    required: true,
    unique: true,
  },
  feedbacks: [
    {
      feedback: {
        type: String,
        minlength: 64,
        maxlength: 10000,
        required: true,
      },
      addedOn: { type: Date, required: true },
    },
  ],
  ip: { type: String, required: true },
});

const Feedback = mongoose.model("feedback", feedbackSchema);

validateFeedback = (feedbackCopy) => {
  const schema = Joi.object({
    email: Joi.string().min(11).max(255).required().email(),
    feedback: Joi.string().min(64).max(10000).required(),
    ip: Joi.string().required(),
  });
  return schema.validate(feedbackCopy);
};

exports.validate = validateFeedback;
exports.Feedback = Feedback;
