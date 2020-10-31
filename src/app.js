"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");
const cors = require('cors')


const app = express();
app.use(cors())
const router = express.Router();

// Database
try {
  mongoose.connect(config.connectionString,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    () => console.log("connected to db")
  );
} catch (error) {
  console.log("could not connect");
}

// Models
require("./models/user");
require('./models/post');

// Routes
const indexRoute = require("./routes/index-route");
const userRoute = require("./routes/user-route");
const postRoute = require("./routes/post-route");

app.use(bodyParser.json({
  limit: '5mb'
}));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use("/", indexRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);

module.exports = app;
