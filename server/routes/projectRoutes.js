// server/routes/projectRoutes.js
const express = require('express');
const { getMyProjects, getProjectById, createProject, updateProject } = require('../controllers/projectController');
const { protect, isGestor } = require('../middleware/authMiddleware'); // Importa os middlewares

const router = express.Router();

// Rota para buscar os projetos DO USUÁRIO LOGADO
// Aplicamos 'protect' para garantir que SÓ usuários logados acessem
router.get('/myprojects', protect, getMyProjects);

// Rotas futuras (já com middlewares de exemplo)
// router.get('/:id', protect, getProjectById); // Qualquer logado pode ver (se tiver permissão no controller)
// router.post('/', protect, isGestor, createProject); // Só gestor pode criar
// router.put('/:id', protect, isGestor, updateProject); // Só gestor pode atualizar

module.exports = router;