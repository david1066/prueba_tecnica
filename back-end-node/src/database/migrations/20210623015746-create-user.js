'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      surname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },useremail: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      typedocument: {
        type: Sequelize.STRING
      },
      document: {
        type: Sequelize.BIGINT
      },
      idcity: {
        type: Sequelize.INTEGER,
        references: { model: 'Cities', key: 'id' }, // el model debe estar en plural, ver 1er parámetro en createTable referenciada
        onDelete: 'no action',
        onUpdate: 'no action',
      },
      birthday: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};