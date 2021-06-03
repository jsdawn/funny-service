'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('TestUserAnswers', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        test_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        choice: {
          type: Sequelize.TEXT
        },
        score: {
          type: Sequelize.DOUBLE,
          defaultValue: 0
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('TestUserAnswers', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
