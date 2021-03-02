const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/post');
const auth = require('../middleware/auth');

router.get('/', auth, postsCtrl.listAllPosts);
router.get('/:id', auth, postsCtrl.threadForOnePosts);
router.post('/', auth, postsCtrl.createNewPost);

module.exports = router;