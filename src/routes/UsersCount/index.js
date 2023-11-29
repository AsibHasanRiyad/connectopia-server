var express = require("express");
const Users = require("../../model/users");
var router = express.Router();

router.get("/usersCount", async (req, res) => {
    const count = await Users.estimatedDocumentCount();
    res.send({ count });
  });


  module.exports = router