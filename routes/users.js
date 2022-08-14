const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const { isAuth } = require('../middlewares/auth')

// 隨機搜尋使用者
router.get('/random_users', isAuth, userController.getRandomUsers)

// 搜尋使用者
router.get('/users', isAuth, userController.getUsers)

// 取得目前使用者資訊
router.get('/user/:user_id', isAuth, userController.getUserInfo)

// 更新目前使用者資訊
router.patch(
  '/user/:user_id',
  isAuth,
  userController.updateUserInfo
)

// 刪除目前使用者
router.delete('/user/:user_id', isAuth, userController.deleteUserInfo)

module.exports = router
