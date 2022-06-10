// Post Controller
const Post = require('../models/Post');
const User = require('../models/User');
const { successHandle } = require('../service/resHandle');
const catchAsync = require('../service/catchAsync');
const appError = require('../service/appError');
const apiMessage = require('../service/apiMessage');

/*
  取得所有貼文 GET
*/
const getAllData = catchAsync(async(req, res, next) => {
  // q => 搜尋項目
  // s => 資料排序
  const { q, s } = req.query
  const query = q ? { 'content': new RegExp(q) } : {};
  const sort = s === 'hot' ? { likes: -1 } : s === 'new' ? 'createdAt' : '-createdAt';
  const data = await Post.find(query).populate({
    path: 'user',
    select: 'name image'
  }).sort(sort);
  successHandle({
    res, message: '取得貼文成功', data
  });
});

/*
  上傳單一貼文 POST
*/
const postData = catchAsync(async(req, res, next) => {
  const { content, images, likes } = req.body;
  const user = req.user;

  if(!content || !user._id) {
    return next(appError(apiMessage.FIELD_FAIL, next));
  }

  const data = await Post.create({
    user: user._id, 
    content, 
    images, 
    likes
  });

  successHandle({
    res, message: '上傳貼文成功', data
  });
});

/*
  更新單一貼文 PATCH
*/
const updateData = catchAsync(async(req, res, next) => {
  const { postId } = req.params;
  const { content, images } = req.body;
  const user = req.user;

  if(!postId || !content || !user._id) {
    return next(appError(apiMessage.FIELD_FAIL, next));
  }

  const post = await Post.findById(postId);

  if(post) {
    const nowPatch = {};
    if(images) nowPatch.images = images;
    if(content) nowPatch.content = content;
    const data = await Post.findByIdAndUpdate(postId, nowPatch, { new: true });
    successHandle({
      res, message: '更新貼文成功', data
    });
  }
  else {
    return next(appError(apiMessage.DATA_NOT_FIND, next));
  }
});

/*
  刪除單一貼文 DELETE
*/
const deleteData = catchAsync(async(req, res, next) => {
  const { postId } = req.params;
  const user = req.user;
  
  if(!postId || !user._id) {
    return next(appError(apiMessage.FIELD_FAIL, next));
  }

  const post = await Post.findById(postId);

  if(post) {
    const data = await Post.findByIdAndDelete(postId);
    successHandle({
      res, message: '刪除單一貼文成功', data
    });
  }
  else {
    return next(appError(apiMessage.DATA_NOT_FIND, next));
  }
});

/*
  刪除所有貼文 DELETE
*/
const deleteAllData = catchAsync(async(req, res, next) => {
  await Post.deleteMany({});
  const data = await Post.find();
  successHandle({
    res, message: '刪除所有貼文成功', data
  });
});


module.exports = {
  getAllData, postData, updateData, deleteData, deleteAllData
};