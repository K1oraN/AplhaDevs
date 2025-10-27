// server/controllers/financialController.js
const Invoice = require('../models/Invoice');
// const User = require('../models/User'); // Se precisar incluir dados do usuário
// const Project = require('../models/Project'); // Se precisar incluir dados do projeto

// @desc    Buscar todas as faturas do cliente logado
// @route   GET /api/financial/myinvoices
// @access  Private (Cliente ou Gestor)
const getMyInvoices = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const invoices = await Invoice.findAll({
      where: { clientId: req.user.id },
      order: [['dueDate', 'DESC']], // Ordena pelas mais recentes datas de vencimento
      // include: [{ model: Project, as: 'project', attributes: ['name'] }] // Opcional: Incluir nome do projeto
    });

    res.json(invoices);

  } catch (error) {
    console.error('Erro ao buscar faturas:', error);
    res.status(500).json({ message: 'Erro no servidor ao buscar faturas' });
  }
};

// --- Funções Futuras (Exemplos para Gestor) ---

// @desc    Criar uma nova fatura (Apenas Gestores)
// @route   POST /api/financial/invoices
// @access  Private/Gestor
const createInvoice = async (req, res) => {
    // TODO: Implementar criação de fatura
    res.status(501).json({ message: 'Endpoint não implementado' });
};

// @desc    Buscar todas as faturas (Apenas Gestores)
// @route   GET /api/financial/invoices
// @access  Private/Gestor
const getAllInvoices = async (req, res) => {
    // TODO: Implementar busca de todas as faturas com paginação/filtros
     res.status(501).json({ message: 'Endpoint não implementado' });
};

// @desc    Atualizar status de uma fatura (Apenas Gestores)
// @route   PUT /api/financial/invoices/:id
// @access  Private/Gestor
 const updateInvoiceStatus = async (req, res) => {
    // TODO: Implementar atualização de status (ex: marcar como Paga)
    res.status(501).json({ message: 'Endpoint não implementado' });
};


module.exports = {
  getMyInvoices,
  createInvoice,
  getAllInvoices,
  updateInvoiceStatus,
};