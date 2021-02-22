const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/comments');

router.get('/', commentsCtrl.listAllComment);

module.exports = router;