// Follow Controller
const User = require('../models/User.js')
const successHandle = require('../service/successHandle')
const catchAsync = require('../service/catchAsync')
const appError = require('../service/appError')
const apiMessage = require('../service/apiMessage')

/*
  取得追蹤清單成功 GET
*/
const getFollowsList = catchAsync(async (req, res, next) => {
  const { target_user_id } = req.query

  if (!target_user_id) return next(appError(apiMessage.FIELD_FAILED, next))

  const data = await User.find({ _id: target_user_id })
    .populate({
      path: 'followings.user',
      select: 'name avatar createdAt'
    })
    .populate({
      path: 'followers.user',
      select: 'name avatar createdAt'
    })

  if (!data) return next(appError(apiMessage.DATA_NOT_FOUND, next))

  successHandle({
    res,
    message: '取得追蹤清單成功',
    data: {
      followings: data[0].followings,
      followers: data[0].followers,
      user: data
    }
  })
})

/*
  按讚貼文 與 取消讚貼文 PATCH
*/
const toggleFollows = catchAsync(async (req, res, next) => {
  const { target_user_id, follow_mode } = req.query
  const user_id = req.user_id
  const follow_toggle = follow_mode === 'follow'
  let data

  if (!target_user_id || !follow_mode) { return next(appError(apiMessage.FIELD_FAILED, next)) }

  // 追蹤
  if (follow_toggle) {
    data = await User.findOneAndUpdate(
      {
        _id: user_id,
        'followings.user': { $ne: target_user_id }
      },
      {
        $addToSet: {
          followings: { user: target_user_id }
        }
      },
      { new: true }
    )
    await User.findOneAndUpdate(
      {
        _id: target_user_id,
        'followers.user': { $ne: user_id }
      },
      {
        $addToSet: {
          followers: { user: user_id }
        }
      }
    )
  } else {
    data = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $pull: {
          followings: { user: target_user_id }
        }
      },
      { new: true }
    )
    await User.findOneAndUpdate(
      { _id: target_user_id },
      {
        $pull: {
          followers: { user: user_id }
        }
      }
    )
  }

  if (!data) return next(appError(apiMessage.DATA_NOT_FOUND, next))

  if (follow_toggle) {
    successHandle({
      res,
      message: '追蹤成功',
      data
    })
  } else {
    successHandle({
      res,
      message: '取消追蹤成功',
      data
    })
  }
})

module.exports = {
  getFollowsList,
  toggleFollows
}
