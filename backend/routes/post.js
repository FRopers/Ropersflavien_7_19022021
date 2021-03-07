const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postsCtrl = require('../controllers/post');

router.get('/', auth, postsCtrl.listAllPosts);
router.get('/:id', auth, postsCtrl.threadForOnePosts);
router.post('/', auth, multer, postsCtrl.createNewPost);
router.delete('/:id', auth, postsCtrl.deleteOnePostWithComments);

module.exports = router;