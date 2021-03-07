const Comment = require('../models/comment');

// Recherche les commentaires en fonction du post
// voir gestion d'erreur
exports.listAllCommentsByPost = (req, res) => {
    let postId = req.params.id;
    Comment.getAllCommentByPost (postId, (error, result) => { 
      
      if (error) {
        res.send(error);
      }       
      res.json(result);
    });
  };

// Récupère les données concernant un commentaire et les sauvegardes dans la bdd
// voir gestion d'erreur
exports.createNewComment = (req, res) => {
    let newComment = new Comment(req.body);
    Comment.createComment(newComment, (error, result) => {
      
      if (error) {
        res.send(error);
      }       
      res.json(result);
    });
};

// Recherche et supprime le commentaire
// voir gestion d'erreur
exports.deleteOneCommentInPost = (req, res) => {
  let commentId = req.params.id;
  Comment.deleteOneComment(commentId, (error, result) => { 
  
    if (error) {
      res.send(error);
    }       
    res.json(result);
  });
};
  