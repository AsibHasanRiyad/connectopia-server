const { Schema, model } = require("mongoose");

const UsersSchema = new Schema({
  name: String,
  email: String,
  image: String,
  role: String,
  status: String,

})

const Users = model('Users', UsersSchema);

module.exports = Users