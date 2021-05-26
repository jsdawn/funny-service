# 项目运行

## 启动 start

`yarn start`

# 项目创建

## 初始化项目 init

1. `yarn init`
1. `yarn add express sequelize body-parser`
1. `yarn add nodemon sequelize-cli --dev`

## 开始 start

1. 新增 nodemon 文件，新增 app.js
2. 设置服务启动，注册路由，中间件，处理异常
3. 模组

## 数据库初始化

1. 创建数据库 新增 db 文件
2. sequelize-cli db 目录下初始化数据库配置信息 `npx sequelize-cli init`
3. 生成模型文件：
   `npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`
4. 持久化数据表，模型对应的[数据库表]：
   1. 配置 db->config 数据库配置
   2. 根据生成的模型迁移文件（migrations）创建数据表 `npx sequelize-cli db:migrate`
