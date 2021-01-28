require("dotenv").config();
const bcrypt = require("bcryptjs");

global.SALT_KEY = bcrypt.genSaltSync(10);
global.EMAIL_TMPL = "Hello <strong>{0}</strong>, welcome to The Wall!";

module.exports = {
  connectionString: process.env.CONNECTION_STRING,
  sendgridKey: process.env.SENDGRID_KEY,
};
