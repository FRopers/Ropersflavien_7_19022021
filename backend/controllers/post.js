const Post = require('../models/post');

// Recherche et envoie tous les posts
// voir gestion d'erreur
exports.listAllPosts = (req, res) => {
  Post.getAllPosts((err, posts) => { 
    
    if (err) {
      res.send(err);
    }       
    res.send(posts);
  });
};

// Récupère les données envoyées et les sauvegarde dans la bdd
// voir gestion d'erreur
exports.createNewPost = function(req, res) {
  let newPost = new Post(req.body);
  Post.createPost(newPost, (err, post) => {
    
    if (err) {
      res.send(err);
    }       
    res.json(post);
  });
};

