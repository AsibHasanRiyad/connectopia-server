
const { Schema, model } = require("mongoose");

const TagsSchema = new Schema({
  value: String,
  label: String

})

const Tags = model('Tags', TagsSchema);

module.exports = Tags