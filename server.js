/** @format */

const express = require("express");
const expressSession = require("express-session");
const api = require("./controller/contact");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", api);

app.listen(5000, (req, res) => {
  console.log("Started");
});
