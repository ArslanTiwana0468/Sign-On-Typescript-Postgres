'use strict';
/** @type {import('sequelize-cli').Migration} */
// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Projects', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
      title: DataTypes.STRING,
      status: DataTypes.STRING,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Projects');
  }
};