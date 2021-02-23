const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/post');

router.get('/', postsCtrl.listAllPosts);

module.exports = router;