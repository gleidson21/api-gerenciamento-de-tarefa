import express from 'express';
import routes from './routes.js';
import "./database/index.js" // Conecta e carrega os modelos
import cors from 'cors';

// MUDANÇA ESSENCIAL: Usar process.env.PORT no Render
const PORT = process.env.PORT || 3333; 

class App {
    constructor() {
        this.app = express(); 
        
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors()); 
        this.app.use(express.json());
    }

    routes() {
        this.app.use(routes);
    }

    listen() {
        // Usa a constante PORT que agora lê process.env.PORT
        this.app.listen(PORT, () => {
            console.log(`\n🚀 API de Gerenciamento de Tarefas rodando na porta: ${PORT}`);
            console.log("-------------------------------------------------------------------");
            console.log("Lembrete: Execute 'npx sequelize-cli db:migrate' para criar a tabela 'tasks'.");
        });
    }
}

// Inicialização da Aplicação
const appInstance = new App();
appInstance.listen();

// IMPORTANTE: Exporta a instância do Express, caso você use um ficheiro 'start' separado
export default appInstance.app;