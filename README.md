# 项目简介

这是一个基于 express + sequelize 的服务端 API 项目。使用了 validate-token 中间件方式作为用户校验。sequelize-cli 作为数据库管理解决方案。

# 项目运行

`yarn start`

# 项目创建

- [opr] 为可选或说明，非必须操作

## 初始化项目 init

1. `yarn init`
1. `yarn add express sequelize body-parser`
1. `yarn add nodemon sequelize-cli --dev`

## 开始 start

1. 新增 nodemon 文件，新增 app.js
2. 设置服务启动，注册路由，中间件，处理异常
3. 模组 (node 时间按 0 时区操作，获取时 +8:00)

## 数据库初始化与管理

1. 创建数据库 新增 db 文件

2. sequelize-cli db 目录下初始化数据库配置信息 `npx sequelize-cli init`

3. 生成模型以及迁移文件：
   `npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`

4. 持久化数据表，迁移文件以及模型对应的数据库表：

   1. 配置 db->config 数据库配置

   2. 根据生成的模型迁移文件（migrations）实际执行到数据库 `npx sequelize-cli db:migrate`

   3. [自定义迁移] `npx sequelize-cli migration:generate --name oprname-modelname`

   4. [QueryInterface . Method] `https://sequelize.org/master/class/lib/dialects/abstract/query-interface.js~QueryInterface.html`
   5. [撤销] --to 撤销到 xxxx 之前
      `npx sequelize-cli db:migrate:undo:all [--to XXXXXXXXXXXXXX-create-posts.js]`

   6. [执行] `npx sequelize-cli db:migrate`

   7. 新增对应的 db 模组

## 项目的发布和运维

1. 配置 pm2 `pm2 init` -> ecosystem.config.js
2. pm2 启动/日志/重启
   - `pm2 start ecosystem.config.js`
   - `pm2 log`
   - `pm2 restart ecosystem.config.js`

## 技术栈

1. 运用技术： express、sequelize、mysql
2. 关键点：模型设计，模型关系，API 使用文档，测试

## docker 部署

1. Dockerfile
2. docker-compose

# 延伸

Kubernates
