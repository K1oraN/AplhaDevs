// server/routes/projectRoutes.js
const express = require('express');
const { getMyProjects, getProjectById, createProject, updateProject, getAllProjects } = require('../controllers/projectController');
const { protect, isGestor } = require('../middleware/authMiddleware');

const router = express.Router();

// --- Rotas Específicas (Vêm primeiro) ---
router.get('/myprojects', protect, getMyProjects); // Rota do Cliente
router.get('/all', protect, isGestor, getAllProjects); // <-- ROTA DO GESTOR (AGORA VEM ANTES)

// --- Rotas Dinâmicas (Vêm por último) ---
router.get('/:id', protect, getProjectById); // <-- ROTA DE ID (AGORA VEM DEPOIS)

// --- Rotas de Ação (POST, PUT) ---
// router.post('/', protect, isGestor, createProject);
// router.put('/:id', protect, isGestor, updateProject);

module.exports = router;