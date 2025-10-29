// server/controllers/userController.js
const User = require('../models/User'); // Modelo Sequelize

// @desc    Buscar todos os utilizadores (Apenas Gestor)
// @route   GET /api/users
// @access  Private/Gestor
const getAllUsers = async (req, res) => {
  try {
    // Busca todos os utilizadores, excluindo a senha
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']], // Mais recentes primeiro
    });
    res.json(users);
  } catch (error) {
    console.error('Erro ao buscar utilizadores:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// @desc    Buscar um utilizador por ID (Apenas Gestor)
// @route   GET /api/users/:id
// @access  Private/Gestor
const getUserById = async (req, res) => {
   try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Utilizador não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// @desc    Atualizar um utilizador (Apenas Gestor)
// @route   PUT /api/users/:id
// @access  Private/Gestor
const updateUser = async (req, res) => {
    // TODO: Implementar lógica para atualizar (nome, email, role)
    res.status(501).json({ message: 'Endpoint não implementado' });
};

// @desc    Deletar um utilizador (Apenas Gestor)
// @route   DELETE /api/users/:id
// @access  Private/Gestor
const deleteUser = async (req, res) => {
    // TODO: Implementar lógica para deletar
    res.status(501).json({ message: 'Endpoint não implementado' });
};


module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};