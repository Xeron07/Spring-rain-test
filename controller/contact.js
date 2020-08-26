const route = require("express").Router();

route.get("/", (req, res) => {
  res.send("Hello world api");
});

module.exports = route;
