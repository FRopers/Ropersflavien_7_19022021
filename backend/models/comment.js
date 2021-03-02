const connection = require('../connection/database');

function Comment(req) {
    this.userId = req.userId;
    this.postId = req.postId; 
    this.comment = req.comment;
};

Comment.getAllCommentByPost = (postId, res) => {
    connection.query("SELECT comment.comment, comment.id_user FROM comment INNER JOIN post ON comment.id_post = post.id WHERE post.id = ?", [postId], (error, result) =>{

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

module.exports= Comment;