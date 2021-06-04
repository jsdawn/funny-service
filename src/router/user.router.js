const express = require('express');
const crypto = require('crypto');
const { User, UserToken } = require('../../db/models');

const router = express.Router();

// 注册
router.post('/signin', async (req, res) => {
  let { username, password, avatar, gender } = req.body;

  let user = await User.findOne({ where: { username } });
  if (user) {
    res.status(400).json({ status: 400, msg: '用户名已存在' });
    return;
  }

  let md5 = crypto.createHash('md5');
  let cryPassword = md5.update(password).digest('hex');
  user = await User.create({
    username,
    password: cryPassword,
    avatar,
    gender
  });
  res.json({ status: 200, data: { id: user.id } });
  return;
});

// 登录
router.post('/login', async (req, res) => {
  let { username, password } = req.body;
  let user = await User.findOne({ where: { username } });
  if (user === null) {
    res.status(400).json({ status: 400, msg: '用户名不存在' });
    return;
  }
  // 加密对比
  let md5 = crypto.createHash('md5');
  let cryPassword = md5.update(password).digest('hex');
  if (cryPassword !== user.password) {
    res.status(400).json({ status: 400, msg: '密码错误!' });
    return;
  }

  // TODO: 新增token凭证
  // let now = new Date();
  // let user_token = await UserToken.create({
  //   user_id: user.id,
  //   expiresAt: now
  // });

  res.json({ status: 200, data: { ...user, token: '' } });
});

// 用户信息
router.get('/info', async (req, res) => {
  let { id = 0 } = req.body;
  let user = await User.findOne({ where: { id } });
  if (user === null) {
    res.status(400).json({ status: 400, msg: '用户不存在' });
    return;
  }
  res.json({ status: 200, data: user });
});

// 修改用户信息
router.post('/update', async (req, res) => {
  let { id = 0, username, password, avatar, gender } = req.body;
  let user = await User.findOne({ where: { id } });
  if (user === null) {
    res.status(400).json({ status: 400, msg: '用户不存在' });
    return;
  }
  user = await user.update({
    username,
    password,
    avatar,
    gender
  });

  res.json({ status: 200, data: user });
});

router.get('/list', async (req, res) => {
  const { page, size = 5, search = {} } = req.body;
  let where = {};
  if (search.gender) {
    where.gender = search.gender;
  }

  const { count, rows } = await User.findAndCountAll({
    where,
    offset: page ? (page - 1) * size : 0,
    limit: size
  });

  res.json({
    status: 200,
    data: { list: rows, total: count }
  });
});

module.exports = router;
