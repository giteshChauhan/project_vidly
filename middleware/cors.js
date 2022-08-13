const cors = require("cors");
const config = require("config");

function allowCors(res, req, next) {
  if (config.get("env") === "development") return cors();
  else {
    const corsOptions = {
      origin: "https://projectvidly.netlify.app",
      optionsSuccessStatus: 200,
    };

    return cors(corsOptions);
  }
  next();
}

module.exports = allowCors;
