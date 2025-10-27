// server/models/Project.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User'); // Importa o modelo User para definir a relação

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Planejamento', 'Design', 'Desenvolvimento', 'Testes', 'Lançado', 'Manutenção', 'Cancelado'),
    allowNull: false,
    defaultValue: 'Planejamento',
  },
  startDate: {
    type: DataTypes.DATEONLY, // Apenas Data (YYYY-MM-DD)
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  // Chave Estrangeira para o Cliente (User)
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User, // Referencia o modelo User
      key: 'id',   // A coluna 'id' da tabela 'users'
    },
    onUpdate: 'CASCADE', // Se o ID do usuário mudar, atualiza aqui
    onDelete: 'SET NULL', // Se o usuário for deletado, define clientId como NULL (ou 'CASCADE' para deletar projetos)
  },
  // (Podemos adicionar mais campos depois: valor, fases, etc.)
}, {
  tableName: 'projects',
  timestamps: true, // Adiciona createdAt e updatedAt
});

// Define a Relação: Um Projeto pertence a um Cliente (User)
Project.belongsTo(User, { as: 'client', foreignKey: 'clientId' });
// Define a Relação Inversa: Um Cliente (User) pode ter vários Projetos
User.hasMany(Project, { as: 'projects', foreignKey: 'clientId' });

module.exports = Project;