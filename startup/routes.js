const express = require("express");
const cors = require("cors");
const genres = require("../routes/genres");
const cinema = require("../routes/cinema");
const contentType = require("../routes/contentType");
const movies = require("../routes/movies");
const watchLater = require("../routes/watchLater");
const history = require("../routes/history");
const users = require("../routes/users");
const login = require("../routes/login");
const auth = require("../middleware/auth");
const error = require("../middleware/error");
const allowCors = require("../middleware/cors");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(allowCors());
  app.use("/api/genres", genres);
  app.use("/api/cinema", cinema);
  app.use("/api/contentType", contentType);
  app.use("/api/movies", movies);
  app.use("/api/watchLater", auth, watchLater);
  app.use("/api/history", auth, history);
  app.use("/api/users", users);
  app.use("/api/login", login);
  app.use(error);
};
