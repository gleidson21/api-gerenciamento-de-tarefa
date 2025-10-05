import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.js'; 

import Task from '../models/Task.js'; 
// Importe outros Models aqui

const models = [Task]; 

// CRUCIAL: Determina o ambiente atual (vai ser 'production' no Render)
const env = process.env.NODE_ENV || 'development'; 
const currentConfig = databaseConfig[env]; // Acessa o bloco correto (development OU production)

class Database {
    constructor() {
        let connectionInstance;

        // VERIFICAÇÃO CONDICIONAL PARA O SEQUELIZE
        if (env === 'production') {
            // Em produção, o Sequelize espera a URL de conexão completa.
            // 'currentConfig.use_env_variable' aponta para 'DATABASE_URL'.
            connectionInstance = new Sequelize(currentConfig.use_env_variable, currentConfig);
        } else {
            // Em desenvolvimento, usa o construtor padrão com variáveis separadas
            // Usamos o database, username, password e o objeto de config
            connectionInstance = new Sequelize(
                currentConfig.database, 
                currentConfig.username, 
                currentConfig.password, 
                currentConfig
            );
        }

        this.connection = connectionInstance;
        this.init();
    }

    init() {
        // ... (Resto do método init, que faz a autenticação e inicia os modelos)
        models.forEach(model => model.init(this.connection));
        
        this.connection.authenticate()
            .then(() => {
                console.log("✅ Conexão com o PostgreSQL estabelecida com sucesso!");
            })
            .catch(err => {
                console.error("❌ ERRO: Falha ao conectar ao PostgreSQL.", err);
                console.error("Erro na conexão! Verifique a DATABASE_URL e o bloco 'production' na sua config.");
            });
    }
}

export default new Database();