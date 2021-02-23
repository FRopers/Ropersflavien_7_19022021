const connection = require('../connection/database');

const Post = (req) =>{
    this.title = req.tilte; 
    this.text = req.text;
};

Post.getAllPosts = (result) => {
    connection.query("Select * from posts", (err, res) => {

            if(err) {
                result(null, err);
            }
            else{
                result(null, res);
            }
        });   
};

module.exports= Post;