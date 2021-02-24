const User = require('../models/user');

exports.createNewUser = (req, res) => {
    let newUser = new User(req.body);
    /*voir gestion des erreurs https://www.codementor.io/@julieisip/learn-rest-api-using-express-js-and-mysql-db-ldflyx8g2*/
    User.createUser(newUser, (err, user) => {
      
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
};

exports.loginUser = (req, res) => {
  let newUser = new User(req.body);
  /*voir gestion des erreurs https://www.codementor.io/@julieisip/learn-rest-api-using-express-js-and-mysql-db-ldflyx8g2*/
  User.login(newUser, (err, user) => {
    
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};