// server/models/Message.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Project = require('./Project'); // Opcional: Para ligar mensagens a projetos

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: true, // Assunto pode ser opcional para respostas
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isReadByClient: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isReadByAdmin: { // Para sabermos se a equipa já leu a mensagem do cliente
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  // Chave Estrangeira para o Remetente (Quem enviou)
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL', // Mantém a mensagem se o remetente for excluído
  },
   // Chave Estrangeira para o Destinatário (Pode ser o cliente ou um admin/suporte)
   // Ou podemos ter um 'conversationId' para agrupar mensagens
  recipientId: {
    type: DataTypes.UUID,
    allowNull: false, 
    references: { model: User, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  // Opcional: Ligar a um projeto específico
  projectId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: Project, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  // Poderíamos adicionar um campo 'threadId' ou 'parentId' para conversas
}, {
  tableName: 'messages',
  timestamps: true, // createdAt e updatedAt
});

// Relações
Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
Message.belongsTo(User, { as: 'recipient', foreignKey: 'recipientId' });
User.hasMany(Message, { as: 'sentMessages', foreignKey: 'senderId' });
User.hasMany(Message, { as: 'receivedMessages', foreignKey: 'recipientId' });

Message.belongsTo(Project, { as: 'project', foreignKey: 'projectId' });
Project.hasMany(Message, { as: 'messages', foreignKey: 'projectId' });

module.exports = Message;