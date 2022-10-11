const express = require("express");
const bcrypt = require("bcrypt");
const { Users, validate } = require("../models/users");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const _ = require("lodash");
const router = express.Router();

router.get("/", [auth, admin], async (req, res) => {
  const users = await Users.find().select(" -userMetaInfo -password");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Users.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new Users(
    _.pick(req.body, ["name", "email", "password", "ip", "os", "userMetaInfo"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
