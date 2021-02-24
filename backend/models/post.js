const connection = require('../connection/database');

function Post(req) {
    this.userId = req.userId;
    this.title = req.title; 
    this.text = req.text;
};

/*Recherche et envoie tous les posts*/
Post.getAllPosts = (res) => {
    connection.query("Select * from post", (err, posts) => {

        if(err) {
            res(err, null); //null utile lors de l'appelle de la fonction dans le controller exemple ligne:4 Post.getAllPosts((err, posts) => { , posts devient null avec cette ligne. 
                            //erreur sur le tuto?
        }
        res(null, posts);
    });
};

/*Récupère les données envoyées et les sauvegarde dans la bdd */
Post.createPost = (req, res) => {
    connection.query("INSERT INTO post SET id_user= ?, title = ?, text = ?", [req.userId,req.title,req.text], (err, post) =>{

        if(err) {
            res(err, null);
        }
        res(null, post);

    });   
};

module.exports= Post;