const rateLimit = require("express-rate-limit");

/*Attribue une limite de requête*/
exports.LoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,// limites à 20 requêtes toutes les 15 minutes
    message: {
        status: 429,
        error: 'Trop de requêtes envoyées. Veuillez réessayer plus tard.'
       }
});
