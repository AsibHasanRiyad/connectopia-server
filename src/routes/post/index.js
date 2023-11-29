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
  //   const filter = {_id: new ObjectId(id)}
  //   const currentPost = await Post.findOne(filter);
  //   const currentUpVote = parseInt(currentPost.upVote)
  //   const updatedUpVote = currentUpVote + 1;
  //   const updateDoc = {
  //       $set:{
  //           upVote: updatedUpVote
  //       }
  //   }
  //   const result = await Post.updateOne(filter, updateDoc)
  const result = await Post.findByIdAndUpdate(
    id,
    { $inc: { upVote: 1 } },
    { new: true }
  );
  res.send(result);
  res.send(result);
});
router.patch("/post/downvote/:id", async (req, res) => {
  const id = req.params.id;
  //   const filter = {_id: new ObjectId(id)}
  //   const currentPost = await Post.findOne(filter);
  //   const currentDownVote = parseInt(currentPost.downVote)
  //   const updatedDownVote = currentDownVote + 1;
  //   const updateDoc = {
  //       $set:{
  //           downVote: updatedDownVote
  //       }
  //   }
  //   const result = await Post.updateOne(filter, updateDoc)

  const result = await Post.findByIdAndUpdate(
    id,
    { $inc: { downVote: 1 } },
    { new: true }
  );
  res.send(result);
  res.send(result);
});

module.exports = router;
