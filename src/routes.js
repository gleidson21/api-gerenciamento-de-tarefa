import { Router } from 'express';
import TaskController from './controllers/TaskController.js';

const routes = new Router();

// Rotas da API de Tarefas (CRUD)

// [POST] Cria uma nova tarefa
routes.post('/tasks', TaskController.store);

// [GET] Lista todas as tarefas
routes.get('/tasks', TaskController.index);

// [PUT] Atualiza uma tarefa por ID
routes.put('/tasks/:id', TaskController.update);

// [DELETE] Remove uma tarefa por ID
routes.delete('/tasks/:id', TaskController.delete);


export default routes;