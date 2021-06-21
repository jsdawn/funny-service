const express = require('express');
const { Op } = require('sequelize');
const {
  Test,
  TestQuestion,
  TestQuestionOption,
  TestUserAnswer
} = require('../../db/models');

const router = express.Router();

// demo
router.get('/demo', async (_req, res) => {
  res.json({
    status: 200,
    data: { msg: 'demo api' }
  });
});

// 修改测评
router.post('/update', async (req, res) => {
  let { id = 0, title, type, brief, image, intro, tested_count } = req.body;
  let test;
  // 无id 新建
  if (!id) {
    test = await Test.create({
      title,
      type,
      brief,
      image,
      intro,
      tested_count
    });
  }
  // 有id
  else {
    test = await Test.findOne({ where: { id: id } });
    if (test === null) {
      res.status(400).json({ status: 400, msg: '未找到相关数据' });
      return;
    }
    test = await test.update({
      title,
      type,
      brief,
      image,
      intro,
      tested_count
    });
  }

  res.json({ status: 200, data: test });
});

// 测评详情
router.get('/detail', async (req, res) => {
  const { id = 0 } = req.query;

  const test = await Test.findOne({
    where: { id: id }
  });

  res.json({ status: 200, data: test });
});

// 测评列表
router.get('/list', async (req, res) => {
  const { page = 1, size = 20, title } = req.query;
  let where = {};
  if (title) {
    where.title = { [Op.like]: `%${title}%` };
  }

  const { count, rows } = await Test.findAndCountAll({
    where,
    offset: page ? (page - 1) * size : 0,
    limit: +size
  });

  res.json({
    status: 200,
    data: { list: rows, total: count }
  });
});

// 获取题目
router.get('/questions', async (req, res) => {
  const { test_id } = req.query;

  if (!test_id) {
    res.status(400).json({ status: 400, msg: '参数有误！' });
    return;
  }

  const questions = await TestQuestion.findAll({
    where: { test_id },
    include: {
      model: TestQuestionOption,
      as: 'options',
      attributes: ['id', 'name', 'type']
    }
  });

  res.json({ status: 200, data: questions });
});

// 提交答案
router.post('/answer', async (req, res) => {
  let { test_id = 0, user_id = 0, choice } = req.body;

  if (!test_id || !choice) {
    res.status(400).json({ status: 400, msg: '参数有误！' });
    return;
  }

  const options = await TestQuestionOption.findAll({
    where: { test_id }
  });

  let total_score = 0;
  choice.forEach(item => {
    // 单选题 value就是option_id
    let opt = options.find(v => v.id === item.value && item.type === 'radio');
    if (opt) {
      total_score += opt.score;
    }
  });

  const answer = await TestUserAnswer.create({
    test_id,
    user_id,
    choice: JSON.stringify(choice),
    score: total_score
  });

  res.json({ status: 200, data: answer });
});

module.exports = router;
