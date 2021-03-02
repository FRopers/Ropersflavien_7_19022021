const connection = require('../connection/database');

function User(req) {
    this.email = req.email; 
    this.password = req.password;
};

User.createUser = (newUser, res) => {
    connection.query("INSERT INTO user SET email= ?, password = ?", [newUser.email,newUser.password], (error, result) =>{

        if(error) {
            res(error, null);
        }
        res(null, result);
    })
};


User.login = (user, res) => {
    connection.query("SELECT * FROM user WHERE email= ? AND password= ?", [user.email, user.password], (error, result) =>{

        if(error) {           
            res(error, null);
        }

        res(null, result);
    })
};


module.exports= User;