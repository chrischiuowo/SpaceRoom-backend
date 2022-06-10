// upload Controller
const path = require('path');
const { successHandle } = require('../service/resHandle');
const catchAsync = require('../service/catchAsync');
const appError = require('../service/appError');
const apiMessage = require('../service/apiMessage');
const multer = require('multer');
const { ImgurClient } = require('imgur');

/*
  上傳圖片 POST
*/
const postImages = catchAsync(async(req, res, next) => {
  if(!req.files.length) {
    return next(appError({
      message: '尚無上傳圖片！',
      statusCode: 500
    }, next));
  }
  const client = new ImgurClient({
    clientId: process.env.IMGUR_CLIENTID,
    clientSecret: process.env.IMGUR_CLIENT_SECRET,
    refreshToken: process.env.IMGUR_REFRESH_TOKEN,
  });
  const images = [];
  for await (const file of req.files) {
    const response = await client.upload({
      image: file.buffer.toString('base64'),
      type: 'base64',
      album: process.env.IMGUR_ALBUM_ID
    });
    images.push(response.data.link)
  }
  successHandle({
    res, 
    message: '上傳圖片成功！',
    data: {
      images: images
    }
  });
});

/*
  驗證上傳圖片 middleware
*/
const checkUpload = multer({
  limits: {
    fileSize: 2*1024*1024,
  },
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
      cb(new Error("檔案格式錯誤，僅限上傳 jpg、jpeg 與 png 格式。"));
    }
    cb(null, true);
  },
}).any();

module.exports = {
  checkUpload, postImages
}