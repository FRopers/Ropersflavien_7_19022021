const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/user');

router.post('/signup', multer, userCtrl.createNewUser);
router.post('/login', userCtrl.loginUser);
router.get('/user/:id', auth.basic, userCtrl.getUserSearchWithId);
router.get('/user', auth.admin, userCtrl.getUserSearchWithPseudo);
router.delete('/user/:id', auth.admin, userCtrl.deleteOneUser);

module.exports = router;