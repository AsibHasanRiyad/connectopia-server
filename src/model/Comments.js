
const { Schema, model } = require("mongoose");

const CommentsSchema = new Schema({
  comment: String,
  name: String,
  email: String,
  image: String,
  postedTime: Date,
  rootPostId: String,
})

const Comments = model('Comments', CommentsSchema);

module.exports = Comments
