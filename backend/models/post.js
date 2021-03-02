const connection = require('../connection/database');

function Post(req) {
    this.userId = req.userId;
    this.title = req.title; 
    this.text = req.text;
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
    connection.query("INSERT INTO post SET id_user= ?, title = ?, text = ?", [newPost.userId,newPost.title,newPost.text], (error, result) =>{

        if(error) {
            res(error, null);
        }
        res(null, result);

    });   
};

module.exports= Post;