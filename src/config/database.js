import 'dotenv/config';
import { Sequelize } from 'sequelize';

const config = {
  // --------------------------------------------------------
  // 1. CONFIGURAÇÃO DE DESENVOLVIMENTO (USO LOCAL)
  // --------------------------------------------------------
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
    
    logging: false, 
  },

  // --------------------------------------------------------
  // 2. CONFIGURAÇÃO DE PRODUÇÃO (USO NO RENDER)
  // --------------------------------------------------------
  production: {
    // A chave use_env_variable diz ao Sequelize para usar a string DATABASE_URL
    use_env_variable: 'DATABASE_URL', 
    
    dialect: 'postgres',
    
    // Configuração OBRIGATÓRIA para bancos de dados hospedados (SSL/TLS)
    dialectOptions: {
      ssl: {
        require: true,
        // Necessário no Render para aceitar certificados
        rejectUnauthorized: false
      }
    },
    
    // Configurações do Sequelize
    define: {
      timestamps: true, 
      underscored: true,
    },
    
    logging: false,
  },
};

// Exporta o objeto de configuração (para o sequelize-cli)
export default config;