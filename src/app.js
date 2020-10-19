"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");

const app = express();
const router = express.Router();

// Connecta ao banco

try {
  mongoose.connect(config.connectionString,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("connected to db")
  );
} catch (error) {
  console.log("could not connect");
}

// Carrega os Models
require("./models/user");
require('./models/post');

// Carrega as Rotas
const indexRoute = require("./routes/index-route");
const userRoute = require("./routes/user-route");
const postRoute = require("./routes/post-route");

app.use(bodyParser.json({
  limit: '5mb'
}));

app.use(bodyParser.urlencoded({
  extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use("/", indexRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);

module.exports = app;
