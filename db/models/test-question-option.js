'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TestQuestionOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TestQuestionOption.init(
    {
      question_id: DataTypes.INTEGER,
      type: DataTypes.STRING,
      name: DataTypes.STRING,
      score: DataTypes.DOUBLE,
      sort: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'TestQuestionOption',
      timestamps: false
    }
  );
  return TestQuestionOption;
};
