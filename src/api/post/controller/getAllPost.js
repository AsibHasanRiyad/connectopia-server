const Post = require("../../../model/Post");

const getAllPost = async (req, res) => {
    const tag = req.query.tag;
    const email = req.query.email;
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    console.log('hello',page, size, email);
  
    if (tag) {
      const query = { tags: tag };
      const result = await Post
        .find(query)
        .skip(page * size)
        .sort({ postedTime: -1 })
        .limit(size)
  
      res.send(result);
    } else {
      const query = email ? { email: email } : {};
      const result = await Post
        .find(query)
        .sort({ postedTime: -1 })
        .skip(page * size)
        .limit(size)
  
      res.send(result);
    }
  }


  module.exports = getAllPost