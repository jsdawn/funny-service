const express = require('express');
var cors = require('cors');
const path = require('path');
require('express-async-errors'); // promise err to next(err)
require('../db/config/association');

const validateToken = require('./middleware/validate-token');
const commonRouter = require('./router/common.router');
const userRouter = require('./router/user.router');
const testRouter = require('./router/test.router');

const app = express();

// 前置中间件 in Express > v4.16.0
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`====> ${req.method} ${req.path} <====`);
  next();
});

app.use(cors());
// 静态
app.use('/static', express.static(path.join(__dirname, '../public')));
// 注册路由
app.use('/common', commonRouter);
app.use('/user', [validateToken], userRouter);
app.use('/test', testRouter);

// 后置中间件
app.use((_req, res, _next) => {
  res.status(404).json({ status: 404, msg: '404' });
});

// 异常处理
app.use((err, _req, res, _next) => {
  res
    .status(500)
    .json({ status: 500, msg: 'error:' + err ? err.message : 'Unknown.' });
});

app.listen('3000', () => {
  console.log('service start successfully. from: ' + app.get('env'));
});
