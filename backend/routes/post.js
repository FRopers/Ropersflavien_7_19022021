const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/post');

router.get('/', postsCtrl.listAllPosts);
router.post('/', postsCtrl.createNewPost);

module.exports = router;