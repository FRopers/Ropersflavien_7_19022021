const Post = require('../models/post');
const fs = require('fs');

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
  let imageUrl = null;
  if (req.file !== undefined) {
    imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }

  let newPost = new Post({
    userId: bodyParse.userId,
    text: bodyParse.text,
    imageUrl: imageUrl,
  });
  
  Post.createPost(newPost, (error, result) => {
    if (error) {
      res.send(error);
    }       
    res.json(result);
  });
};

// Recherche et supprime le post avec ses commentaires ainsi que l'image utilisée
// voir gestion d'erreur
exports.deleteOnePostWithComments = (req, res) => {
  let postId = req.params.id;
  Post.deleteOnePost(postId, (error, result) => { 
  
    if (error) {
      res.send(error);
    }       
    res.json(result);
  });

  if (req.body.imageUrl !== null) {
    const filename = req.body.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, (err) => {
      if (err) throw err;
    });
  }
};



