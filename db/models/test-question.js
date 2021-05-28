'use strict';
const { Model } = require('sequelize');
const Test = require('./test');
module.exports = (sequelize, DataTypes) => {
  class TestQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TestQuestion.init(
    {
      test_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      sort: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'TestQuestion'
    }
  );

  return TestQuestion;
};
