
const { Schema, model } = require("mongoose");

const CommentsSchema = new Schema({
  authorImage: String,
  name: String,
  email: String,
  upVote: Number,
  downVote: Number,
  postTitle: String,
  postDescription: String,
  postedTime: Date,
  tags: String,
})

const Comments = model('Comments', CommentsSchema);

module.exports = Comments
