require("dotenv").config();
const axios = require("axios");
const URL_BASE = `${process.env.URL_BASE}/user`;

module.exports = async () => {
  const response = await axios.post(`${URL_BASE}/authenticate`, {
    email: "filipeyoga@gmail.com",
    password: 123456789,
  });
  return response.data.token;
};
