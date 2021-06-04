const express = require('express');
const bodyParser = require('body-parser');

require('../db/config/association');
const userRouter = require('./router/user.router');
const testRouter = require('./router/test.router');

const app = express();

// 前置中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use((req, _res, next) => {
  console.log(`====> ${req.method} ${req.path} <====`);
  next();
});

// 注册路由
app.use('/user', userRouter);
app.use('/test', testRouter);

// 后置中间件
app.use((_req, res, _next) => {
  res.json({ message: '404' });
});

// 异常处理
app.use((err, _req, res, _next) => {
  res.status(500).json({
    message: 'error:' + err ? err.message : 'Unknown.'
  });
});

app.listen('3000', () => {
  console.log('service start successfully');
});
