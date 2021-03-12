const connection = require('../connection/database');

function Post(req) {
    this.userId = req.userId;
    this.text = req.text;
    this.imageUrl = req.imageUrl;
};

Post.getAllPosts = (res) => {
    connection.query("SELECT post.text, post.url_image, post.id, user.pseudo, user.avatar FROM post, user WHERE post.id AND post.id_user = user.id", (error, result) => {

        if(error) {
            res(error, null); //null utile lors de l'appelle de la fonction dans le controller exemple ligne:4 Post.getAllPosts((error, result) => { , result devient null avec cette ligne. 
        }
        
        else {
            res(null, result);
        }
    });
};

Post.getOnePost = (postId, res) => {
    connection.query("SELECT post.text, post.url_image, post.id, user.pseudo, user.avatar FROM post, user WHERE post.id = ? AND post.id_user = user.id", [postId], (error, result) => {

        if(error) {
            res(error, null);
        }

        else {
            res(null, result);
        }
    });
};

Post.createPost = (newPost, res) => {
    connection.query("INSERT INTO post SET id_user= ?, text = ?, url_image = ?", [newPost.userId, newPost.text, newPost.imageUrl], (error, result) =>{

        if(error) {
            res(error, null);
        }

        else {
            res(null, result);
        }
    });   
};

Post.deleteOnePost = (postId, res) => {   
    connection.query("DELETE FROM post WHERE id= ?", [postId], (error, result) => {

        if(error) {
            res(error, null);
        }

        else {
            res(null, result);
        }
    });
};

module.exports= Post;