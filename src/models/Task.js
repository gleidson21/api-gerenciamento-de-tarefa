import { Model, DataTypes } from 'sequelize';

class Task extends Model {
    /**
     * Inicializa o modelo, mapeando as colunas para o Sequelize.
     * @param {import('sequelize').Sequelize} sequelize - Instância de conexão.
     */
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4, // O Sequelize gera o valor aqui
                primaryKey: true,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "O título não pode estar vazio." }
                }
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            priority: {
                type: DataTypes.STRING, // Guarda a string 'None', 'Low', 'Medium', 'High'
                defaultValue: 'None',
                allowNull: false,
            },
            completed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        }, {
            sequelize,
            tableName: 'tasks', // Nome da tabela no banco de dados
        });

        return this;
    }
}

export default Task;
