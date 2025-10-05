import express from 'express';
import routes from './routes.js';
import "./database/index.js" // Conecta e carrega os modelos
import cors from 'cors';

const PORT = 3333;

class App {
    constructor() {
        this.app = express(); // A instância do Express está em this.app
        
        this.middlewares();
        this.routes();
    }

    middlewares() {
        // CORREÇÃO: Usar this.app para aplicar o middleware cors e express.json
        this.app.use(cors()); 
        this.app.use(express.json());
    }

    routes() {
        // Monta o roteador principal
        this.app.use(routes);
    }

    listen() {
        this.app.listen(PORT, () => {
            console.log(`\n🚀 API de Gerenciamento de Tarefas rodando em http://localhost:${PORT}`);
            console.log("-------------------------------------------------------------------");
            console.log("Lembrete: Execute 'npx sequelize-cli db:migrate' para criar a tabela 'tasks'.");
        });
    }
}

// Inicialização da Aplicação
const appInstance = new App();
appInstance.listen();