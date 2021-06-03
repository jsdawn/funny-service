'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TestUserAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TestUserAnswer.init(
    {
      test_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      choice: DataTypes.TEXT,
      score: DataTypes.DOUBLE
    },
    {
      sequelize,
      modelName: 'TestUserAnswer'
    }
  );

  return TestUserAnswer;
};
