const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String },
  username: { type: String },
  password: { type: String },
  createdon: { type: Date, default: new Date().getTime() },
});
const USER = mongoose.model("USER", userSchema);

module.exports = {
  USER,
};
