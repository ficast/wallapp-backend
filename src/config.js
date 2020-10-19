require('dotenv').config()

global.SALT_KEY = "f5b99242-6504-4ca3-90f2-05e78e5761ef";
global.EMAIL_TMPL = "Hello <strong>{0}</strong>, welcome to The Wall!";

module.exports = {
  connectionString: process.env.CONNECTION_STRING,
  sendgridKey: process.env.SENDGRID_KEY,
  containerConnectionString: process.env.CONTAINER_KEY,
};
