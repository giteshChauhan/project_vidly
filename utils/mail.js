const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const config = require("config");
const path = require("path");

module.exports = async function main(to, subject) {
  const transport = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: config.get("email"),
      pass: config.get("pass"),
    },
  });

  transport.use(
    "compile",
    hbs({
      viewEngine: "express-handlebars",
      viewPath: path.resolve("./views/"),
    })
  );

  const options = {
    from: config.get("email"),
    to,
    subject,
    template: "welcomeEmail",
    context: {
      layout: path.resolve("./views/welcomeEmail"),
    },
  };

  const info = await transport.sendMail(options);
  console.log("Message sent: %s", info.messageId);
};
