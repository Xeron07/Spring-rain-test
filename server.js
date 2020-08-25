/** @format */

const express = require("express");
const expressSession = require("express-session");

const app = express();

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, (req, res) => {
  console.log("Started");
});
