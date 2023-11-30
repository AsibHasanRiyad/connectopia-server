var express = require("express");
const Announcements = require("../../model/Announcement");
const verifyToken = require("../../middleware/verifyToken");
const verifyAdmin = require("../../middleware/verifyAdmin");
var router = express.Router();

router.get("/announcement", async (req, res) => {
  const result = await Announcements.find()
  res.send(result);
});
router.post("/announcement",verifyToken, verifyAdmin, async (req, res) => {
  const data = req.body;
  const result = await Announcements.create(data);
  res.send(result);
});

module.exports = router