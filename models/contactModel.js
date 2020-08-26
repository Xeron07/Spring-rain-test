const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
  u_id: String,
  name: String,
  phoneNumber:String
});

module.exports = mongoose.model("contacts", contactSchema);
