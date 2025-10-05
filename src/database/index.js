import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.js'; // Assumindo que seu arquivo é 'database.js'

import Task from '../models/Task.js'; 
// Importe outros Models aqui

const models = [Task]; 

class Database {
    constructor() {
        // CORREÇÃO ESSENCIAL:
        // Acessamos a chave 'development' da configuração antes de inicializar o Sequelize.
        const config = databaseConfig.development; 
        
        // Inicializa a conexão com o objeto de configuração do ambiente 'development'
        this.connection = new Sequelize(config); 
        
        this.init();
    }

    init() {
        models.forEach(model => model.init(this.connection));
        
        this.connection.authenticate()
            .then(() => {
                console.log("✅ Conexão com o PostgreSQL estabelecida com sucesso!");
            })
            .catch(err => {
                console.error("❌ ERRO: Falha ao conectar ao PostgreSQL.");
                console.error("Dica: Verifique se o PostgreSQL está rodando e se as variáveis de ambiente (.env) estão corretas.");
            });
    }
}

export default new Database();