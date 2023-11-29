var express = require("express");
const Announcements = require("../../model/announcement");
var router = express.Router();

router.get("/announcement", async (req, res) => {
  const result = await Announcements.find()
  res.send(result);
});
router.post("/announcement", async (req, res) => {
  const data = req.body;
  const result = await Announcements.create(data);
  res.send(result);
});

module.exports = router