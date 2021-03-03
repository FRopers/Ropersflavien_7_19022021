const connection = require('../connection/database');

function User(req) {
    this.email = req.email; 
    this.password = req.password;
    this.pseudo = req.pseudo;
};

User.createUser = (newUser, res) => {
    connection.query("INSERT INTO user SET email= ?, password = ?, pseudo= ?", [newUser.email,newUser.password, newUser.pseudo], (error, result) =>{

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