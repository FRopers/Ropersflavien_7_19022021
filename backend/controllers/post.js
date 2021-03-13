const Post = require('../models/post');
const fs = require('fs');

// Recherche et envoie tous les posts
exports.listAllPosts = (req, res) => {
  Post.getAllPosts((error, result) => { 
    
    if (error) {
      res.status(400).json({ error });
    } 
    
    else {
      res.status(200).json(result);
    }
    
  });
};

// Recherche et envoie le post souhaité
exports.threadForOnePosts = (req, res) => {
  let postId = req.params.id;
  Post.getOnePost(postId, (error, result) => { 
    
    if (error) {
      res.status(404).json({ error });
    }  
    
    else {
      res.status(200).json(result);
    }   
  });
};

// Récupère les données concernant un post et les sauvegardes dans la bdd
exports.createNewPost = (req, res) => {
  const bodyparse = JSON.parse(req.body.data);
  let imageUrl = null;
  if (req.file !== undefined) {
    imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }

  let newPost = new Post({
    userId: bodyparse.userId,
    text: bodyparse.post,
    imageUrl: imageUrl,
  });
  
  Post.createPost(newPost, (error, result) => {
    if (error) {
      res.status(400).json({ error });
    }  
    
    else {
      res.status(201).json({ message: "Post créé"});
    }
  });
};

// Recherche et supprime le post avec ses commentaires ainsi que l'image utilisée
exports.deleteOnePostWithComments = (req, res) => {
  let postId = req.params.id;

  if (req.body.imageUrl !== null) {
    const filename = req.body.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, (err) => {
      if (err) throw err;
    });
  }

  Post.deleteOnePost(postId, (error, result) => { 
  
    if (error) {
      res.status(400).json({ error });
    } 
    
    else {
      res.status(200).json({ message: "Post supprimé"});
    }  
  });
};



