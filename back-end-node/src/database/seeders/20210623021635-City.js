'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     **/
   
     await queryInterface.bulkInsert('Cities', [{
      name: 'Bogota',
      createdAt: new Date(),
      updatedAt: new Date()
     },{
      name: 'Cali',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name: 'Medellin',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name: 'Tunja',
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
