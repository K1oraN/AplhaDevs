// server/routes/userRoutes.js
const express = require('express');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { registerUser } = require('../controllers/authController'); // Importa a função de registro
const { protect, isGestor } = require('../middleware/authMiddleware'); // Nossos middlewares de proteção

const router = express.Router();

// Aplicamos 'protect' (tem que estar logado) E 'isGestor' (tem que ser gestor)
// para TODAS as rotas neste arquivo.
router.use(protect, isGestor);

// Rota para listar todos os utilizadores E criar um novo utilizador
router.route('/')
  .get(getAllUsers) // GET /api/users
  .post(registerUser); // POST /api/users (Reutilizamos a função de registro como "criar utilizador")

// Rotas para um utilizador específico
router.route('/:id')
  .get(getUserById)    // GET /api/users/:id
  .put(updateUser)     // PUT /api/users/:id
  .delete(deleteUser); // DELETE /api/users/:id

module.exports = router;