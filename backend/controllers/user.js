const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = process.env.JWT_PRIVATEKEY;

// Sauvegarde un utilisateur sur la bdd
exports.createNewUser = (req, res) => { 
  function checkEmail(email) {
      var params = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return params.test(email);
  };

  //verifie si l'email est au bon format
  if (checkEmail(req.body.email) === false) {
    res.status(400).json({ error: "Format de l'email non valide"});
  }

  else {
    bcrypt.hash(req.body.password, 10)//hash le password
    .then(hash => { 
      let newUser = new User({
        email: req.body.email,
        password: hash,
        pseudo: req.body.pseudo,
        avatar: `${req.protocol}://${req.get('host')}/images/default-user-image.png`,
        privilege: "user"
      });
    
      User.createUser(newUser, (error, result) => {
        if (error) {
          if (error.sqlMessage.indexOf("Duplicata") > -1) { //Vérifie si le message d'erreur concerne un duplicata  
            if (error.sqlMessage.indexOf("user.pseudo") > -1) { //vérifie si un pseudo à déjà utilisé
              res.status(400).json({ error: "Pseudo déjà utilisé"})
            }

            if (error.sqlMessage.indexOf("user.email") > -1) { // vérifie si un email à déjà été utilisé
              res.status(400).json({ error: "Email déjà utilisé"})
            }
          }

          else {
            res.status(400).json({ error });
          }        
        } 
    
        else {
          res.status(201).json({ message: "Utilisateur créé" });
        }      
      });
    })

    .catch(error => res.status(400).json({ error }));
  };
}


// Vérifie si l'utilisateur loggé existe sur la bdd 
exports.loginUser = (req, res) => {
  let userEmail = req.body.email;
  User.login(userEmail, (error, result) => {
    if (error) {
      res.status(404).json({ error });
    } 

    else if (result.length == 0) { // permet d'avertir que l'email utilisé n'existe pas
      res.status(401).json({ error: "Email ou mot de passe incorrect"});
    } 

    else {
      bcrypt.compare(req.body.password, result[0].password) // Vérifie si le password hashé dans la bdd est identique au password envoyé
      .then(valid => {
          if (!valid) {
            res.status(401).json({ error: "Email ou mot de passe incorrect"});
          }

          else {
            res.status(200).json({
              userId: result[0].id, 
              token: jwt.sign({ userId: result[0].id}, privateKey, { expiresIn: '24h'}), //user[0].id permet de selectionner id dans un format RowDataPacket
              privilege: result[0].privilege
            })
          }
      })
      .catch(error => res.status(500).json({ error }));
    }
  });
};

// Recherche et envoie un utilisateur
// voir gestion d'erreur
exports.getUserSearchWithId = (req, res) => {
  let userId = req.params.id;
  User.getUserWithId(userId, (error, result) => { 
    
    if (error) {
      res.status(400).json({ error });
    } 
    
    else {
      res.status(200).json(result);
    }   
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

    else {
      res.status(200).json(result);
    }        
  });
};

exports.modifyAvatarImage = (req, res) => {
  const userId = JSON.parse(req.body.userId);
  const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  User.modifyAvatar(userId, image, (error, result) => { 
    
    if (error) {
      res.status(400).send(error);
    }

    else {
        const oldImage = JSON.parse(req.body.oldImage);
        const filename = oldImage.split('/images/')[1];
        fs.unlink(`images/${filename}`, (err) => {
          if (err) throw err;
        });
        res.status(200).json(result);
    }        
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
    
    else {
      res.status(200).json(result);
    }  
  });
};