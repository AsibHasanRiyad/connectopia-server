
var express = require("express");
const Tags = require("../../model/Tags");
const verifyToken = require("../../middleware/verifyToken");
const verifyAdmin = require("../../middleware/verifyAdmin");
var router = express.Router();
router.get('/tags',async (req, res) =>{
    const result = await Tags.find()
    res.send(result)
})
router.post('/tags',verifyToken, verifyAdmin, async(req, res) =>{
    const data = req.body;
    const result = await Tags.create(data)
    res.send(result)
})


module.exports = router;