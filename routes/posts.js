const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const { isAuth } = require('../controllers/auth.js');

// 取得所有貼文
router.get('/', isAuth, postController.getAllData);

// 上傳單一貼文
router.post('/', isAuth, postController.postData);

// 更新單一貼文
router.patch('/:postId', isAuth, postController.updateData);

// 刪除單一貼文
router.delete('/:postId', isAuth, postController.deleteData);

// 刪除所有貼文
router.delete('/', isAuth, postController.deleteAllData);

module.exports = router;
