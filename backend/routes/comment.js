const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.get('/:id', auth.basic, commentsCtrl.listAllCommentsByPost);
router.post('/', auth.basic, commentsCtrl.createNewComment);
router.delete('/:id', auth.admin, commentsCtrl.deleteOneCommentInPost);

module.exports = router;