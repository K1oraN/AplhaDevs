// server/routes/projectRoutes.js
const express = require('express');
const { getMyProjects, getProjectById, createProject, updateProject } = require('../controllers/projectController');
const { protect, isGestor } = require('../middleware/authMiddleware');

const router = express.Router();

// Rota para buscar os projetos DO USUÁRIO LOGADO
router.get('/myprojects', protect, getMyProjects);

// Rota para buscar UM projeto por ID
router.get('/:id', protect, getProjectById); // <-- ROTA ATIVA

// --- Rotas Futuras (Gestor) ---
// router.post('/', protect, isGestor, createProject);
// router.put('/:id', protect, isGestor, updateProject);

module.exports = router;