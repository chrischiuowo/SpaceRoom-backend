const express = require('express');
const router = express.Router();
const { isAuth } = require('../controllers/auth.js');
const uploadController = require('../controllers/upload.js');
const checkUpload = uploadController.checkUpload;

// 上傳圖片
router.post('/', isAuth, checkUpload, uploadController.postImages);

module.exports = router;
