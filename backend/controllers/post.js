const Post = require('../models/post');

exports.listAllPosts = (req, res) => {
    Post.getAllPosts((err, posts) => { 
      if (err)
        res.send(err);
        
      res.send(posts);
    });
};
