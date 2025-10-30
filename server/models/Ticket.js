// server/models/Ticket.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Project = require('./Project'); // Opcional: Ligar ticket a um projeto

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  ticketNumber: { // Número do ticket (Ex: TKT-1001)
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: { // Descrição inicial do problema
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Aberto', 'Em Andamento', 'Aguardando Cliente', 'Resolvido', 'Fechado'),
    allowNull: false,
    defaultValue: 'Aberto',
  },
  priority: {
    type: DataTypes.ENUM('Baixa', 'Média', 'Alta', 'Urgente'),
    allowNull: false,
    defaultValue: 'Média',
  },
  // Chave Estrangeira: Quem abriu o ticket (Cliente)
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE', 
  },
  // Chave Estrangeira: Quem está resolvendo (Gestor/Funcionário)
  assignedToId: {
    type: DataTypes.UUID,
    allowNull: true, // Pode começar nulo
    references: { model: User, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  // Chave Estrangeira Opcional: Projeto relacionado
  projectId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: Project, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
}, {
  tableName: 'tickets',
  timestamps: true, // createdAt e updatedAt
});

// Relações
Ticket.belongsTo(User, { as: 'client', foreignKey: 'clientId' }); // Quem criou
Ticket.belongsTo(User, { as: 'assignedTo', foreignKey: 'assignedToId' }); // Quem está atendendo
Ticket.belongsTo(Project, { as: 'project', foreignKey: 'projectId' }); // Projeto relacionado

User.hasMany(Ticket, { as: 'createdTickets', foreignKey: 'clientId' });
User.hasMany(Ticket, { as: 'assignedTickets', foreignKey: 'assignedToId' });
Project.hasMany(Ticket, { as: 'tickets', foreignKey: 'projectId' });

// Hook para formatar o ticketNumber (Ex: TKT-1001)
// Este modelo é mais complexo, vamos focar no autoIncrement simples por agora.

module.exports = Ticket;