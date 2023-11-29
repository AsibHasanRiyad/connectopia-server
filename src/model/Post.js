
const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
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

const Post = model('Post', PostSchema);

module.exports = Post
