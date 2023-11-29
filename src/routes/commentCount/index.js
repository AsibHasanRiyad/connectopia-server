var express = require("express");
const Comments = require("../../model/Comments");
var router = express.Router();

router.get("/commentCount", async (req, res) => {
    const count = await Comments.estimatedDocumentCount();
    res.send({ count });
  });


  module.exports = router