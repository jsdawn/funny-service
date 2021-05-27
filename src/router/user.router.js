const express = require('express');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/create', async (req, res) => {
  let { id = 0, username, password, gender } = req.body;
  let user = await User.findOne({ where: { id: id } });
  if (user === null) {
    user = await User.create({
      username,
      password,
      gender
    });
  } else {
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
  const users = await User.findAll();
  res.json({
    status: 200,
    data: users
  });
});

module.exports = router;
