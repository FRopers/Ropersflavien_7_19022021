const connection = require('../connection/database');

function User(req) {
    this.email = req.email; 
    this.password = req.password;
    this.pseudo = req.pseudo;
    this.avatar = req.avatar;
    this.privilege = req.privilege;
};

User.createUser = (newUser, res) => {
    connection.query("INSERT INTO user SET email= ?, password = ?, pseudo= ?, avatar= ?, privilege = ?", [newUser.email,newUser.password, newUser.pseudo, newUser.avatar, newUser.privilege], (error, result) =>{

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

User.getUser = (userPseudo, res) => {
    connection.query("SELECT * FROM user WHERE pseudo= ?", [userPseudo], (error, result) =>{

        if(error) {           
            res(error, null);
        }

        res(null, result);
    })
};

User.getUserPrivilege = (userId, res) => {
    connection.query("SELECT user.privilege FROM user WHERE id= ?", [userId], (error, result) =>{

        if(error) {           
            res(error, null);
        }

        res(null, result);
    })
};

User.deleteUser = (userId, res) => {
    connection.query("DELETE FROM user WHERE id= ?", [userId], (error, result) =>{

        if(error) {           
            res(error, null);
        }

        res(null, result);
    })
};


module.exports= User;