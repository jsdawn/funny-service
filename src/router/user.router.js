const express = require('express');
const crypto = require('crypto');
const { User } = require('../../db/models');

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

  let md5 = crypto.createHash('md5');
  let cryPassword = md5.update(password).digest('hex');

  if (cryPassword !== user.password) {
    res.status(400).json({ status: 400, msg: '密码错误!' });
    return;
  }
  res.json({ status: 200, data: user });
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

router.post('/update', async (req, res) => {
  let { id = 0, username, password, gender } = req.body;

  let user;
  // 无id 新建
  if (!id) {
    user = await User.create({
      username,
      password,
      gender
    });
  }
  // 有id
  else {
    user = await User.findOne({ where: { id: id } });
    if (user === null) {
      res.status(400).json({ status: 400, msg: '未找到相关数据' });
      return;
    }
    user = await user.update({
      username,
      password,
      gender
    });
  }

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
