
var express = require("express");
const Post = require("../../model/Post");
var router = express.Router();

router.get("/postCount", async (req, res) => {
    const count = await Post.estimatedDocumentCount();
    res.send({ count });
  });


  module.exports = router