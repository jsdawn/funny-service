const db = require('../models');

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

// 测试与选项关联
db.Test.hasMany(db.TestQuestionOption, {
  foreignKey: 'test_id',
  sourceKey: 'id',
  as: 'options'
});

db.TestQuestionOption.belongsTo(db.Test, {
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

// 答题与测试关联
db.Test.hasMany(db.TestUserAnswer, {
  foreignKey: 'test_id',
  sourceKey: 'id',
  as: 'answers'
});

db.TestUserAnswer.belongsTo(db.Test, {
  foreignKey: 'test_id',
  targetKey: 'id',
  as: 'test'
});

// 答题与用户关联
db.User.hasMany(db.TestUserAnswer, {
  foreignKey: 'user_id',
  sourceKey: 'id',
  as: 'answers'
});

db.TestUserAnswer.belongsTo(db.User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  as: 'user'
});

// 用户与token关联
db.User.hasMany(db.UserToken, {
  foreignKey: 'user_id',
  sourceKey: 'id',
  as: 'tokens'
});

db.UserToken.belongsTo(db.User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  as: 'user'
});

module.exports = db;
