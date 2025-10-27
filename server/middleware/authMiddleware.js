const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Importa o modelo Sequelize
const dotenv = require('dotenv');

dotenv.config();

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Pega o token do header (Bearer TOKEN)
      token = req.headers.authorization.split(' ')[1];

      // Decodifica o token para pegar o ID do usuário
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Encontra o usuário no DB pelo ID (chave primária) usando Sequelize
      // findByPk = Find by Primary Key
      // attributes: { exclude: ['password'] } = Não incluir o campo 'password' no resultado
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] } 
      });

      if (!req.user) {
         // Lança um erro se o usuário associado ao token não for encontrado
         throw new Error('Usuário não encontrado'); 
      }

      // Converte o resultado do Sequelize para um objeto simples (opcional, mas bom para consistência)
      req.user = req.user.get({ plain: true }); 

      next(); // Continua para a próxima função (controller)
    } catch (error) {
      console.error('Erro na autenticação do token:', error.message);
      // Se jwt.verify falhar (token expirado/inválido) ou User.findByPk falhar
      res.status(401).json({ message: 'Não autorizado, token falhou' }); 
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Não autorizado, sem token' });
  }
};

// Middleware para verificar se o usuário é gestor (permanece igual na lógica)
const isGestor = (req, res, next) => {
  // Agora verifica req.user.role (já anexado pelo middleware 'protect')
  if (req.user && req.user.role === 'gestor') { 
    next();
  } else {
    res.status(403).json({ message: 'Acesso negado. Apenas gestores.' });
  }
};

// Exporte também o isGestor se for usá-lo
module.exports = { protect, isGestor };