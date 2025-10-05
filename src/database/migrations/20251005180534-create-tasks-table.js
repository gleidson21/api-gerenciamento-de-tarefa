import { DataTypes,Sequelize } from 'sequelize';

export default {
  /**
   * O método 'up' é executado quando aplicamos a migration (criação da tabela).
   */
  async up(queryInterface, { DataTypes }) {
    await queryInterface.createTable('tasks', {
      // ID (Chave Primária)
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4, // Use Sequelize para o defaultValue na Migration!
        allowNull: false,
        primaryKey: true,
      },

      // Colunas de Dados
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

      // Colunas de Timestamp (Controladas pelo Sequelize)
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  /**
   * O método 'down' é executado quando desfazemos a migration (exclusão da tabela).
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};