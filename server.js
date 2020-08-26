/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const api = require("./controller/contact");

require("./models/contactModel");

const app = express();

//CONFIGURATIONS
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB CONNECTION
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api", api);

//CONFIGURATION FOR PRODUCTION

  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });


//SERVER CREATION
const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log(`Started at ${PORT}`);
});
