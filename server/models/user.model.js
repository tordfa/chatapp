const mongoose = require("mongoose");

var messages = new mongoose.Schema({userId: 'string', text: 'string'});

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
    messages: [messages]
  }),"messages"
);
module.exports = User;