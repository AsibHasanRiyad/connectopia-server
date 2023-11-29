

var express = require("express");
const Comments = require("../../model/Comments");
var router = express.Router();


router.get('/comments', async(req, res) =>{
    const rootPostId = req.query.rootPostId
    const filter = {rootPostId : rootPostId}
    const result = await Comments.find(filter)
    res.send(result)

})
router.post('/comments', async(req, res) =>{
    const data = req.body
    const result = await Comments.create(data)
    res.send(result)
})


module.exports = router