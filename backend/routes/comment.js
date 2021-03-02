const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.get('/:id', auth, commentsCtrl.listAllCommentsByPost);
router.post('/', auth, commentsCtrl.createNewComment);

module.exports = router;