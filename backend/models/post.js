const connection = require('../connection/database');

function Post(req) {
    this.userId = req.userId;
    this.title = req.title; 
    this.text = req.text;
    this.imageUrl = req.imageUrl;
};

Post.getAllPosts = (res) => {
    connection.query("Select * from post", (error, result) => {

        if(error) {
            res(error, null); //null utile lors de l'appelle de la fonction dans le controller exemple ligne:4 Post.getAllPosts((error, result) => { , result devient null avec cette ligne. 
                            //erreur sur le tuto?
        }
        res(null, result);
    });
};

Post.getOnePost = (postId, res) => {
    connection.query("Select * FROM post WHERE id= ?", [postId], (error, result) => {

        if(error) {
            res(error, null);
        }
        res(null, result);
    });
};

Post.createPost = (newPost, res) => {
    connection.query("INSERT INTO post SET id_user= ?, title = ?, text = ?, url_image = ?", [newPost.userId, newPost.title, newPost.text, newPost.imageUrl], (error, result) =>{

        if(error) {
            res(error, null);
        }
        res(null, result);

    });   
};

Post.deleteOnePost = (postId, res) => {   
    connection.query("DELETE FROM post WHERE id= ?", [postId], (error, result) => {

        if(error) {
            res(error, null);
        }
        res(null, result);
    });
};

module.exports= Post;