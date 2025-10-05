import Task from '../models/Task.js';
import * as yup from 'yup';

// Lista de atributos que o GET (index) deve retornar
const taskAttributes = ['id', 'title', 'description', 'completed', 'priority', 'createdAt', 'updatedAt'];

class TaskController {
    
    // 1. [POST] Criar uma nova tarefa
    async store(req, res) {
        const Schema = yup.object().shape({
            title: yup.string().required("O título é obrigatório."),
            description: yup.string().optional(),
            completed: yup.boolean().optional(),
            // A prioridade agora é validada
            priority: yup.string().oneOf(['None', 'Low', 'Medium', 'High'], "Prioridade inválida.").optional(), 
        });

        try {
            await Schema.validate(req.body, { abortEarly: false });
            
            // O Sequelize VAI INJETAR TODOS OS CAMPOS DO req.body, incluindo 'title' e 'priority'
            const newTask = await Task.create(req.body); 
            
            return res.status(201).json(newTask);

        } catch (err) {
            if (err.errors) {
                // Se for um erro de validação do Yup
                return res.status(400).json({ error: err.errors });
            }
            // Se for um erro do Sequelize (ex: coluna inexistente)
            console.error("Erro ao criar tarefa (Verifique a migração de 'priority'):", err);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    // 2. [GET] Listar todas as tarefas
    async index(req, res) {
        try {
            const tasks = await Task.findAll({
                // CORREÇÃO ESSENCIAL: Incluir 'priority' e mudar para nomes camelCase (createdAt)
                attributes: taskAttributes, 
                // CORRIGIR: Ordenar por prioridade (do modelo) e depois pela data de criação
                order: [
                    // Coloque o campo de prioridade para ordenação se for um campo do modelo
                    // Por enquanto, mantenho a ordem por data, que é segura
                    ['createdAt', 'DESC'] 
                ],
            });

            return res.json(tasks);

        } catch (err) {
            console.error("Erro ao listar tarefas:", err);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }

    // 3. [PUT] Atualizar uma tarefa
    async update(req, res) {
        const { id } = req.params;
        
        const Schema = yup.object().shape({
            title: yup.string().optional(),
            description: yup.string().optional(),
            completed: yup.boolean().optional(),
            // A prioridade agora é validada na atualização
            priority: yup.string().oneOf(['None', 'Low', 'Medium', 'High'], "Prioridade inválida.").optional(),
        });
        
        try {
            await Schema.validate(req.body, { abortEarly: false });

            const task = await Task.findByPk(id);

            if (!task) {
                return res.status(404).json({ error: "Tarefa não encontrada." });
            }
            
            // O Sequelize VAI INJETAR TODOS OS CAMPOS DO req.body no update
            const updatedTask = await task.update(req.body);

            return res.json(updatedTask);

        } catch (err) {
             if (err.errors) {
                 return res.status(400).json({ error: err.errors });
             }
             console.error("Erro ao atualizar tarefa:", err);
             return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }
    
    // 4. [DELETE] Remover uma tarefa
    async delete(req, res) {
        const { id } = req.params;

        try {
            const deleted = await Task.destroy({ where: { id } });

            if (deleted === 0) {
                return res.status(404).json({ error: "Tarefa não encontrada." });
            }

            return res.status(204).send(); // Sucesso, sem conteúdo

        } catch (err) {
            console.error("Erro ao deletar tarefa:", err);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }
}

export default new TaskController();