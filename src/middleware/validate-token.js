const moment = require('moment');
const { UserToken } = require('../../db/models');

const WhiteList = ['/signin', '/login'];
// 验证token 中间件
async function validate_token(req, res, next) {
  if (WhiteList.indexOf(req.path) > -1) {
    next();
    return;
  }

  let token = req.headers['user-token'];
  if (!token || token.length === 0) {
    res.status(400).json({
      message: 'error: 缺少 token.'
    });
    return;
  }

  const userToken = await UserToken.findOne({ where: { token: token } });
  if (userToken === null) {
    res.status(400).json({
      message: 'error: token 校验失败'
    });
    return;
  }

  const now = moment(new Date()).add(8, 'h');
  if (moment(userToken.expiresAt).isBefore(now)) {
    res.status(400).json({
      message: 'error: token 已过期'
    });
    return;
  }

  req.validUserId = userToken.user_id;

  next();
}

module.exports = validate_token;
