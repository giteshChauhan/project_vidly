const mongoose = require("mongoose");
const Joi = require("joi");

const contentTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 12,
  },
});

const ContentType = mongoose.model("contentType", contentTypeSchema);

function validateContentType(contentType) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(contentType);
}

exports.validate = validateContentType;
exports.ContentType = ContentType;
exports.contentTypeSchema = contentTypeSchema;
