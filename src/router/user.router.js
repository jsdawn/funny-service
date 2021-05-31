const express = require('express');
const { User } = require('../../db/models');

const router = express.Router();

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
      res.status(400).json({
        status: 400,
        msg: '未找到相关数据'
      });
      return;
    }
    user = await user.update({
      username,
      password,
      gender
    });
  }

  res.json({
    status: 200,
    data: user
  });
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
