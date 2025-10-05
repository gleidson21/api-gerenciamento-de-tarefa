'use strict';



export default{

  up: async (queryInterface, Sequelize) => {

    // Adiciona a nova coluna 'priority' à tabela 'tasks'

    await queryInterface.addColumn('tasks', 'priority', {

      type: Sequelize.STRING,

      defaultValue: 'None', // Definir o valor padrão

      allowNull: false,

    });

  },



  down: async (queryInterface, Sequelize) => {

    // Remove a coluna 'priority' caso seja necessário desfazer a migração

    await queryInterface.removeColumn('tasks', 'priority');

  }

};