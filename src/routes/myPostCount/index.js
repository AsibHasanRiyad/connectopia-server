var express = require("express");
const Post = require("../../model/Post");
var router = express.Router();

router.get("/myPostCount", async (req, res) => {
    const email = req.query.email;
    console.log(email);
    const count = await Post.countDocuments({email: email});
    res.send({ count });
  });


  module.exports = router