const connection = require('../connection/database');

function User(req) {
    this.email = req.email; 
    this.password = req.password;
};

/*Sauvegarde un utilisateur sur la bdd */
// hash à voir
User.createUser = (req, res) => {
    connection.query("INSERT INTO user SET email= ?, password = ?", [req.email,req.password], (err, user) =>{

        if(err) {
            res(err, null);
        }
        res(null, user);
    })
};

/*Vérifie si l'utilisateur loggé existe*/
User.login = (req, res) => {
    connection.query("SELECT * FROM user WHERE email= ?", [req.email], (err, user) =>{

        if(err) {
            res(err, null);
        }
        res(null, user);
    })
}


module.exports= User;