const Post = require('../models/post');

// Recherche et envoie tous les posts
// voir gestion d'erreur
exports.listAllPosts = (req, res) => {
  Post.getAllPosts((error, result) => { 
    
    if (error) {
      res.send(error);
    }       
    res.json(result);
  });
};

// Recherche et envoie le post souhaité
// voir gestion d'erreur
exports.threadForOnePosts = (req, res) => {
  let postId = req.params.id;
  Post.getOnePost(postId, (error, result) => { 
    
    if (error) {
      res.send(error);
    }       
    res.json(result);
  });
};

// Récupère les données concernant un post et les sauvegardes dans la bdd
// voir gestion d'erreur
exports.createNewPost = (req, res) => {
  const bodyParse = JSON.parse(req.body.post);

  let newPost = new Post({
    userId: bodyParse.userId,
    title: bodyParse.title, 
    text: bodyParse.text,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  
  Post.createPost(newPost, (error, result) => {
    if (error) {
      res.send(error);
    }       
    res.json(result);
  });
};


