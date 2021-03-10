const connection = require('../connection/database');

function Comment(req) {
    this.userId = req.userId;
    this.postId = req.postId; 
    this.comment = req.comment;
};

Comment.getAllCommentByPost = (postId, res) => {
    connection.query("SELECT comment.comment, comment.id, user.pseudo, user.avatar FROM comment, user, post WHERE comment.id_post = ? AND comment.id_user = user.id AND comment.id_post = post.id", [postId], (error, result) =>{

        if(error) {
            res(error, null);
        }
        res(null, result);
    });
};

Comment.createComment = (newComment, res) => {
    connection.query("INSERT INTO comment SET id_user= ?, id_post = ?, comment = ?", [newComment.userId,newComment.postId,newComment.comment], (error, result) =>{

        if(error) {
            res(error, null);
        }
        res(null, result);
    });   
};

Comment.deleteOneComment = (commentId, res) => {   
    connection.query("DELETE FROM comment WHERE id= ?", [commentId], (error, result) => {

        if(error) {
            res(error, null);
        }
        res(null, result);
    });
};

module.exports= Comment;