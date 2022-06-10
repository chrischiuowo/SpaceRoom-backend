const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like.js');
const { isAuth } = require('../controllers/auth.js');

// 取得按讚貼文數量
router.get('/', isAuth, likeController.getPostLikes);

// 按讚貼文 與 取消讚貼文
router.post('/', isAuth, likeController.togglePostLikes);

module.exports = router;