
const apiMessage = {
  FAIL: {
    message: '失敗',
    statusCode: 400,
  },
  SUCCESS: {
    message: '成功',
    statusCode: 200,
  },
  FIELD_FAIL: {
    message: '資料欄位有誤或缺少欄位',
    statusCode: 400,
  },
  DATA_NOT_FIND: {
    message: '請確認ＩＤ是否存在，找不到對應的ＩＤ 和 資料',
    statusCode: 400,
  },
  LOGIN_FAILED: {
    message: '登入失敗',
    statusCode: 400,
  },
  PERMISSION_DENIED: {
    message: '權限不足',
    statusCode: 403,
  },
  ROUTER_NOT_FOUND: {
    message: '找不到路由',
    statusCode: 404,
  },
  INTERNAL_SERVER_ERROR: {
    message: '發生錯誤，請稍後再試',
    statusCode: 500,
  }
};

module.exports = apiMessage;