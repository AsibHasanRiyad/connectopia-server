
const { Schema, model } = require("mongoose");

const PaymentSchema = new Schema({
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

const Payments = model('Payments', PaymentSchema);

module.exports = Payments
