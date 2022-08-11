const express = require("express");
const cors = require("cors");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const login = require("../routes/login");
const auth = require("../middleware/auth");
const error = require("../middleware/error");

const corsOptions = {
  origin: "https://projectvidly.netlify.app",
  optionsSuccessStatus: 200,
};

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsOptions));
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", auth, rentals);
  app.use("/api/users", users);
  app.use("/api/login", login);
  app.use(error);
};
