// server/routes/documentRoutes.js
const express = require('express');
const { getMyDocuments /*, uploadDocument, deleteDocument */ } = require('../controllers/documentController');
const { protect, isGestor } = require('../middleware/authMiddleware');

const router = express.Router();

// Rota para o cliente buscar SEUS documentos
router.get('/mydocuments', protect, getMyDocuments);

// --- Rotas Futuras (Gestor) ---
// router.post('/upload', protect, isGestor, uploadDocument); // Requer 'multer' ou similar para upload
// router.delete('/:id', protect, isGestor, deleteDocument);

module.exports = router;