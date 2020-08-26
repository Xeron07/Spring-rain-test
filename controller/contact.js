const route = require("express").Router();
const ContactModel = require("../models/contactModel");
route.get("/", (req, res) => {
  res.send("Hello world api");
});

route.get("/all", async (req, res) => {
  const data = await ContactModel.find({});
  if (data) res.json({ status: true, data });
  else res.json({ status: false, data: [] });
});

route.get("/single/:id", async (req, res) => {
  const data = await ContactModel.findOne({ u_id });
  if (data) res.json({ status: true, data });
  else res.json({ status: false, data: null });
});

route.post("/add", async (req, res) => {
  const { name, phoneNumber } = req.body;
  const data = new ContactModel({
    u_id: Date.now(),
    name,
    phoneNumber,
  });
  const response = await data.save();
  if (response) res.json({ status: true, msg: "Contact Added" });
  else res.json({ status: false, msg: "Contact not added" });
});

route.post("/delete", async (req, res) => {
  const { u_id } = req.body;

  const response = await ContactModel.deleteOne({ u_id });
  if (response) res.json({ status: true, msg: "Contact Deleted" });
  else res.json({ status: false, msg: "Operation not successful" });
});

module.exports = route;
