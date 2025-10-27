// server/routes/financialRoutes.js
const express = require('express');
const { getMyInvoices /*, createInvoice, getAllInvoices, updateInvoiceStatus */ } = require('../controllers/financialController');
const { protect, isGestor } = require('../middleware/authMiddleware');

const router = express.Router();

// Rota para o cliente buscar SUAS faturas
router.get('/myinvoices', protect, getMyInvoices);

// --- Rotas Futuras (Exemplos para Gestor) ---
// router.post('/invoices', protect, isGestor, createInvoice);
// router.get('/invoices', protect, isGestor, getAllInvoices);
// router.put('/invoices/:id', protect, isGestor, updateInvoiceStatus);

module.exports = router;