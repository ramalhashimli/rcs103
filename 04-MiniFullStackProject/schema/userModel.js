const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  password: String,
  id: String,
});
const User = mongoose.model("User", schema);

module.exports = User;