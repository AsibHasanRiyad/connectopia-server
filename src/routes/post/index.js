var express = require("express");
const { getAllPost } = require("../../api/post/controller");
const Post = require("../../model/Post");
var router = express.Router();

router.get("/post", getAllPost);
router.post("/post", async (req, res) => {
  const data = req.body;
  const result = await Post.create(data);
  res.send(result);
});

//individual post routes
router.get("/post/:id", async (req, res) => {
  const id = req.params.id;
  //   const filter = { _id: new ObjectId(id) };
  const result = await Post.findById(id);
  res.send(result);
});
router.delete("/post/:id", async (req, res) => {
  const id = req.params.id;
  //   const filter = { _id: new ObjectId(id) };
  const result = await Post.findByIdAndDelete(id);
  res.send(result);
});
//update
router.patch("/post/upvote/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id)
  const currentUpVote = parseInt(post.upVote, 10);
  const updatedUpVote = currentUpVote + 1;
  const result = await Post.findByIdAndUpdate(
    id,
    { $set: { upVote: updatedUpVote.toString() } },
    { new: true, runValidators: true }
  )
  res.send(result)
});
router.patch("/post/downvote/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id)
  const currentDownVote = parseInt(post.upVote, 10)
  const updateDownVote = currentDownVote + 1;
  const result = await Post.findByIdAndUpdate(id,
    {$set: {downVote: updateDownVote.toString()}},
    {new: true , runValidators: true}
  )

  res.send(result)
});

module.exports = router;
