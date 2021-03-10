const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postsCtrl = require('../controllers/post');

router.get('/', auth.basic, postsCtrl.listAllPosts);
router.get('/:id', auth.basic, postsCtrl.threadForOnePosts);
router.post('/', auth.basic, multer, postsCtrl.createNewPost);
router.delete('/:id', auth.admin, postsCtrl.deleteOnePostWithComments);

module.exports = router;