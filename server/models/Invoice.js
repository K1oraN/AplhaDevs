// server/models/Invoice.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Project = require('./Project'); // Opcional: Se faturas estão ligadas a projetos

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  invoiceNumber: { // Número da fatura (pode ser gerado)
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2), // Ex: 12345678.90
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING(3), // Ex: 'BRL', 'USD', 'EUR'
    allowNull: false,
    defaultValue: 'BRL',
  },
  dueDate: {
    type: DataTypes.DATEONLY, // Data de vencimento
    allowNull: false,
  },
  paidDate: {
    type: DataTypes.DATEONLY, // Data de pagamento (null se não pago)
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Pendente', 'Paga', 'Atrasada', 'Cancelada'),
    allowNull: false,
    defaultValue: 'Pendente',
  },
  // Chave Estrangeira para o Cliente
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE', // Se deletar o cliente, deleta as faturas? (Ou SET NULL?)
  },
  // Chave Estrangeira Opcional para o Projeto
  projectId: {
    type: DataTypes.UUID,
    allowNull: true, // Permite faturas não ligadas a um projeto específico (ex: mensalidade)
    references: {
      model: Project,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  // Pode adicionar link para PDF da fatura, método de pagamento, etc.
}, {
  tableName: 'invoices',
  timestamps: true,
});

// Relações
Invoice.belongsTo(User, { as: 'client', foreignKey: 'clientId' });
User.hasMany(Invoice, { as: 'invoices', foreignKey: 'clientId' });

Invoice.belongsTo(Project, { as: 'project', foreignKey: 'projectId' });
Project.hasMany(Invoice, { as: 'invoices', foreignKey: 'projectId' });

// Hook para gerar número da fatura (exemplo simples)
Invoice.beforeValidate((invoice, options) => {
  if (!invoice.invoiceNumber) {
    // Gera um número simples baseado no timestamp e um ID curto
    const timestamp = Date.now().toString().slice(-6);
    const randomId = Math.random().toString(36).substring(2, 6).toUpperCase();
    invoice.invoiceNumber = `INV-${timestamp}-${randomId}`;
  }
});


module.exports = Invoice;