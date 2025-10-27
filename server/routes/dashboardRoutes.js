// server/routes/dashboardRoutes.js
const express = require('express');
const { getClientDashboardSummary } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware'); // Apenas 'protect' é necessário aqui

const router = express.Router();

// Rota para buscar o resumo do dashboard DO CLIENTE LOGADO
router.get('/clientsummary', protect, getClientDashboardSummary);

// --- Rotas Futuras (Ex: Dashboard do Gestor) ---
// router.get('/adminsummary', protect, isGestor, getAdminDashboardSummary); 

module.exports = router;