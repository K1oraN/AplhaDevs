const User = require('../models/User'); // Agora importa o modelo Sequelize
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Função para gerar o token JWT (permanece igual)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', 
  });
};

// @desc    Autenticar usuário & obter token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Encontrar usuário pelo email usando Sequelize
    const user = await User.findOne({ where: { email: email.toLowerCase() } }); // Busca por email (case-insensitive implícito)

    // 2. Verificar se usuário existe E se a senha bate
    // O método matchPassword foi adicionado ao prototype do User
    if (user && (await user.matchPassword(password))) {
      // Retorna os dados do usuário (Sequelize retorna um objeto com mais coisas, pegamos só o dataValues)
      const userData = user.get({ plain: true }); 
      delete userData.password; // Remove a senha antes de enviar

      res.json({
        ...userData, // Espalha os dados do usuário (id, name, email, role, createdAt, updatedAt)
        token: generateToken(user.id), // Usa user.id (definido pelo Sequelize)
      });
    } else {
      res.status(401).json({ message: 'Email ou senha inválidos' });
    }
  } catch (error) {
    console.error('Erro no login:', error); // Log detalhado do erro
    res.status(500).json({ message: 'Erro no servidor durante o login' });
  }
};

// @desc    Registrar um novo usuário (Acesso restrito a gestores no futuro)
// @route   POST /api/auth/register 
// @access  Private/Gestor (por enquanto, podemos testar)
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Verifica se o usuário já existe usando Sequelize
        const userExists = await User.findOne({ where: { email: email.toLowerCase() } });

        if (userExists) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        // Cria o novo usuário usando Sequelize
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password, // O hash será feito pelo hook 'beforeCreate' do Model
            role,
        });

        if (user) {
            const userData = user.get({ plain: true });
            delete userData.password;

            res.status(201).json({
                ...userData,
                token: generateToken(user.id), // Opcional: Logar usuário após registro
            });
        } else {
            // Sequelize geralmente lança erro se create falhar, mas deixamos por segurança
            res.status(400).json({ message: 'Dados de usuário inválidos' });
        }
    } catch (error) {
        console.error('Erro no registro:', error); // Log detalhado do erro
        // Trata erros de validação do Sequelize
        if (error.name === 'SequelizeValidationError') {
             const messages = error.errors.map(err => err.message);
             return res.status(400).json({ message: 'Dados inválidos', errors: messages });
        }
        res.status(500).json({ message: 'Erro no servidor durante o registro' });
    }
};


module.exports = { loginUser, registerUser };