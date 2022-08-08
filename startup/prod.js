const helmet = require("helmet");
const compression = require("compression");
const cors = reqiure("cors");

module.exports = function (app) {
  app.use(helmet());
  app.use(compression());
  app.use(cors());
};
