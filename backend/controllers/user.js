const User = require('../models/user');
const jwt = require('jsonwebtoken');

const privateKey = process.env.JWT_PRIVATEKEY;

// Sauvegarde un utilisateur sur la bdd
// hash à voir
// gestion des erreur !!
exports.createNewUser = (req, res) => {
  let newUser = new User(req.body);
  User.createUser(newUser, (err, user) => {
    console.log(err);
    
    if (err) {
      return res.status(401).send(err);//401?
    }
    res.json(user);
  });
};

// Vérifie si l'utilisateur loggé existe sur la bdd 
// erreur traité : mauvais email ou mdp, erreur syntaxe de connexion bdd
// manque: vérification si la requête contient bien un email ou un mdp
// a vérifier pas de réponse si les if ne sont pas valide (nécessaire?)
exports.loginUser = (req, res) => {
  let newUser = new User(req.body);
  User.login(newUser, (err, user) => {

    if (err) {
      res.status(404).send(err);
    }
   
    if (user != null) {
      if (user.length > 0) {
        return res.status(200).json({
          userId: user[0].id, //user[0].id permet de selectionner id dans un format RowDataPacket
          token: jwt.sign({ userId: user[0].id}, privateKey, { expiresIn: '24h'})
        });
      } 
      res.status(400).send("Email ou mot de passe incorrect");
    }
  });
};