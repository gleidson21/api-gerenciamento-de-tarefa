import 'dotenv/config';
import { Sequelize } from 'sequelize';

const mockConfig  = {
  development: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    
    // Configurações do Sequelize
    define: {
      timestamps: true, 
      underscored: true,
    },
    
    logging: false, // Mude para 'true' se quiser ver o SQL gerado
  },
};

export default mockConfig;