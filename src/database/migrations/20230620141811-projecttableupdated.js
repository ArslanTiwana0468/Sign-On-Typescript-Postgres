'use strict';

// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('projectAssignments', 'id', {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('projectAssignments', 'id');
  }
};
