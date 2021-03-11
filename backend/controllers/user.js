const User = require('../models/user');
const jwt = require('jsonwebtoken');

const privateKey = process.env.JWT_PRIVATEKEY;

// Sauvegarde un utilisateur sur la bdd
// hash à voir
// gestion des erreur !!
exports.createNewUser = (req, res) => {
  const bodyParse = JSON.parse(req.body.user);
  let imageUrl = `${req.protocol}://${req.get('host')}/images/default-user-image.png`;
  if (req.file !== undefined) {
    imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }

  let newUser = new User({
    email: bodyParse.email,
    password: bodyParse.password,
    pseudo: bodyParse.pseudo,
    avatar: imageUrl,
    privilege: "user"
  });

  User.createUser(newUser, (error, result) => {
    
    if (error) {
      return res.status(400).send(error);
    }
    res.status(201).json(result);
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
        return res.status(200).json({
          userId: result[0].id, //user[0].id permet de selectionner id dans un format RowDataPacket
          token: jwt.sign({ userId: result[0].id}, privateKey, { expiresIn: '24h'}),
          privilege: result[0].privilege
        });
      } 
      res.status(400).send("Email ou mot de passe incorrect");
    }
    res.status(200).send("Connexion réussie");
  });
};

// Recherche et envoie un utilisateur
// voir gestion d'erreur
exports.getUserSearchWithId = (req, res) => {
  let userId = req.params.id;
  User.getUserWithId(userId, (error, result) => { 
    
    if (error) {
      res.status(400).send(error);
    }       
    res.status(200).json(result);
  });
};

// Recherche et envoie un utilisateur
// voir gestion d'erreur
exports.getUserSearchWithPseudo = (req, res) => {
  let userPseudo = req.query.pseudo;
  User.getUserWithPseudo(userPseudo, (error, result) => { 
    
    if (error) {
      res.status(400).send(error);
    }       
    res.status(200).json(result);
  });
};

// Recherche et supprime un utilisateur
// voir gestion d'erreur
exports.deleteOneUser = (req, res) => {
  let userId = req.params.id;
  User.deleteUser(userId, (error, result) => { 
    
    if (error) {
      res.status(400).send(error);
    }       
    res.status(200).json(result);
  });
};