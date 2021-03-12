const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const limiter = require('../component/express-rate-limit-config');
const passwordValidator = require('../middleware/password-validator');

router.post('/signup', passwordValidator, userCtrl.createNewUser);
router.post('/login', limiter.LoginLimiter, userCtrl.loginUser);
router.get('/user/:id', auth.basic, userCtrl.getUserSearchWithId);
router.get('/user', auth.admin, userCtrl.getUserSearchWithPseudo);
router.put('/avatar', auth.basic, multer, userCtrl.modifyAvatarImage);
router.delete('/user/:id', auth.admin, userCtrl.deleteOneUser);

module.exports = router;