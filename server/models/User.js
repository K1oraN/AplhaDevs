const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa a instância do Sequelize
const bcrypt = require('bcryptjs');

// Define o modelo 'User'
const User = sequelize.define('User', {
  // Define as colunas da tabela 'Users'
  id: {
    type: DataTypes.UUID, // Usa UUID como chave primária (mais seguro)
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Equivalente a 'required: true'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Garante email único
    validate: {
      isEmail: true, // Valida se é um formato de email
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('cliente', 'gestor', 'funcionario'), // Define os valores permitidos
    allowNull: false,
    defaultValue: 'cliente',
  },
  // Timestamps (createdAt, updatedAt) são adicionados automaticamente pelo Sequelize por padrão
}, {
  // Opções do modelo
  tableName: 'users', // Nome explícito da tabela no banco
  timestamps: true,   // Habilita createdAt e updatedAt

  // Hooks: Funções executadas antes ou depois de certas operações
  hooks: {
    // Antes de criar (CREATE) um novo usuário
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    // Antes de atualizar (UPDATE) um usuário
    beforeUpdate: async (user) => {
      // Verifica se o campo 'password' foi modificado
      if (user.changed('password')) { 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
});

// Adiciona o método 'matchPassword' à instância do modelo User
// (Diferente do Mongoose, adicionamos ao prototype)
User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User;