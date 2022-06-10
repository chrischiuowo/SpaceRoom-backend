// Like Controller
const Post = require('../models/Post');
const User = require('../models/User.js');
const { successHandle } = require('../service/resHandle');
const catchAsync = require('../service/catchAsync');
const appError = require('../service/appError');
const apiMessage = require('../service/apiMessage');

/*
  取得按讚貼文數量 GET
*/
const getPostLikes = catchAsync(async(req, res, next) => {
  const { postId } = req.query;

  if(!postId) {
    return next(appError(apiMessage.FIELD_FAIL, next));
  }

  const data = await Post.findById(postId).select('_id likes');

  if(!data) {
    return next(appError(apiMessage.DATA_NOT_FIND, next));
  }

  successHandle({
    res, 
    message: '取得按讚貼文數量成功',
    data: {
      likeLength: data.likes.length,
      nowPost: data
    }
  });
});

/*
  按讚貼文 與 取消讚貼文 POST
*/
const togglePostLikes = catchAsync(async(req, res, next) => {
  const { postId, likeMode } = req.query;
  let likeToggle = likeMode === 'add' ? true : false;
  let data;

  if(!postId || !likeMode) {
    return next(appError(apiMessage.FIELD_FAIL, next));
  }

  if(likeToggle) {
    data = await Post.findOneAndUpdate(
      { _id: postId },
      { 
        $addToSet: { 
          likes: req.user.id 
        }
      },
      { new: true }
    );
  }
  else {
    data = await Post.findOneAndUpdate(
      { _id: postId },
      { 
        $pull: { 
          likes: req.user.id 
        }
      },
      { new: true }
    );
  }

  if(!data) {
    return next(appError(apiMessage.DATA_NOT_FIND, next));
  }

  if(likeToggle) {
    successHandle({
      res, message: '已成功按讚', data
    });
  }
  else {
    successHandle({
      res, message: '已取消按讚', data
    });
  }
});

module.exports = {
  getPostLikes, togglePostLikes
};