'use strict';
const { Model } = require('sequelize');
const moment = require('moment');
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
      sort: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('createdAt')).add(8, 'h');
        }
      },
      updatedAt: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('updatedAt')).add(8, 'h');
        }
      }
    },
    {
      sequelize,
      modelName: 'TestQuestion'
    }
  );

  return TestQuestion;
};
