const Comment = require('../models/comment');

// Recherche les commentaires en fonction du post
exports.listAllCommentsByPost = (req, res) => {
    let postId = req.params.id;
    Comment.getAllCommentByPost (postId, (error, result) => { 
      
      if (error) {
        res.status(400).json({ error });
      }
      
      else {
        res.status(200).json(result);
      }
    });
  };

// Récupère les données concernant un commentaire et les sauvegardes dans la bdd
exports.createNewComment = (req, res) => {
    let newComment = new Comment(req.body);
    Comment.createComment(newComment, (error, result) => {
      
      if (error) {
        res.status(400).json({ error });
      }    
      
      else {
        res.status(201).json({ message: "Commentaire créé"});
      }
    });
};

// Recherche et supprime le commentaire
exports.deleteOneCommentInPost = (req, res) => {
  let commentId = req.params.id;
  Comment.deleteOneComment(commentId, (error, result) => { 
  
    if (error) {
      res.status(400).json({ error });
    } 
    
    else {
      res.status(200).json({ message: "Commentaire supprimé"});
    }
  });
};
  