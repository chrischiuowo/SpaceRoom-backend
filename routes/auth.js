const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const { isAuth } = require('../middlewares/auth')

// 登入
router.post('/auth/signup', authController.signup)
// 註冊
router.post('/auth/login', authController.login)
// 登出
router.post('/auth/logout', authController.logout)
// 更新密碼
router.patch('/auth/reset_password', isAuth, authController.updatePassword)
// 驗證token
router.get('/auth/check', authController.checkToken)

module.exports = router
