// server/routes/messageRoutes.js
const express = require('express');
const { getMyReceivedMessages, sendMessage, markMessageAsRead } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware'); // Só precisa estar logado

const router = express.Router();

// Rota para o cliente buscar SUAS mensagens recebidas
router.get('/myreceived', protect, getMyReceivedMessages);

// --- Rotas Futuras ---
// router.post('/send', protect, sendMessage);
// router.put('/:id/read', protect, markMessageAsRead);

module.exports = router;