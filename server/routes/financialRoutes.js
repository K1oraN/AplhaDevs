// server/routes/financialRoutes.js
const express = require('express');

// 1. IMPORTAMOS a nova função 'createInvoice'
const { 
    getMyInvoices, 
    getAllInvoices,
    createInvoice 
    // updateInvoiceStatus (importar quando for usar)
} = require('../controllers/financialController');

const { protect, isGestor } = require('../middleware/authMiddleware');

const router = express.Router();

// Rota para o cliente buscar SUAS faturas
router.get('/myinvoices', protect, getMyInvoices);

// Rota para o Gestor buscar TODAS as faturas
router.get('/all', protect, isGestor, getAllInvoices);

// 2. ATIVAMOS a rota para CRIAR faturas
// Ela será acessível via: POST http://localhost:3001/api/financial/invoices
router.post('/invoices', protect, isGestor, createInvoice);


// --- Rotas Futuras (Exemplos para Gestor) ---
// router.put('/invoices/:id', protect, isGestor, updateInvoiceStatus);

module.exports = router;