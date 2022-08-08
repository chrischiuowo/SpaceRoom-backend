const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const { isAuth } = require('../middlewares/auth')

// 取得目前使用者資訊
router.get('/users/:user_id', isAuth, userController.getUserInfo)

// 更新目前使用者資訊
router.patch(
  '/users/:user_id',
  isAuth,
  userController.updateUserInfo
)

// 更新密碼
router.patch('/users/reset_password', isAuth, userController.updatePassword)

module.exports = router
