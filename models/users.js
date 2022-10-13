const jwt = require("jsonwebtoken");
const config = require("config");
const passwordComplexity = require("joi-password-complexity");
const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 14,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 11,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  ip: { type: String, required: true },
  os: { type: String, required: true },
  userMetaInfo: { type: Object, required: true },
  isAdmin: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      country: this.userMetaInfo.country,
      date: this.userMetaInfo.processed_at,
      ip: this.ip,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Users = mongoose.model("user", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(14),
    email: Joi.string().required().min(11).max(255).email(),
    password: passwordComplexity().required(),
    ip: Joi.string().required(),
    os: Joi.string().required(),
    userMetaInfo: Joi.object().required(),
  });
  return schema.validate(user);
}

exports.validate = validateUser;
exports.Users = Users;
