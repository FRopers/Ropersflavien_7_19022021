const Comments = require('../models/comments');

exports.listAllComment = (req, res) => {
    Comments.getAllComments((err, comments) => { 
      if (err)
        res.send(err);
        
      res.send(comments);
    });
};
