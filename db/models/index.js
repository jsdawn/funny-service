'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 测试与测试题目关联
db.Test.hasMany(db.TestQuestion, {
  foreignKey: 'test_id',
  sourceKey: 'id',
  as: 'questions'
});

db.TestQuestion.belongsTo(db.Test, {
  foreignKey: 'test_id',
  targetKey: 'id',
  as: 'test'
});

// 测试题目与选项关联
db.TestQuestion.hasMany(db.TestQuestionOption, {
  foreignKey: 'question_id',
  sourceKey: 'id',
  as: 'options'
});

db.TestQuestionOption.belongsTo(db.TestQuestion, {
  foreignKey: 'question_id',
  targetKey: 'id',
  as: 'question'
});

module.exports = db;
