const connection = require('../connection/database');

const Comments = (req) =>{
    this.title = req.tilte; 
    this.comments = req.comments;
};

Comments.getAllComments = (result) => {
    connection.query("Select * from comments", (err, res) => {

            if(err) {
                console.log(err);
                result(null, err);
            }
            else{
                console.log(res);  
                result(null, res);
            }
        });   
};

module.exports= Comments;