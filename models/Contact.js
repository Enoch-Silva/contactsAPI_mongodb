const mongoose = require("mongoose");

const Contacts = mongoose.model("Contact", {
  name: String,
  number: Number,
  email: String,
});
module.exports = Contacts;
 