import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.js'; 

import Task from '../models/Task.js'; 
// Importe outros Models aqui

const models = [Task]; 

// CRUCIAL: Determina o ambiente atual (vai ser 'production' no Render)
const env = process.env.NODE_ENV || 'development'; 
const currentConfig = databaseConfig[env]; 

class Database {
    constructor() {
        let connectionInstance;

        // VERIFICAÇÃO CONDICIONAL PARA O SEQUELIZE
        if (env === 'production') {
            // CORREÇÃO FINAL: Usamos process.env.DATABASE_URL
            const dbUrl = process.env.DATABASE_URL;

            // O Sequelize em produção usa (URL, Objeto de Config)
            connectionInstance = new Sequelize(dbUrl, currentConfig); 
        } else {
            // Em desenvolvimento, usa (database, user, password, Config Object)
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
        models.forEach(model => model.init(this.connection));
        
        this.connection.authenticate()
            .then(() => {
                console.log("✅ Conexão com o PostgreSQL estabelecida com sucesso!");
            })
            .catch(err => {
                console.error("❌ ERRO: Falha ao conectar ao PostgreSQL.", err);
                console.error("Erro na conexão! Verifique a DATABASE_URL no Render e o código condicional.");
            });
    }
}

export default new Database();