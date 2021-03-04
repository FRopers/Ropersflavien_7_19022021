const User = require('../models/user');
const jwt = require('jsonwebtoken');

const privateKey = process.env.JWT_PRIVATEKEY;

// Sauvegarde un utilisateur sur la bdd
// hash à voir
// gestion des erreur !!
exports.createNewUser = (req, res) => {
  let newUser = new User(req.body);
  User.createUser(newUser, (error, result) => {
    
    if (error) {
      return res.status(401).send(error);//401?
    }
    res.json(result);
  });
};

// Vérifie si l'utilisateur loggé existe sur la bdd 
// erreur traité : mauvais email ou mdp, erreur syntaxe de connexion bdd
// manque: vérification si la requête contient bien un email ou un mdp
// a vérifier pas de réponse si les if ne sont pas valide (nécessaire?)
exports.loginUser = (req, res) => {
  let user = new User(req.body);
  User.login(user, (error, result) => {

    if (error) {
      res.status(404).send(error);
    }
   
    if (result != null) {
      if (result.length > 0) {
        console.log(result);
        return res.status(200).json({
          userId: result[0].id, //user[0].id permet de selectionner id dans un format RowDataPacket
          token: jwt.sign({ userId: result[0].id}, privateKey, { expiresIn: '24h'}),
          privilege: result[0].privilege
        });
      } 
      res.status(400).send("Email ou mot de passe incorrect");
    }
  });
};