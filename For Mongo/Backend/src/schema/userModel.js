const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  password: String,
  id: String,
  isAdmin : {
    type: Boolean,
    default: false,
  }
});
const User = mongoose.model("User", schema);

module.exports = User;
