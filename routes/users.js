const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const { isAuth } = require('../middlewares/auth')

router.get('/random_users', isAuth, userController.getRandomUsers)

router.get('/users', isAuth, userController.getUsers)

router.get('/user/:user_id', isAuth, userController.getUserInfo)

router.patch(
  '/user/:user_id',
  isAuth,
  userController.updateUserInfo
)

router.delete('/user/:user_id', isAuth, userController.deleteUserInfo)

module.exports = router
