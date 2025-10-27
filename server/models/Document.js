// server/models/Document.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Project = require('./Project'); // Para ligar documentos a projetos

const Document = sequelize.define('Document', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { // Nome do ficheiro original ou descritivo
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: { // Tipo de documento (Proposta, Contrato, NF, Relatório, Outro)
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: { // Descrição opcional
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fileUrl: { // O link para aceder/baixar o ficheiro (ex: URL do S3)
    type: DataTypes.STRING,
    allowNull: false, // Essencial para o download
  },
  fileSize: { // Tamanho do ficheiro (ex: '1.2 MB') - Opcional, pode ser calculado
    type: DataTypes.STRING,
    allowNull: true,
  },
  uploadDate: { // Data de upload do ficheiro
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  // Chave Estrangeira para o Cliente (Quem pode ver/baixar)
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE', // Se o cliente for deletado, os documentos associados também?
  },
  // Chave Estrangeira Opcional para o Projeto
  projectId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: Project, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  // Opcional: Status (ex: 'Pendente Assinatura', 'Assinado')
  // status: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
}, {
  tableName: 'documents',
  timestamps: true, // createdAt (igual a uploadDate?) e updatedAt
});

// Relações
Document.belongsTo(User, { as: 'client', foreignKey: 'clientId' });
User.hasMany(Document, { as: 'documents', foreignKey: 'clientId' });

Document.belongsTo(Project, { as: 'project', foreignKey: 'projectId' });
Project.hasMany(Document, { as: 'documents', foreignKey: 'projectId' });

module.exports = Document;