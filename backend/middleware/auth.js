const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const privateKey = process.env.JWT_PRIVATEKEY;


// Vérifie si le token utilisé correspond à un utilisateur
exports.basic = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedtoken = jwt.verify(token, privateKey);
        const userId = decodedtoken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            res.status(401).json({ error:'Utilisateur non autorisé' });
        } else {
            next();
        }

    } catch(error) {
        res.status(400).json({ error: error | 'Requête non authentifiée !'});
    }
};

// Vérifie si le token utilisé correspond à un utilisateur avec des données formdata
exports.formdata = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedtoken = jwt.verify(token, privateKey);
        const userId = decodedtoken.userId;
        const bodyparse = JSON.parse(req.body.data)
        if (bodyparse.userId !== userId) {
            res.status(401).json({ error:'Utilisateur non autorisé' });
        } else {
            next();
        }

    } catch(error) {
        res.status(400).json({ error: error | 'Requête non authentifiée !'});
    }
};

// Vérifie si le token utilisé correspond à un compte admin
exports.admin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedtoken = jwt.verify(token, privateKey);
        const userId = decodedtoken.userId;

        if (req.body.userId && req.body.userId !== userId) {
            res.status(401).json({ error:'Utilisateur non autorisé' });
        }

        User.getUserWithId(userId, (error, result) => { 
            if (error) {
            res.status(400).json({ error });
            } 

            if (result[0].privilege !== "ADMIN") {
                res.status(401).json({ error: 'Droit administrateur requis' });
            } else {
                next();
            }        
        }); 

    } catch (error) {
        res.status(400).json({ error: error | 'Requête non authentifiée !'});
    }
};