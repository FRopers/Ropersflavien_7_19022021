const Post = require('../models/post');

exports.listAllPosts = (req, res) => {
    Post.getAllPosts((err, posts) => { 
      
      if (err) {
        res.send(err);
      }       
      res.send(posts);
    });
};

exports.createNewPost = function(req, res) {
  let newPost = new Post(req.body);
  /*voir gestion des erreurs https://www.codementor.io/@julieisip/learn-rest-api-using-express-js-and-mysql-db-ldflyx8g2*/
  Post.createPost(newPost, (err, post) => {
    
    if (err) {
      res.send(err);
    }       
    res.json(post);
  });
};

