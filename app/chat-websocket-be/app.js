require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

mongoose
  .connect(process.env.URI, clientOptions)
  .then(() => {
    console.log("MongoDB Successfully Connected...");
  })
  .catch((err) => {
    console.log("MongoDB have been errors...", err);
    mongoose.disconnect();
  });

app.use(cors());
module.exports = app;
