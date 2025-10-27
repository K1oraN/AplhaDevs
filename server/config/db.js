const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config(); // Carrega variáveis do .env

console.log(`[DB Config] Lendo variáveis: DB=${process.env.DB_DATABASE}, User=${process.env.DB_USERNAME}, Host=${process.env.DB_HOST}, Port=${process.env.DB_PORT}`); // Log para verificar leitura do .env

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Nome do banco
  process.env.DB_USERNAME, // Usuário
  process.env.DB_PASSWORD, // Senha
  {
    host: process.env.DB_HOST,     // Endereço do servidor
    port: process.env.DB_PORT,     // Porta do servidor
    dialect: process.env.DB_DIALECT, // Tipo de banco (postgres)
    logging: console.log, // ATIVAR LOGS SQL para debug
    // dialectOptions: { /* Opções SSL, se necessário */ }
  }
);

// Função para testar a conexão
const connectDB = async () => {
  try {
    await sequelize.authenticate(); // Tenta autenticar no banco
    console.log('Conexão com PostgreSQL estabelecida com sucesso.');

    // Sincroniza os modelos (cria tabelas)
    await sequelize.sync(); 
    console.log('Modelos sincronizados com o banco de dados.');

  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
    if (error.original) {
        console.error('Erro Original:', error.original);
    }
    process.exit(1); // Sai da aplicação em caso de erro
  }
};

module.exports = { sequelize, connectDB }; // Exporta a instância e a função