'use strict';
const { Model } = require('sequelize');
const TestQuestion = require('./test-question');
module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Test.init(
    {
      title: DataTypes.STRING,
      type: DataTypes.INTEGER,
      brief: DataTypes.STRING,
      image: DataTypes.STRING,
      intro: DataTypes.TEXT,
      tested_count: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Test'
    }
  );

  return Test;
};
