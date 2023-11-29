const Post = require("../../../model/Post");

const getAllPost = async (req, res) => {
    const tag = req.query.tag;
    const email = req.query.email;
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
  
    if (tag) {
      const query = { tags: tag };
      const result = await Post
        .find(query)
        .skip(page * size)
        .sort({ postedTime: -1 })
        .limit(size)
      //   .toArray();
  
      res.send(result);
    } else {
      const query = email ? { email: email } : {};
      const result = await Post
        .find(query)
        .sort({ postedTime: -1 })
        .skip(page * size)
        .limit(size)
      //   .toArray();
  
      res.send(result);
    }
  }


  module.exports = getAllPost